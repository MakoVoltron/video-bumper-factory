-- CreateTable
CREATE TABLE "OrderAsset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "OrderAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderAsset" ADD CONSTRAINT "OrderAsset_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
