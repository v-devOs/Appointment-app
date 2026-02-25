/*
  Warnings:

  - The values [ACCEPTED] on the enum `StatusPayment` will be removed. If these variants are still used in the database, this will fail.
  - The values [OWNER_BUSINESS] on the enum `TypeUser` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `businessId` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `slotId` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `typeAppointmentId` on the `AppointmentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeek` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `journalId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SubscriptionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `TypeAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `defaultDuration` on the `TypeAppointment` table. All the data in the column will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeSlot` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `realDuration` on table `AppointmentDetails` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerid` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessid` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationFreeTime` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freeTime` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Made the column `startAbsence` on table `Journal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endAbsence` on table `Journal` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `businessid` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentid` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionid` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `SubscriptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessid` to the `TypeAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPayment_new" AS ENUM ('ACEPTED', 'CANCELED', 'DECLINED', 'PENDING');
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "StatusPayment_new" USING ("status"::text::"StatusPayment_new");
ALTER TYPE "StatusPayment" RENAME TO "StatusPayment_old";
ALTER TYPE "StatusPayment_new" RENAME TO "StatusPayment";
DROP TYPE "public"."StatusPayment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TypeUser_new" AS ENUM ('ADMIN', 'OWNER_BUSSINES', 'EMPLOYEE');
ALTER TABLE "Personal" ALTER COLUMN "typePersonal" TYPE "TypeUser_new" USING ("typePersonal"::text::"TypeUser_new");
ALTER TYPE "TypeUser" RENAME TO "TypeUser_old";
ALTER TYPE "TypeUser_new" RENAME TO "TypeUser";
DROP TYPE "public"."TypeUser_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_businessId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_clientId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_personalId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_slotId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentDetails" DROP CONSTRAINT "AppointmentDetails_typeAppointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_journalId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionDetails" DROP CONSTRAINT "SubscriptionDetails_userId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_businessId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_personalId_fkey";

-- DropForeignKey
ALTER TABLE "TypeAppointment" DROP CONSTRAINT "TypeAppointment_businessId_fkey";

-- DropIndex
DROP INDEX "AppointmentDetails_slotId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "AppointmentDetails" DROP COLUMN "businessId",
DROP COLUMN "clientId",
DROP COLUMN "personalId",
DROP COLUMN "slotId",
DROP COLUMN "typeAppointmentId",
ADD COLUMN     "businessid" INTEGER,
ADD COLUMN     "clientid" INTEGER,
ADD COLUMN     "personalid" INTEGER,
ADD COLUMN     "typeAppointmentid" INTEGER,
ALTER COLUMN "realDuration" SET NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "ownerId",
ADD COLUMN     "ownerid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "businessId",
ADD COLUMN     "businessid" INTEGER NOT NULL,
ADD COLUMN     "secondName" TEXT;

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "dayOfWeek",
ADD COLUMN     "durationFreeTime" INTEGER NOT NULL,
ADD COLUMN     "freeTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startAbsence" SET NOT NULL,
ALTER COLUMN "endAbsence" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "comentaries" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0.00,
ALTER COLUMN "datePayment" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "businessId",
DROP COLUMN "journalId",
DROP COLUMN "userId",
ADD COLUMN     "businessid" INTEGER NOT NULL,
ADD COLUMN     "journalid" INTEGER,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "dateStartCurrentPeriod" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SubscriptionDetails" DROP COLUMN "paymentId",
DROP COLUMN "subscriptionId",
DROP COLUMN "userId",
ADD COLUMN     "paymentid" INTEGER NOT NULL,
ADD COLUMN     "subscriptionid" INTEGER NOT NULL,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TypeAppointment" DROP COLUMN "businessId",
DROP COLUMN "defaultDuration",
ADD COLUMN     "businessid" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "TimeSlot";

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_journalid_fkey" FOREIGN KEY ("journalid") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeAppointment" ADD CONSTRAINT "TypeAppointment_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_subscriptionid_fkey" FOREIGN KEY ("subscriptionid") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_paymentid_fkey" FOREIGN KEY ("paymentid") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDetails" ADD CONSTRAINT "SubscriptionDetails_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_personalid_fkey" FOREIGN KEY ("personalid") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_typeAppointmentid_fkey" FOREIGN KEY ("typeAppointmentid") REFERENCES "TypeAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetails" ADD CONSTRAINT "AppointmentDetails_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
