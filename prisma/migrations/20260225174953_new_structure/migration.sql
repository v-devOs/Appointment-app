/*
  Warnings:

  - You are about to drop the column `personalid` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `typeUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalBusinessDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerid` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typePersonal` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Made the column `businessid` on table `Personal` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userid` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusSubscription" AS ENUM ('ACTIVE', 'PENDING_PAYMENT', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientid_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_personalid_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_typeAppointmentid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_businessid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_businessid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_paymentid_fkey";

-- DropForeignKey
ALTER TABLE "PersonalBusinessDetails" DROP CONSTRAINT "PersonalBusinessDetails_personalid_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_personalid_fkey";

-- DropIndex
DROP INDEX "Personal_userid_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "ownerid" INTEGER NOT NULL,
ALTER COLUMN "direction" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Journal" ALTER COLUMN "durationFreeTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "comentaries" TEXT,
ALTER COLUMN "amount" SET DEFAULT 0.00,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "discount" SET DEFAULT 0.00;

-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "typePersonal" "TypeUser" NOT NULL,
ALTER COLUMN "businessid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "amount" SET DEFAULT 239.99,
ALTER COLUMN "dateStartCurrentPeriod" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusSubscription" NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionDetails" DROP COLUMN "personalid",
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeUser";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "PersonalBusinessDetails";

-- DropEnum
DROP TYPE "SubscriptionStatus";

-- CreateTable
CREATE TABLE "AppointmentDetails" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "StatusAppointment" NOT NULL,
    "estimatedDuration" DOUBLE PRECISION NOT NULL,
    "realDuration" DOUBLE PRECISION NOT NULL,
    "hourStart" TEXT NOT NULL,
    "hourEnd" TEXT NOT NULL,
    "personalid" INTEGER,
    "businessid" INTEGER,
    "typeAppointmentid" INTEGER,

    CONSTRAINT "AppointmentDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_typeAppointmentid_fkey" FOREIGN KEY ("typeAppointmentid") REFERENCES "TypeAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
