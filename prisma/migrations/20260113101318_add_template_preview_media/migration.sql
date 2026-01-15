/*
  Warnings:

  - The primary key for the `TemplatePreview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `previewUrl` on the `TemplatePreview` table. All the data in the column will be lost.
  - The `id` column on the `TemplatePreview` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `posterPublicId` to the `TemplatePreview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoPublicId` to the `TemplatePreview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `TemplatePreview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplatePreview" DROP CONSTRAINT "TemplatePreview_pkey",
DROP COLUMN "previewUrl",
ADD COLUMN     "posterPublicId" TEXT NOT NULL,
ADD COLUMN     "videoPublicId" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "TemplatePreview_pkey" PRIMARY KEY ("id");
