/*
  Warnings:

  - You are about to drop the column `proveedorId` on the `producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_proveedorId_fkey`;

-- DropIndex
DROP INDEX `Producto_proveedorId_fkey` ON `producto`;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `proveedorId`;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedorId` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalle_Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compraId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra` ADD CONSTRAINT `Detalle_Compra_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra` ADD CONSTRAINT `Detalle_Compra_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
