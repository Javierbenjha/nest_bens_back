/*
  Warnings:

  - You are about to drop the `detallepedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detalleventa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detallepedido` DROP FOREIGN KEY `DetallePedido_pedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `detallepedido` DROP FOREIGN KEY `DetallePedido_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `DetalleVenta_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `DetalleVenta_ventaId_fkey`;

-- DropTable
DROP TABLE `detallepedido`;

-- DropTable
DROP TABLE `detalleventa`;

-- CreateTable
CREATE TABLE `Detalle_Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalle_Venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ventaId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Detalle_Pedido` ADD CONSTRAINT `Detalle_Pedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Pedido` ADD CONSTRAINT `Detalle_Pedido_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Venta` ADD CONSTRAINT `Detalle_Venta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Venta` ADD CONSTRAINT `Detalle_Venta_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
