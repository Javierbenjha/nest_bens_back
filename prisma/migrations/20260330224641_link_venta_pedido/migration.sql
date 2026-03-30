/*
  Warnings:

  - A unique constraint covering the columns `[pedidoId]` on the table `Venta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `detalle_venta` ADD COLUMN `descuento` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `impuesto` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `pedidoId` INTEGER NULL,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- CreateIndex
CREATE UNIQUE INDEX `Venta_pedidoId_key` ON `Venta`(`pedidoId`);

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
