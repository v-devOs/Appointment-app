"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { UserSchema } from "@/schemas/user";
import { BusinessSchema } from "@/schemas/business";
import { PersonalSchema } from "@/schemas/personal";
import { PaymentSchema } from "@/schemas/payment";
import { SubscriptionSchema } from "@/schemas/subscription";
import { SubscriptionDetailsSchema } from "@/schemas/subscriptionDetails";

interface RegisterData {
  // Step 1: Credenciales
  email: string;
  password: string;
  // Step 2: Información del negocio
  businessName: string;
  businessEmail?: string;
  businessTel: string;
  businessDirection: string;
  hourOpen: string;
  hourClose: string;
  // Step 3: Información del personal owner
  firstName: string;
  secondName?: string;
  lastNameP: string;
  lastNameM?: string;
  personalTel: string;
}

export async function registerUser(data: RegisterData) {
  try {
    // Validar que el email no exista
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        ok: false,
        message: "El email ya está registrado",
      };
    }

    // Validar datos de usuario
    const userValidation = UserSchema.safeParse({
      email: data.email,
      password: data.password,
    });

    if (!userValidation.success) {
      return {
        ok: false,
        message: "Datos de usuario inválidos",
        errors: userValidation.error.issues,
      };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el usuario, negocio, personal y suscripción de prueba en una transacción
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear usuario
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        },
      });

      // 2. Validar y crear negocio
      const businessValidation = BusinessSchema.safeParse({
        name: data.businessName,
        email: data.businessEmail,
        tel: data.businessTel,
        direction: data.businessDirection,
        hourOpen: data.hourOpen,
        hourClose: data.hourClose,
        ownerid: user.id,
      });

      if (!businessValidation.success) {
        throw new Error("Datos de negocio inválidos");
      }

      const business = await tx.business.create({
        data: businessValidation.data,
      });

      // 3. Validar y crear personal owner
      const personalValidation = PersonalSchema.safeParse({
        firstName: data.firstName,
        secondName: data.secondName,
        lastNameP: data.lastNameP,
        lastNameM: data.lastNameM,
        tel: data.personalTel,
        typePersonal: "OWNER_BUSSINES",
        userid: user.id,
        businessid: business.id,
      });

      if (!personalValidation.success) {
        throw new Error("Datos de personal inválidos");
      }

      const personal = await tx.personal.create({
        data: personalValidation.data,
      });

      // 4. Crear pago de prueba (monto 0)
      const now = new Date();

      const paymentValidation = PaymentSchema.safeParse({
        amount: 0,
        discount: 0,
        datePayment: now,
        status: "ACEPTED",
        comentaries: "30 days test",
      });

      if (!paymentValidation.success) {
        throw new Error("Error al crear pago de prueba");
      }

      const payment = await tx.payment.create({
        data: paymentValidation.data,
      });

      // 5. Crear suscripción de prueba (30 días)
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 30);

      const subscriptionValidation = SubscriptionSchema.safeParse({
        amount: 0,
        dateStartCurrentPeriod: now,
        dateEndCurrentPeriod: trialEndDate,
        status: "ACTIVE",
      });

      if (!subscriptionValidation.success) {
        throw new Error("Error al crear suscripción de prueba");
      }

      const subscription = await tx.subscription.create({
        data: subscriptionValidation.data,
      });

      // 6. Crear detalles de suscripción
      const subscriptionDetailsValidation = SubscriptionDetailsSchema.safeParse(
        {
          userid: user.id,
          subscriptionid: subscription.id,
          paymentid: payment.id,
        },
      );

      if (!subscriptionDetailsValidation.success) {
        throw new Error("Error al relacionar suscripción");
      }

      const subscriptionDetails = await tx.subscriptionDetails.create({
        data: subscriptionDetailsValidation.data,
      });

      return {
        user,
        business,
        personal,
        payment,
        subscription,
        subscriptionDetails,
      };
    });

    return {
      ok: true,
      message: "Usuario registrado correctamente",
      user: {
        id: result.user.id,
        email: result.user.email,
      },
    };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al registrar usuario. Por favor intenta de nuevo",
    };
  }
}
