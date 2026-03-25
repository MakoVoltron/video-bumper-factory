/*
  Warnings:

  - Made the column `description` on table `TemplatePreview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `TemplatePreview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TemplatePreview" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "slug" SET NOT NULL;
