/*
  Warnings:

  - You are about to drop the column `compraId` on the `articulo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `Articulo_compraId_fkey`;

-- DropIndex
DROP INDEX `Articulo_compraId_fkey` ON `articulo`;

-- AlterTable
ALTER TABLE `articulo` DROP COLUMN `compraId`;

-- AlterTable
ALTER TABLE `compra` ADD COLUMN `articuloId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
