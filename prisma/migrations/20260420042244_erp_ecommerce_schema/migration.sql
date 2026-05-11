/*
  Warnings:

  - You are about to drop the `detalle_venta` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `detalle_venta` DROP FOREIGN KEY `Detalle_Venta_detallePedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `detalle_venta` DROP FOREIGN KEY `Detalle_Venta_ventaId_fkey`;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `usuarioId` INTEGER NULL,
    MODIFY `documento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `estadoPago` ENUM('PENDIENTE', 'PAGADO', 'FALLIDO', 'REEMBOLSADO') NOT NULL DEFAULT 'PENDIENTE',
    ADD COLUMN `origen` ENUM('ERP', 'ECOMMERCE') NOT NULL DEFAULT 'ERP',
    MODIFY `estado` ENUM('PENDIENTE', 'PROCESANDO', 'PAGADO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE';

-- DropTable
DROP TABLE `detalle_venta`;

-- CreateTable
CREATE TABLE `Direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `distrito` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `referencia` VARCHAR(191) NULL,
    `esPrincipal` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Cliente_usuarioId_key` ON `Cliente`(`usuarioId`);

-- CreateIndex
CREATE INDEX `Pedido_estadoPago_idx` ON `Pedido`(`estadoPago`);

-- CreateIndex
CREATE INDEX `Pedido_origen_idx` ON `Pedido`(`origen`);

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
