/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `TemplatePreview` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TemplatePreview" ADD COLUMN     "description" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TemplatePreview_slug_key" ON "TemplatePreview"("slug");
