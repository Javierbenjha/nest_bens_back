-- CreateTable: TipoComprobante (Boleta/Factura para pedidos)
CREATE TABLE `tipo_comprobante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tipo_comprobante_nombre_key`(`nombre`),
    UNIQUE INDEX `tipo_comprobante_abreviatura_key`(`abreviatura`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddColumn: tipoComprobanteId en Pedido
ALTER TABLE `Pedido` ADD COLUMN `tipoComprobanteId` INTEGER NULL;

-- AddForeignKey: Pedido → TipoComprobante
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_tipoComprobanteId_fkey`
    FOREIGN KEY (`tipoComprobanteId`) REFERENCES `tipo_comprobante`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey: Pedido → TipoDocumento (ya no aplica a pedidos)
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_tipoDocumentoId_fkey`;

-- DropColumn: tipoDocumentoId de Pedido
ALTER TABLE `Pedido` DROP COLUMN `tipoDocumentoId`;
