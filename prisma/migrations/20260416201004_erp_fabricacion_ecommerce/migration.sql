/*
  Warnings:

  - You are about to alter the column `cantidad` on the `articulo` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,3)`.
  - You are about to drop the column `articuloId` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `detalle_venta` table. All the data in the column will be lost.
  - You are about to drop the column `descuento` on the `detalle_venta` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `detalle_venta` table. All the data in the column will be lost.
  - You are about to drop the column `productoId` on the `detalle_venta` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `detalle_venta` table. All the data in the column will be lost.
  - You are about to drop the column `talla` on the `inventario` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `descuento` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `impuesto` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the `talla_producto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[detallePedidoId]` on the table `Detalle_Venta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productoId,colorId,tallaId]` on the table `Inventario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Articulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Detalle_Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Detalle_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detallePedidoId` to the `Detalle_Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Detalle_Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tallaId` to the `Inventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Inventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Marca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Talla` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Made the column `pedidoId` on table `venta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_articuloId_fkey`;

-- DropForeignKey
ALTER TABLE `detalle_venta` DROP FOREIGN KEY `Detalle_Venta_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `talla_producto` DROP FOREIGN KEY `Talla_Producto_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `talla_producto` DROP FOREIGN KEY `Talla_Producto_tallaId_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `Venta_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `Venta_pedidoId_fkey`;

-- DropIndex
DROP INDEX `Compra_articuloId_fkey` ON `compra`;

-- DropIndex
DROP INDEX `Detalle_Venta_productoId_fkey` ON `detalle_venta`;

-- DropIndex
DROP INDEX `Venta_clienteId_fkey` ON `venta`;

-- AlterTable
ALTER TABLE `articulo` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `cantidad` DECIMAL(10, 3) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `tipoDocumentoId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `color` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `articuloId`,
    ADD COLUMN `tipo` ENUM('PRODUCTO', 'ARTICULO') NOT NULL DEFAULT 'PRODUCTO',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `detalle_compra` ADD COLUMN `colorId` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `tallaId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `detalle_pedido` ADD COLUMN `colorId` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `tallaId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `detalle_venta` DROP COLUMN `cantidad`,
    DROP COLUMN `descuento`,
    DROP COLUMN `precio`,
    DROP COLUMN `productoId`,
    DROP COLUMN `subtotal`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `detallePedidoId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inventario` DROP COLUMN `talla`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `tallaId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `marca` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `cantidad`,
    DROP COLUMN `descuento`,
    ADD COLUMN `tipoDescuento` ENUM('PORCENTAJE', 'VALOR_FIJO', 'SIN_DESCUENTO') NOT NULL DEFAULT 'SIN_DESCUENTO',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `proveedor` ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `talla` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `venta` DROP COLUMN `clienteId`,
    DROP COLUMN `impuesto`,
    DROP COLUMN `subtotal`,
    DROP COLUMN `total`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `pedidoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `talla_producto`;

-- CreateTable
CREATE TABLE `Detalle_Compra_Articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compraId` INTEGER NOT NULL,
    `articuloId` INTEGER NOT NULL,
    `cantidad` DECIMAL(10, 3) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto_Articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `articuloId` INTEGER NOT NULL,
    `cantidad` DECIMAL(10, 3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Producto_Articulo_productoId_articuloId_key`(`productoId`, `articuloId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenProduccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `tallaId` INTEGER NULL,
    `colorId` INTEGER NULL,
    `cantidadPlanificada` INTEGER NOT NULL,
    `cantidadProducida` INTEGER NOT NULL DEFAULT 0,
    `estado` ENUM('PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    `usuarioId` INTEGER NULL,
    `observaciones` TEXT NULL,
    `fechaInicio` DATETIME(3) NULL,
    `fechaFin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `OrdenProduccion_estado_idx`(`estado`),
    INDEX `OrdenProduccion_productoId_idx`(`productoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Compra_tipo_idx` ON `Compra`(`tipo`);

-- CreateIndex
CREATE UNIQUE INDEX `Detalle_Venta_detallePedidoId_key` ON `Detalle_Venta`(`detallePedidoId`);

-- CreateIndex
CREATE UNIQUE INDEX `Inventario_productoId_colorId_tallaId_key` ON `Inventario`(`productoId`, `colorId`, `tallaId`);

-- CreateIndex
CREATE INDEX `Pedido_estado_idx` ON `Pedido`(`estado`);

-- CreateIndex
CREATE UNIQUE INDEX `Producto_sku_key` ON `Producto`(`sku`);

-- CreateIndex
CREATE INDEX `Producto_tipoDescuento_idx` ON `Producto`(`tipoDescuento`);

-- CreateIndex
CREATE INDEX `Producto_estado_idx` ON `Producto`(`estado`);

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_tipoDocumentoId_fkey` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipo_documento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Pedido` ADD CONSTRAINT `Detalle_Pedido_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Pedido` ADD CONSTRAINT `Detalle_Pedido_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Venta` ADD CONSTRAINT `Detalle_Venta_detallePedidoId_fkey` FOREIGN KEY (`detallePedidoId`) REFERENCES `Detalle_Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra` ADD CONSTRAINT `Detalle_Compra_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra` ADD CONSTRAINT `Detalle_Compra_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra_Articulo` ADD CONSTRAINT `Detalle_Compra_Articulo_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Compra_Articulo` ADD CONSTRAINT `Detalle_Compra_Articulo_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto_Articulo` ADD CONSTRAINT `Producto_Articulo_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto_Articulo` ADD CONSTRAINT `Producto_Articulo_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenProduccion` ADD CONSTRAINT `OrdenProduccion_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenProduccion` ADD CONSTRAINT `OrdenProduccion_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenProduccion` ADD CONSTRAINT `OrdenProduccion_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenProduccion` ADD CONSTRAINT `OrdenProduccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
