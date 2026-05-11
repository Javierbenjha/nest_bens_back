export class OrderItem {
  constructor(
    public readonly productoId: number,
    public readonly tallaId: number | undefined,
    public readonly colorId: number | undefined,
    public readonly cantidad: number,
    public readonly precioUnitario: number,
    public readonly descuento: number,
    public readonly subtotal: number,
  ) {}

  static create(
    productoId: number,
    tallaId: number | undefined,
    colorId: number | undefined,
    cantidad: number,
    precio: number,
    tipoDescuento: 'PORCENTAJE' | 'VALOR_FIJO' | 'SIN_DESCUENTO',
    valorDescuentoProducto: number,
  ): OrderItem {
    let descuentoUnitario = 0;

    if (tipoDescuento === 'PORCENTAJE') {
      descuentoUnitario = precio * (valorDescuentoProducto / 100);
    } else if (tipoDescuento === 'VALOR_FIJO') {
      descuentoUnitario = valorDescuentoProducto;
    }

    const precioConDescuento = precio - descuentoUnitario;
    const subtotal = precioConDescuento * cantidad;

    return new OrderItem(
      productoId,
      tallaId,
      colorId,
      cantidad,
      precio,
      descuentoUnitario * cantidad,
      subtotal,
    );
  }
}
