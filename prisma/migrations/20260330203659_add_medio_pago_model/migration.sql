/*
  Warnings:

  - You are about to drop the column `metodoPago` on the `pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `metodoPago`,
    ADD COLUMN `medioPagoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `medio_pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `medio_pago_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_medioPagoId_fkey` FOREIGN KEY (`medioPagoId`) REFERENCES `medio_pago`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
