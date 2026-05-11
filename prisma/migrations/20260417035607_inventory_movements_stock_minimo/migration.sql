-- AlterTable
ALTER TABLE `inventario` ADD COLUMN `stockMinimo` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `MovimientoInventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inventarioId` INTEGER NOT NULL,
    `tipo` ENUM('INGRESO', 'EGRESO', 'AJUSTE', 'DEVOLUCION') NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `stockAntes` INTEGER NOT NULL,
    `stockDespues` INTEGER NOT NULL,
    `referencia` VARCHAR(191) NULL,
    `notas` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovimientoInventario` ADD CONSTRAINT `MovimientoInventario_inventarioId_fkey` FOREIGN KEY (`inventarioId`) REFERENCES `Inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
