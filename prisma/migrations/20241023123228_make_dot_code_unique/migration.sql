/*
  Warnings:

  - A unique constraint covering the columns `[dot]` on the table `DOT` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DOT_dot_key" ON "DOT"("dot");
