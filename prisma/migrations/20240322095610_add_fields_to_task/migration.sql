-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
