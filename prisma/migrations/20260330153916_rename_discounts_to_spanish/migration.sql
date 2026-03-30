/*
  Warnings:

  - You are about to drop the column `discountValue` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `hasDiscount` on the `producto` table. All the data in the column will be lost.
  - You are about to alter the column `descuento` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `discountValue`,
    DROP COLUMN `hasDiscount`,
    ADD COLUMN `valorDescuento` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    MODIFY `descuento` INTEGER NOT NULL DEFAULT 0;
