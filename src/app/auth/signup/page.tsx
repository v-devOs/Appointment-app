"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth/register";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ProgressIndicator } from "@/components/auth/ProgressIndicator";
import { CredentialsStep } from "@/components/auth/CredentialsStep";
import { BusinessInfoStep } from "@/components/auth/BusinessInfoStep";
import { PersonalInfoStep } from "@/components/auth/PersonalInfoStep";

const STEPS = ["Credenciales", "Negocio", "Datos personales"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Credenciales
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Step 2: Información del negocio
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessEmail: "",
    businessTel: "",
    businessDirection: "",
    hourOpen: "",
    hourClose: "",
  });

  // Step 3: Información del personal owner
  const [personalData, setPersonalData] = useState({
    firstName: "",
    secondName: "",
    lastNameP: "",
    lastNameM: "",
    personalTel: "",
  });

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Ingresa tus credenciales de acceso";
      case 2:
        return "Información de tu negocio";
      case 3:
        return "Tus datos personales como propietario";
      default:
        return "";
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await registerUser({
        // Credenciales
        email: credentials.email,
        password: credentials.password,
        // Información del negocio
        businessName: businessData.businessName,
        businessEmail: businessData.businessEmail || undefined,
        businessTel: businessData.businessTel,
        businessDirection: businessData.businessDirection,
        hourOpen: businessData.hourOpen,
        hourClose: businessData.hourClose,
        // Información del personal owner
        firstName: personalData.firstName,
        secondName: personalData.secondName || undefined,
        lastNameP: personalData.lastNameP,
        lastNameM: personalData.lastNameM || undefined,
        personalTel: personalData.personalTel,
      });

      if (!result.ok) {
        setError(result.message || "Error al registrar usuario");
        setLoading(false);
        return;
      }

      // Iniciar sesión automáticamente
      const signInResult = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        // Si falla el auto-login, redirigir a login
        router.push("/auth/login");
      }
    } catch {
      setError("Error al completar el registro");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      description={getStepDescription()}
      maxWidth="2xl"
      footerText="¿Ya tienes una cuenta?"
      footerLinkText="Inicia sesión"
      footerLinkHref="/auth/login"
    >
      <ProgressIndicator currentStep={step} steps={STEPS} />

      {step === 1 && (
        <CredentialsStep
          email={credentials.email}
          password={credentials.password}
          showPassword={showPassword}
          loading={loading}
          error={error}
          onEmailChange={(email) =>
            setCredentials({ ...credentials, email })
          }
          onPasswordChange={(password) =>
            setCredentials({ ...credentials, password })
          }
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSubmit={handleStep1Submit}
        />
      )}

      {step === 2 && (
        <BusinessInfoStep
          businessName={businessData.businessName}
          businessEmail={businessData.businessEmail}
          businessTel={businessData.businessTel}
          businessDirection={businessData.businessDirection}
          hourOpen={businessData.hourOpen}
          hourClose={businessData.hourClose}
          loading={loading}
          error={error}
          onBusinessNameChange={(value) =>
            setBusinessData({ ...businessData, businessName: value })
          }
          onBusinessEmailChange={(value) =>
            setBusinessData({ ...businessData, businessEmail: value })
          }
          onBusinessTelChange={(value) =>
            setBusinessData({ ...businessData, businessTel: value })
          }
          onBusinessDirectionChange={(value) =>
            setBusinessData({ ...businessData, businessDirection: value })
          }
          onHourOpenChange={(value) =>
            setBusinessData({ ...businessData, hourOpen: value })
          }
          onHourCloseChange={(value) =>
            setBusinessData({ ...businessData, hourClose: value })
          }
          onBack={() => setStep(1)}
          onSubmit={handleStep2Submit}
        />
      )}

      {step === 3 && (
        <PersonalInfoStep
          firstName={personalData.firstName}
          secondName={personalData.secondName}
          lastNameP={personalData.lastNameP}
          lastNameM={personalData.lastNameM}
          personalTel={personalData.personalTel}
          loading={loading}
          error={error}
          onFirstNameChange={(value) =>
            setPersonalData({ ...personalData, firstName: value })
          }
          onSecondNameChange={(value) =>
            setPersonalData({ ...personalData, secondName: value })
          }
          onLastNamePChange={(value) =>
            setPersonalData({ ...personalData, lastNameP: value })
          }
          onLastNameMChange={(value) =>
            setPersonalData({ ...personalData, lastNameM: value })
          }
          onPersonalTelChange={(value) =>
            setPersonalData({ ...personalData, personalTel: value })
          }
          onBack={() => setStep(2)}
          onSubmit={handleStep3Submit}
        />
      )}
    </AuthLayout>
  );
}
