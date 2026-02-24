/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Business` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Journal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Journal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Personal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Personal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PersonalBusinessDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PersonalBusinessDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SubscriptionDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SubscriptionDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TypeAppointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TypeAppointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clientid` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `typeAppointmentid` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `personalid` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `businessid` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `durationFreeTime` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userid` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `journalid` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `businessid` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `personalid` on the `PersonalBusinessDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `businessid` on the `PersonalBusinessDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentid` on the `PersonalBusinessDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subscriptionid` on the `SubscriptionDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentid` on the `SubscriptionDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `personalid` on the `SubscriptionDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `businessid` on the `TypeAppointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientid_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_personalid_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_typeAppointmentid_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_businessid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_businessid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_journalid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_userid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_businessid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_paymentid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_personalid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_paymentid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_personalid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_subscriptionid_fkey";

-- DropForeignKey
ALTER TABLE "TypeAppointment" DROP CONSTRAINT "TypeAppointment_businessid_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "clientid",
ADD COLUMN     "clientid" INTEGER NOT NULL,
DROP COLUMN "typeAppointmentid",
ADD COLUMN     "typeAppointmentid" INTEGER NOT NULL,
DROP COLUMN "personalid",
ADD COLUMN     "personalid" INTEGER NOT NULL,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Business" DROP CONSTRAINT "Business_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "hourOpen" SET DATA TYPE TEXT,
ALTER COLUMN "hourClose" SET DATA TYPE TEXT,
ADD CONSTRAINT "Business_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "businessid",
ADD COLUMN     "businessid" INTEGER NOT NULL,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_pkey",
ADD COLUMN     "durationFreeTime" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "hourStart" SET DATA TYPE TEXT,
ALTER COLUMN "hourEnd" SET DATA TYPE TEXT,
ALTER COLUMN "freeTime" SET DATA TYPE TEXT,
ADD CONSTRAINT "Journal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userid",
ADD COLUMN     "userid" INTEGER NOT NULL,
DROP COLUMN "journalid",
ADD COLUMN     "journalid" INTEGER NOT NULL,
DROP COLUMN "businessid",
ADD COLUMN     "businessid" INTEGER NOT NULL,
ADD CONSTRAINT "Personal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personalid",
ADD COLUMN     "personalid" INTEGER NOT NULL,
DROP COLUMN "businessid",
ADD COLUMN     "businessid" INTEGER NOT NULL,
DROP COLUMN "paymentid",
ADD COLUMN     "paymentid" INTEGER NOT NULL,
ADD CONSTRAINT "PersonalBusinessDetails_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "subscriptionid",
ADD COLUMN     "subscriptionid" INTEGER NOT NULL,
DROP COLUMN "paymentid",
ADD COLUMN     "paymentid" INTEGER NOT NULL,
DROP COLUMN "personalid",
ADD COLUMN     "personalid" INTEGER NOT NULL,
ADD CONSTRAINT "SubscriptionDetails_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeAppointment" DROP CONSTRAINT "TypeAppointment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "businessid",
ADD COLUMN     "businessid" INTEGER NOT NULL,
ADD CONSTRAINT "TypeAppointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userid_key" ON "Personal"("userid");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_journalid_fkey" FOREIGN KEY ("journalid") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeAppointment" ADD CONSTRAINT "TypeAppointment_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_typeAppointmentid_fkey" FOREIGN KEY ("typeAppointmentid") REFERENCES "TypeAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_subscriptionid_fkey" FOREIGN KEY ("subscriptionid") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
