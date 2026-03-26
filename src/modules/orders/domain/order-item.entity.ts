export class OrderItem {
  constructor(
    public readonly productoId: number,
    public readonly cantidad: number,
    public readonly precioUnitario: number,
    public readonly descuento: number, // Descuento porcentual o fijo por producto?
    public readonly subtotal: number,
  ) {}

  static create(productoId: number, cantidad: number, precio: number, descuentoProducto: number): OrderItem {
    // Calculamos el subtotal del ítem aplicando el descuento del producto
    const descuentoMonto = precio * (descuentoProducto / 100);
    const precioConDescuento = precio - descuentoMonto;
    const subtotal = precioConDescuento * cantidad;

    return new OrderItem(
      productoId,
      cantidad,
      precio,
      descuentoMonto * cantidad, // Guardamos el monto total descontado para este ítem
      subtotal
    );
  }
}
