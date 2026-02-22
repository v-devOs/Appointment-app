/*
  Warnings:

  - You are about to drop the column `firtsName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `firtsName` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the `Appoinment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bussines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalBussinesDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeApoinment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userid]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessid` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessid` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusAppointment" AS ENUM ('PENDING', 'CANCELED', 'ATTENDED', 'NO_ATTENDED');

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_clientid_fkey";

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_personalid_fkey";

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_typeAppoinmentid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBussinesDetails" DROP CONSTRAINT "PersonalBussinesDetails_bussinesid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBussinesDetails" DROP CONSTRAINT "PersonalBussinesDetails_paymentid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBussinesDetails" DROP CONSTRAINT "PersonalBussinesDetails_personalid_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "firtsName",
ADD COLUMN     "businessid" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "firtsName",
ADD COLUMN     "businessid" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Appoinment";

-- DropTable
DROP TABLE "Bussines";

-- DropTable
DROP TABLE "PersonalBussinesDetails";

-- DropTable
DROP TABLE "TypeApoinment";

-- DropEnum
DROP TYPE "StatusAppoinment";

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT,
    "direction" TEXT NOT NULL,
    "hourOpen" TIMESTAMP(3) NOT NULL,
    "hourClose" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeAppointment" (
    "id" TEXT NOT NULL,
    "typeAppointment" TEXT NOT NULL,
    "description" TEXT,
    "businessid" TEXT NOT NULL,

    CONSTRAINT "TypeAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "status" "StatusAppointment" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "estimatedDuration" DOUBLE PRECISION NOT NULL,
    "realDuration" DOUBLE PRECISION NOT NULL,
    "clientid" TEXT NOT NULL,
    "typeAppointmentid" TEXT NOT NULL,
    "personalid" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalBusinessDetails" (
    "id" TEXT NOT NULL,
    "personalid" TEXT NOT NULL,
    "businessid" TEXT NOT NULL,
    "paymentid" TEXT NOT NULL,

    CONSTRAINT "PersonalBusinessDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userid_key" ON "Personal"("userid");

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
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBusinessDetails" ADD CONSTRAINT "PersonalBusinessDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
