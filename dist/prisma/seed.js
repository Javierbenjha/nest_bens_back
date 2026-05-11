"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const tiposDoc = [
        { nombre: 'Documento Nacional de Identidad', abreviatura: 'DNI' },
        { nombre: 'Registro Único de Contribuyentes', abreviatura: 'RUC' },
        { nombre: 'Carnet de Extranjería', abreviatura: 'CE' },
        { nombre: 'Pasaporte', abreviatura: 'PASAPORTE' },
    ];
    for (const t of tiposDoc) {
        await prisma.tipoDocumento.upsert({ where: { abreviatura: t.abreviatura }, update: {}, create: t });
    }
    console.log('✅ Tipos de documento (identidad)');
    const tiposComprobante = [
        { nombre: 'Boleta de Venta', abreviatura: 'BOL' },
        { nombre: 'Factura', abreviatura: 'FAC' },
    ];
    for (const t of tiposComprobante) {
        await prisma.tipoComprobante.upsert({ where: { abreviatura: t.abreviatura }, update: {}, create: t });
    }
    console.log('✅ Tipos de comprobante (Boleta / Factura)');
    const categorias = ['CAMISAS', 'PANTALONES', 'VESTIDOS', 'POLOS', 'CHAQUETAS', 'ACCESORIOS'];
    for (const nombre of categorias) {
        await prisma.categoria.upsert({ where: { nombre }, update: {}, create: { nombre } });
    }
    console.log('✅ Categorías');
    const marcas = ['BENS', 'GENÉRICA', 'PREMIUM', 'CLÁSICA'];
    for (const nombre of marcas) {
        await prisma.marca.upsert({ where: { nombre }, update: {}, create: { nombre } });
    }
    console.log('✅ Marcas');
    const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ÚNICO'];
    for (const nombre of tallas) {
        await prisma.talla.upsert({ where: { nombre }, update: {}, create: { nombre } });
    }
    console.log('✅ Tallas');
    const medios = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'YAPE', 'PLIN'];
    for (const nombre of medios) {
        await prisma.medioPago.upsert({ where: { nombre }, update: {}, create: { nombre } });
    }
    console.log('✅ Medios de pago');
}
main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map