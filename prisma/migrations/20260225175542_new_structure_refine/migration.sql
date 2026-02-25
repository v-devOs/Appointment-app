/*
  Warnings:

  - The values [ACEPTED] on the enum `StatusPayment` will be removed. If these variants are still used in the database, this will fail.
  - The values [OWNER_BUSSINES] on the enum `TypeUser` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `businessid` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `personalid` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `typeAppointmentid` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to alter the column `estimatedDuration` on the `AppointmentDetails` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `realDuration` on the `AppointmentDetails` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `ownerid` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessid` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `durationFreeTime` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `freeTime` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `comentaries` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `businessid` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `journalid` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `dateStartCurrentPeriod` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentid` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionid` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `businessid` on the `TypeAppointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slotId]` on the table `AppointmentDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessId` to the `AppointmentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `AppointmentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `AppointmentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotId` to the `AppointmentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeAppointmentId` to the `AppointmentDetails` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `hourStart` on the `AppointmentDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hourEnd` on the `AppointmentDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `ownerId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `hourOpen` on the `Business` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hourClose` on the `Business` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `businessId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfWeek` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `hourStart` on the `Journal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hourEnd` on the `Journal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `businessId` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessId` to the `TypeAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPayment_new" AS ENUM ('ACCEPTED', 'CANCELED', 'DECLINED', 'PENDING');
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "StatusPayment_new" USING ("status"::text::"StatusPayment_new");
ALTER TYPE "StatusPayment" RENAME TO "StatusPayment_old";
ALTER TYPE "StatusPayment_new" RENAME TO "StatusPayment";
DROP TYPE "public"."StatusPayment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TypeUser_new" AS ENUM ('ADMIN', 'OWNER_BUSINESS', 'EMPLOYEE');
ALTER TABLE "Personal" ALTER COLUMN "typePersonal" TYPE "TypeUser_new" USING ("typePersonal"::text::"TypeUser_new");
ALTER TYPE "TypeUser" RENAME TO "TypeUser_old";
ALTER TYPE "TypeUser_new" RENAME TO "TypeUser";
DROP TYPE "public"."TypeUser_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_businessid_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_personalid_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_typeAppointmentid_fkey";

-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_ownerid_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_businessid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_businessid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_journalid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_userid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_paymentid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_subscriptionid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_userid_fkey";

-- DropForeignKey
ALTER TABLE "TypeAppointment" DROP CONSTRAINT "TypeAppointment_businessid_fkey";

-- AlterTable
ALTER TABLE "AppointmentDetails" DROP COLUMN "businessid",
DROP COLUMN "personalid",
DROP COLUMN "typeAppointmentid",
ADD COLUMN     "businessId" INTEGER NOT NULL,
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "personalId" INTEGER NOT NULL,
ADD COLUMN     "slotId" INTEGER NOT NULL,
ADD COLUMN     "typeAppointmentId" INTEGER NOT NULL,
ALTER COLUMN "estimatedDuration" SET DATA TYPE INTEGER,
ALTER COLUMN "realDuration" DROP NOT NULL,
ALTER COLUMN "realDuration" SET DATA TYPE INTEGER,
DROP COLUMN "hourStart",
ADD COLUMN     "hourStart" TIMESTAMP(3) NOT NULL,
DROP COLUMN "hourEnd",
ADD COLUMN     "hourEnd" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "ownerid",
ADD COLUMN     "ownerId" INTEGER NOT NULL,
DROP COLUMN "hourOpen",
ADD COLUMN     "hourOpen" TIMESTAMP(3) NOT NULL,
DROP COLUMN "hourClose",
ADD COLUMN     "hourClose" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "businessid",
DROP COLUMN "secondName",
ADD COLUMN     "businessId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "durationFreeTime",
DROP COLUMN "freeTime",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL,
DROP COLUMN "hourStart",
ADD COLUMN     "hourStart" TIMESTAMP(3) NOT NULL,
DROP COLUMN "hourEnd",
ADD COLUMN     "hourEnd" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startAbsence" DROP NOT NULL,
ALTER COLUMN "endAbsence" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "comentaries",
DROP COLUMN "discount",
ALTER COLUMN "datePayment" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "businessid",
DROP COLUMN "journalid",
DROP COLUMN "userid",
ADD COLUMN     "businessId" INTEGER NOT NULL,
ADD COLUMN     "journalId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "dateStartCurrentPeriod";

-- AlterTable
ALTER TABLE "SubscriptionDetails" DROP COLUMN "paymentid",
DROP COLUMN "subscriptionid",
DROP COLUMN "userid",
ADD COLUMN     "paymentId" INTEGER NOT NULL,
ADD COLUMN     "subscriptionId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TypeAppointment" DROP COLUMN "businessid",
ADD COLUMN     "businessId" INTEGER NOT NULL,
ADD COLUMN     "defaultDuration" INTEGER NOT NULL DEFAULT 30;

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentDetails_slotId_key" ON "AppointmentDetails"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_typeAppointmentId_fkey" FOREIGN KEY ("typeAppointmentId") REFERENCES "TypeAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeAppointment" ADD CONSTRAINT "TypeAppointment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
