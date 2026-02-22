/*
  Warnings:

  - You are about to drop the column `businessId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `extraBusinessCount` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `firstPaymentDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `lastPaymentDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Subscription` table. All the data in the column will be lost.
  - The `status` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeSlot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firtsName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEndCurrentPeriod` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStartCurrentPeriod` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPayment" AS ENUM ('ACEPTED', 'CANCELED', 'DECLINED', 'PENDING');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PENDING_PAYMENT', 'CANCELED');

-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('ADMIN', 'OWNER_BUSSINES', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "StatusAppoinment" AS ENUM ('PENDING', 'CANCELED', 'ATTENDED', 'NO_ATTENDED');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_appointmentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slotId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentType" DROP CONSTRAINT "AppointmentType_businessId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_businessId_fkey";

-- DropIndex
DROP INDEX "Subscription_ownerId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "businessId",
DROP COLUMN "firstName",
DROP COLUMN "phone",
ADD COLUMN     "firtsName" TEXT NOT NULL,
ADD COLUMN     "secondName" TEXT,
ADD COLUMN     "tel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "endDate",
DROP COLUMN "extraBusinessCount",
DROP COLUMN "firstPaymentDate",
DROP COLUMN "lastPaymentDate",
DROP COLUMN "ownerId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 299.99,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateEndCurrentPeriod" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStartCurrentPeriod" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING_PAYMENT';

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "AppointmentType";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Owner";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "TimeSlot";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "datePayment" TIMESTAMP(3) NOT NULL,
    "status" "StatusPayment" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "typeUser" "TypeUser" NOT NULL DEFAULT 'OWNER_BUSSINES',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "hourStart" TIMESTAMP(3) NOT NULL,
    "hourEnd" TIMESTAMP(3) NOT NULL,
    "freeTime" TIMESTAMP(3) NOT NULL,
    "startAbsence" TIMESTAMP(3) NOT NULL,
    "endAbsence" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bussines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT,
    "direction" TEXT NOT NULL,
    "hourOpen" TIMESTAMP(3) NOT NULL,
    "hourClose" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bussines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "journalid" TEXT NOT NULL,
    "firtsName" TEXT NOT NULL,
    "secondName" TEXT,
    "lastNameP" TEXT NOT NULL,
    "lastNameM" TEXT,
    "tel" TEXT NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeApoinment" (
    "id" TEXT NOT NULL,
    "typeAppoinment" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TypeApoinment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appoinment" (
    "id" TEXT NOT NULL,
    "status" "StatusAppoinment" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "estimatedDuration" DOUBLE PRECISION NOT NULL,
    "realDuration" DOUBLE PRECISION NOT NULL,
    "clientid" TEXT NOT NULL,
    "typeAppoinmentid" TEXT NOT NULL,
    "personalid" TEXT NOT NULL,

    CONSTRAINT "Appoinment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionDetails" (
    "id" TEXT NOT NULL,
    "subscriptionid" TEXT NOT NULL,
    "paymentid" TEXT NOT NULL,
    "personalid" TEXT NOT NULL,

    CONSTRAINT "SubscriptionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalBussinesDetails" (
    "id" TEXT NOT NULL,
    "personalid" TEXT NOT NULL,
    "bussinesid" TEXT NOT NULL,
    "paymentid" TEXT NOT NULL,

    CONSTRAINT "PersonalBussinesDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_journalid_fkey" FOREIGN KEY ("journalid") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_typeAppoinmentid_fkey" FOREIGN KEY ("typeAppoinmentid") REFERENCES "TypeApoinment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_subscriptionid_fkey" FOREIGN KEY ("subscriptionid") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBussinesDetails" ADD CONSTRAINT "PersonalBussinesDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBussinesDetails" ADD CONSTRAINT "PersonalBussinesDetails_bussinesid_fkey" FOREIGN KEY ("bussinesid") REFERENCES "Bussines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBussinesDetails" ADD CONSTRAINT "PersonalBussinesDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
