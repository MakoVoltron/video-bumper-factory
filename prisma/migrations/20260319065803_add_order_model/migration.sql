-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAID_AWAITING_ASSETS', 'ASSET_UPLOADED', 'DELIVERED');

-- AlterTable
ALTER TABLE "StripeEvent" ADD COLUMN     "payload" JSONB;

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userEmail" TEXT NOT NULL,
    "templateId" UUID NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "stripeEventId" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PAID_AWAITING_ASSETS',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentId_key" ON "Order"("paymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeEventId_key" ON "Order"("stripeEventId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "TemplatePreview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_stripeEventId_fkey" FOREIGN KEY ("stripeEventId") REFERENCES "StripeEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
