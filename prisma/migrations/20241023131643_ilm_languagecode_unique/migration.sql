/*
  Warnings:

  - A unique constraint covering the columns `[languageCode]` on the table `ILM` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ILM_languageCode_key" ON "ILM"("languageCode");
