/*
  Warnings:

  - You are about to drop the column `precio` on the `detalle_pedido` table. All the data in the column will be lost.
  - Added the required column `precioUnitario` to the `Detalle_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Detalle_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalle_pedido` DROP COLUMN `precio`,
    ADD COLUMN `descuento` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `precioUnitario` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `cuponId` INTEGER NULL,
    ADD COLUMN `descuento` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `descuentoCupon` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `direccionEnvio` VARCHAR(191) NULL,
    ADD COLUMN `estado` ENUM('PENDIENTE', 'PROCESANDO', 'PAGADO', 'ENTREGADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    ADD COLUMN `fechaEntrega` DATETIME(3) NULL,
    ADD COLUMN `impuesto` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `metodoPago` ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO') NOT NULL DEFAULT 'EFECTIVO',
    ADD COLUMN `observaciones` TEXT NULL,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `tipoComprobante` ENUM('BOLETA', 'FACTURA', 'REMAISION') NOT NULL DEFAULT 'BOLETA',
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NULL;

-- AlterTable
ALTER TABLE `producto` ADD COLUMN `descuento` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- CreateTable
CREATE TABLE `Cupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `tipo` ENUM('PORCENTAJE', 'VALOR_FIJO') NOT NULL DEFAULT 'PORCENTAJE',
    `usosMaximos` INTEGER NULL DEFAULT 1,
    `usosActuales` INTEGER NOT NULL DEFAULT 0,
    `fechaExpiracion` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cupon_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_cuponId_fkey` FOREIGN KEY (`cuponId`) REFERENCES `Cupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
