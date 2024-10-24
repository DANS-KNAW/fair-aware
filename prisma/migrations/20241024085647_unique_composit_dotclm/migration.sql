/*
  Warnings:

  - A unique constraint covering the columns `[dotCode,languageCode]` on the table `DOTCLM` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dotCode` to the `DOTCLM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DOTCLM" ADD COLUMN     "dotCode" CHAR(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DOTCLM_dotCode_languageCode_key" ON "DOTCLM"("dotCode", "languageCode");
