/*
  Warnings:

  - You are about to drop the column `tipoComprobante` on the `pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `tipoComprobante`,
    ADD COLUMN `tipoDocumentoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_tipoDocumentoId_fkey` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipo_documento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
