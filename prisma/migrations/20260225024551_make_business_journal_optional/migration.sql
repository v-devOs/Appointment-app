-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_businessid_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_journalid_fkey";

-- AlterTable
ALTER TABLE "Personal" ALTER COLUMN "journalid" DROP NOT NULL,
ALTER COLUMN "businessid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_journalid_fkey" FOREIGN KEY ("journalid") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_businessid_fkey" FOREIGN KEY ("businessid") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
