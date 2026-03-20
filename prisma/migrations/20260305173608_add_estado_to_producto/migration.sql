-- AlterTable
ALTER TABLE `producto` ADD COLUMN `cantidad` INTEGER NULL DEFAULT 0,
    ADD COLUMN `estado` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO';

-- CreateTable
CREATE TABLE `Talla` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Talla_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Talla_Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tallaId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Talla_Producto` ADD CONSTRAINT `Talla_Producto_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Talla_Producto` ADD CONSTRAINT `Talla_Producto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
