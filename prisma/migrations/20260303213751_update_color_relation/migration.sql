/*
  Warnings:

  - Added the required column `productoId` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Color_nombre_key` ON `color`;

-- AlterTable
ALTER TABLE `color` ADD COLUMN `productoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Color` ADD CONSTRAINT `Color_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
