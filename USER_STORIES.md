# 📋 Historias de Usuario — Sistema de Gestión (NestJS Backend)

> **Proyecto:** `nest_bens_back`  
> **Tecnología:** NestJS + Prisma + PostgreSQL  
> **Metodología:** Agile / Scrum  
> **Última actualización:** 2026-03-30  

---

## 📌 Leyenda

| Campo         | Descripción                                      |
|---------------|--------------------------------------------------|
| **ID**        | Identificador único de la historia               |
| **Módulo**    | Módulo NestJS al que pertenece                   |
| **Prioridad** | 🔴 Alta · 🟡 Media · 🟢 Baja                     |
| **Estado**    | ⬜ Pendiente · 🔄 En Progreso · ✅ Completada    |
| **Puntos**    | Estimación en puntos de historia (Fibonacci)     |

---

## 🗓️ Sprints Propuestos

| Sprint | Duración    | Módulos Cubiertos                                   |
|--------|-------------|-----------------------------------------------------|
| 1      | Semana 1–2  | Auth, Users                                         |
| 2      | Semana 3–4  | Products, Categories, Brands, Sizes, Items          |
| 3      | Semana 5–6  | Inventory, Suppliers, Purchases                     |
| 4      | Semana 7–8  | Clients, Orders, Coupons                            |
| 5      | Semana 9–10 | Sales, Payment Methods, Logistics, Cloudinary       |

---

## 🔐 Módulo: AUTH

### HU-001 — Iniciar Sesión
- **Como** administrador del sistema,
- **Quiero** iniciar sesión con mi correo electrónico y contraseña,
- **Para** acceder al panel de administración de forma segura.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /auth/login` acepta `email` y `password`
- [ ] Si las credenciales son incorrectas, retorna `401 Unauthorized`
- [ ] Al autenticar correctamente, retorna un token JWT válido
- [ ] El token tiene fecha de expiración configurada

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Auth   | 🔴 Alta   | ✅ Completada | 3   | 1      |

---

### HU-002 — Ver Perfil del Usuario Autenticado
- **Como** usuario autenticado,
- **Quiero** consultar mi información de perfil,
- **Para** verificar mis datos de acceso actuales.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /auth/perfil` requiere token JWT válido
- [ ] Retorna los datos del usuario sin exponer la contraseña
- [ ] Si el token es inválido o expirado, retorna `401 Unauthorized`

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Auth   | 🔴 Alta   | ✅ Completada | 2   | 1      |

---

## 👤 Módulo: USERS

### HU-003 — Crear Usuario
- **Como** superadministrador,
- **Quiero** crear nuevos usuarios del sistema,
- **Para** dar acceso a colaboradores con roles definidos.

**Criterios de Aceptación:**
- [ ] El sistema acepta nombre, correo, contraseña y rol
- [ ] La contraseña debe estar hasheada antes de persistir
- [ ] No se pueden duplicar correos electrónicos
- [ ] Retorna error `409 Conflict` si el correo ya existe

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Users  | 🔴 Alta   | ⬜ Pendiente | 3   | 1      |

---

### HU-004 — Listar Usuarios
- **Como** administrador,
- **Quiero** ver el listado de todos los usuarios registrados,
- **Para** gestionar los accesos al sistema.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /users` retorna la lista de usuarios
- [ ] No se expone el campo `password` en la respuesta
- [ ] Soporte opcional de paginación (`page`, `limit`)

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Users  | 🟡 Media  | ⬜ Pendiente | 2   | 1      |

---

### HU-005 — Eliminar Usuario
- **Como** superadministrador,
- **Quiero** eliminar un usuario del sistema,
- **Para** revocar accesos de colaboradores que ya no pertenecen al equipo.

**Criterios de Aceptación:**
- [ ] El endpoint `DELETE /users/:id` elimina el usuario indicado
- [ ] Si el usuario no existe, retorna `404 Not Found`
- [ ] El sistema no permite auto-eliminación del usuario en sesión

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Users  | 🟡 Media  | ⬜ Pendiente | 2   | 1      |

---

## 📦 Módulo: PRODUCTS

### HU-006 — Crear Producto
- **Como** administrador,
- **Quiero** registrar un nuevo producto con nombre, precio, descripción y categoría,
- **Para** agregarlo al catálogo disponible para la venta.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /products` crea el producto
- [ ] Los campos `nombre` y `precio` son obligatorios
- [ ] El `precio` debe ser un número positivo mayor a 0
- [ ] Se puede asociar a una categoría, marca y talla existente
- [ ] Retorna el producto creado con su ID asignado

| Módulo   | Prioridad | Estado     | Puntos | Sprint |
|----------|-----------|------------|--------|--------|
| Products | 🔴 Alta   | ⬜ Pendiente | 5   | 2      |

---

### HU-007 — Listar Productos
- **Como** administrador o vendedor,
- **Quiero** ver todos los productos disponibles en el catálogo,
- **Para** consultar su información y estado de inventario.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /products` retorna todos los productos
- [ ] La respuesta incluye nombre, precio, categoría y stock disponible
- [ ] Soporte de filtros opcionales por categoría, marca o talla

| Módulo   | Prioridad | Estado     | Puntos | Sprint |
|----------|-----------|------------|--------|--------|
| Products | 🔴 Alta   | ⬜ Pendiente | 3   | 2      |

---

### HU-008 — Actualizar Producto
- **Como** administrador,
- **Quiero** editar los datos de un producto existente,
- **Para** mantener el catálogo actualizado con información correcta.

**Criterios de Aceptación:**
- [ ] El endpoint `PATCH /products/:id` permite modificación parcial
- [ ] Si el producto no existe, retorna `404 Not Found`
- [ ] Se validan los mismos campos que en la creación

| Módulo   | Prioridad | Estado     | Puntos | Sprint |
|----------|-----------|------------|--------|--------|
| Products | 🟡 Media  | ⬜ Pendiente | 2   | 2      |

---

### HU-009 — Eliminar Producto
- **Como** administrador,
- **Quiero** eliminar un producto del catálogo,
- **Para** quitar artículos descontinuados o fuera de stock.

**Criterios de Aceptación:**
- [ ] El endpoint `DELETE /products/:id` elimina el producto
- [ ] Si el producto no existe, retorna `404 Not Found`
- [ ] El sistema alerta si el producto tiene pedidos asociados activos

| Módulo   | Prioridad | Estado     | Puntos | Sprint |
|----------|-----------|------------|--------|--------|
| Products | 🟡 Media  | ⬜ Pendiente | 2   | 2      |

---

## 🏷️ Módulo: CATEGORIES

### HU-010 — Gestionar Categorías de Productos
- **Como** administrador,
- **Quiero** crear, listar, editar y eliminar categorías,
- **Para** organizar el catálogo de productos por tipo.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/categories`
- [ ] El nombre de categoría es único y obligatorio
- [ ] Al eliminar una categoría, se valida que no tenga productos asociados

| Módulo     | Prioridad | Estado     | Puntos | Sprint |
|------------|-----------|------------|--------|--------|
| Categories | 🔴 Alta   | ⬜ Pendiente | 3   | 2      |

---

## 🏭 Módulo: BRAND

### HU-011 — Gestionar Marcas
- **Como** administrador,
- **Quiero** registrar y administrar las marcas de los productos,
- **Para** clasificar el catálogo por fabricante o proveedor.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/brand`
- [ ] El nombre de marca es único y obligatorio
- [ ] Las marcas pueden asociarse a múltiples productos

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Brand  | 🟡 Media  | ⬜ Pendiente | 2   | 2      |

---

## 📐 Módulo: SIZE

### HU-012 — Gestionar Tallas
- **Como** administrador,
- **Quiero** crear y gestionar las tallas disponibles para los productos,
- **Para** permitir que cada producto tenga variantes por talla.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/size`
- [ ] Las tallas pueden ser numéricas (38, 39...) o de texto (S, M, L, XL)
- [ ] Una talla eliminada no puede estar asociada a productos activos

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Size   | 🟡 Media  | ⬜ Pendiente | 2   | 2      |

---

## 🧩 Módulo: ITEMS

### HU-013 — Gestionar Ítems de Producto
- **Como** administrador,
- **Quiero** registrar variantes específicas de un producto (talla + color + precio),
- **Para** manejar el stock y precio por cada variante individualmente.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/items`
- [ ] Cada ítem se asocia a un producto, talla y precio específico
- [ ] El stock del ítem se actualiza al registrar movimientos de inventario

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Items  | 🔴 Alta   | ⬜ Pendiente | 5   | 2      |

---

## 🏭 Módulo: INVENTORY

### HU-014 — Registrar Entrada de Inventario
- **Como** encargado de bodega,
- **Quiero** registrar la entrada de productos al inventario,
- **Para** actualizar el stock disponible en el sistema.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /inventory` registra una entrada de stock
- [ ] Se especifica el producto, cantidad y fecha de ingreso
- [ ] El stock del producto se incrementa automáticamente
- [ ] Se guarda el historial del movimiento de inventario

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Inventory | 🔴 Alta   | 🔄 En Progreso | 5 | 3      |

---

### HU-015 — Consultar Stock Actual
- **Como** administrador o vendedor,
- **Quiero** consultar el nivel de stock actual de cada producto,
- **Para** saber cuándo reabastecer y evitar ventas sin stock.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /inventory` retorna el stock actual por producto
- [ ] Se puede filtrar por producto o categoría
- [ ] Se indica visualmente cuando el stock está por debajo del mínimo

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Inventory | 🔴 Alta   | ⬜ Pendiente | 3   | 3      |

---

### HU-016 — Registrar Salida de Inventario
- **Como** encargado de bodega,
- **Quiero** registrar la salida de productos del inventario,
- **Para** reflejar las mermas, devoluciones o ajustes de stock.

**Criterios de Aceptación:**
- [ ] El sistema valida que haya stock suficiente antes de registrar la salida
- [ ] Si el stock es insuficiente, retorna un error descriptivo
- [ ] Se guarda el motivo de la salida (ajuste, merma, devolución)

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Inventory | 🟡 Media  | ⬜ Pendiente | 3   | 3      |

---

## 🚚 Módulo: SUPPLIERS

### HU-017 — Gestionar Proveedores
- **Como** administrador,
- **Quiero** registrar y administrar los proveedores de productos,
- **Para** tener un directorio de contactos para abastecimiento.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/suppliers`
- [ ] Campos: nombre, RUC/NIT, teléfono, correo, dirección
- [ ] Un proveedor puede estar asociado a múltiples compras

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Suppliers | 🟡 Media  | ⬜ Pendiente | 3   | 3      |

---

## 🛍️ Módulo: PURCHASES

### HU-018 — Registrar Compra a Proveedor
- **Como** encargado de compras,
- **Quiero** registrar una compra realizada a un proveedor,
- **Para** actualizar el inventario y llevar el control de gastos.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /purchases` registra la compra
- [ ] Se vincula a un proveedor existente
- [ ] Se especifican los productos comprados, cantidades y precio unitario
- [ ] El inventario se actualiza automáticamente al registrar la compra

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Purchases | 🔴 Alta   | ⬜ Pendiente | 5   | 3      |

---

## 👥 Módulo: CLIENTS

### HU-019 — Registrar Cliente
- **Como** vendedor,
- **Quiero** registrar un nuevo cliente con sus datos personales,
- **Para** poder asociarlo a pedidos y ventas futuras.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /clients` crea el registro del cliente
- [ ] Campos: nombre, apellido, tipo de documento, número de documento, teléfono, correo
- [ ] No se permiten documentos de identidad duplicados
- [ ] Retorna el cliente creado con su ID asignado

| Módulo  | Prioridad | Estado     | Puntos | Sprint |
|---------|-----------|------------|--------|--------|
| Clients | 🔴 Alta   | ⬜ Pendiente | 3   | 4      |

---

### HU-020 — Consultar Historial de un Cliente
- **Como** administrador o vendedor,
- **Quiero** consultar el historial de pedidos y compras de un cliente,
- **Para** hacer seguimiento a su relación comercial.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /clients/:id` incluye las ventas asociadas
- [ ] Se muestra resumen: número de pedidos, total gastado, última compra
- [ ] Si el cliente no existe, retorna `404 Not Found`

| Módulo  | Prioridad | Estado     | Puntos | Sprint |
|---------|-----------|------------|--------|--------|
| Clients | 🟡 Media  | ⬜ Pendiente | 3   | 4      |

---

## 🛒 Módulo: ORDERS

### HU-021 — Crear Pedido
- **Como** vendedor,
- **Quiero** crear un nuevo pedido con uno o más productos para un cliente,
- **Para** iniciar el proceso de venta.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /orders` crea el pedido
- [ ] Se especifica el cliente, usuario vendedor y lista de productos con cantidades
- [ ] El sistema calcula automáticamente subtotal, impuestos y total
- [ ] Si algún producto no existe, retorna `404 Not Found`
- [ ] Se puede aplicar un cupón de descuento opcional

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Orders | 🔴 Alta   | ✅ Completada | 8   | 4      |

---

### HU-022 — Aplicar Cupón de Descuento a un Pedido
- **Como** vendedor,
- **Quiero** aplicar un código de cupón al crear un pedido,
- **Para** ofrecer descuentos válidos a clientes con promociones.

**Criterios de Aceptación:**
- [ ] El campo `cuponCodigo` es opcional en la creación del pedido
- [ ] Si el cupón no existe, retorna `400 Bad Request` con mensaje descriptivo
- [ ] Si el cupón ya está vencido o agotado, retorna error apropiado
- [ ] El descuento se aplica al total antes de los impuestos

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Orders | 🔴 Alta   | ✅ Completada | 5   | 4      |

---

### HU-023 — Consultar Pedidos
- **Como** administrador,
- **Quiero** listar todos los pedidos registrados en el sistema,
- **Para** hacer seguimiento al estado de cada pedido.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /orders` retorna todos los pedidos
- [ ] Cada pedido incluye: cliente, productos, total y estado
- [ ] Se puede filtrar por estado: `PENDIENTE`, `PAGADO`, `CANCELADO`

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Orders | 🔴 Alta   | ✅ Completada | 3   | 4      |

---

## 🎟️ Módulo: COUPONS

### HU-024 — Crear Cupón de Descuento
- **Como** administrador,
- **Quiero** crear cupones de descuento con código único y condiciones,
- **Para** ejecutar campañas promocionales en el sistema.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /coupons` crea el cupón
- [ ] Campos: código único, tipo de descuento (porcentaje o monto fijo), valor, fecha expiración, usos máximos
- [ ] El código del cupón no puede estar duplicado
- [ ] Un cupón vencido no puede ser aplicado a nuevos pedidos

| Módulo  | Prioridad | Estado     | Puntos | Sprint |
|---------|-----------|------------|--------|--------|
| Coupons | 🟡 Media  | ⬜ Pendiente | 5   | 4      |

---

### HU-025 — Validar Cupón
- **Como** vendedor,
- **Quiero** verificar si un código de cupón es válido antes de aplicarlo,
- **Para** confirmar al cliente que el descuento aplica.

**Criterios de Aceptación:**
- [ ] Se puede consultar el estado de un cupón por su código
- [ ] Retorna: estado (activo/vencido/agotado), tipo y valor del descuento
- [ ] Si no existe el código, retorna `404 Not Found`

| Módulo  | Prioridad | Estado     | Puntos | Sprint |
|---------|-----------|------------|--------|--------|
| Coupons | 🟡 Media  | ⬜ Pendiente | 2   | 4      |

---

## 💰 Módulo: SALES

### HU-026 — Generar Venta desde un Pedido
- **Como** cajero o vendedor,
- **Quiero** convertir un pedido confirmado en una venta registrada,
- **Para** completar el ciclo de venta y actualizar el estado del pedido.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /sales/from-order/:pedidoId` procesa la venta
- [ ] El pedido debe existir; si no, retorna `404 Not Found`
- [ ] No se puede generar una segunda venta para el mismo pedido (`409 Conflict`)
- [ ] Al crear la venta, el estado del pedido cambia a `PAGADO`
- [ ] La venta replica los detalles del pedido (productos, cantidades, precios)

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Sales  | 🔴 Alta   | ✅ Completada | 8   | 5      |

---

### HU-027 — Listar Ventas
- **Como** administrador,
- **Quiero** consultar todas las ventas registradas con sus detalles,
- **Para** analizar el desempeño comercial del negocio.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /sales` retorna todas las ventas con detalles y cliente
- [ ] Se puede filtrar por rango de fechas
- [ ] Cada venta muestra: fecha, cliente, productos vendidos, subtotal, impuesto y total

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Sales  | 🔴 Alta   | ✅ Completada | 3   | 5      |

---

### HU-028 — Eliminar Venta
- **Como** administrador,
- **Quiero** poder anular una venta registrada,
- **Para** corregir errores de registro o procesar devoluciones.

**Criterios de Aceptación:**
- [ ] El endpoint `DELETE /sales/:id` elimina la venta
- [ ] Si la venta no existe, retorna `404 Not Found`
- [ ] Al anular la venta, el estado del pedido asociado vuelve a `PENDIENTE`

| Módulo | Prioridad | Estado     | Puntos | Sprint |
|--------|-----------|------------|--------|--------|
| Sales  | 🟡 Media  | ⬜ Pendiente | 3   | 5      |

---

## 💳 Módulo: PAYMENT-METHOD

### HU-029 — Gestionar Métodos de Pago
- **Como** administrador,
- **Quiero** registrar y administrar los métodos de pago aceptados,
- **Para** que los vendedores puedan indicar cómo pagó el cliente.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/payment-method`
- [ ] Ejemplos: Efectivo, Tarjeta de crédito, Transferencia, QR
- [ ] Un método de pago activo puede ser asignado a una venta

| Módulo         | Prioridad | Estado     | Puntos | Sprint |
|----------------|-----------|------------|--------|--------|
| Payment Method | 🟡 Media  | ⬜ Pendiente | 2   | 5      |

---

## 🚛 Módulo: LOGISTICS

### HU-030 — Registrar Envío de un Pedido
- **Como** encargado de despacho,
- **Quiero** registrar la información de envío de un pedido,
- **Para** hacer seguimiento a la entrega al cliente.

**Criterios de Aceptación:**
- [ ] El endpoint `POST /logistics` crea el registro de envío
- [ ] Campos: pedido asociado, dirección de entrega, transportista, número de guía
- [ ] El pedido debe existir y estar en estado `PAGADO`

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Logistics | 🟡 Media  | 🔄 En Progreso | 5 | 5      |

---

### HU-031 — Consultar Estado de Envío
- **Como** administrador o cliente,
- **Quiero** consultar el estado actual de un envío por número de guía,
- **Para** saber en qué etapa se encuentra la entrega.

**Criterios de Aceptación:**
- [ ] El endpoint `GET /logistics/:id` retorna el estado del envío
- [ ] Estados posibles: `PREPARANDO`, `EN_CAMINO`, `ENTREGADO`, `DEVUELTO`
- [ ] Si el envío no existe, retorna `404 Not Found`

| Módulo    | Prioridad | Estado     | Puntos | Sprint |
|-----------|-----------|------------|--------|--------|
| Logistics | 🟡 Media  | ⬜ Pendiente | 2   | 5      |

---

## 🖼️ Módulo: CLOUDINARY

### HU-032 — Subir Imagen de Producto
- **Como** administrador,
- **Quiero** subir y gestionar imágenes de productos en la nube (Cloudinary),
- **Para** mostrar imágenes de calidad en el catálogo sin ocupar almacenamiento local.

**Criterios de Aceptación:**
- [ ] El endpoint acepta archivos de imagen (JPG, PNG, WEBP)
- [ ] La imagen se sube a Cloudinary y retorna la URL pública
- [ ] La URL se almacena en el registro del producto
- [ ] Si el archivo no es una imagen válida, retorna `400 Bad Request`

| Módulo     | Prioridad | Estado     | Puntos | Sprint |
|------------|-----------|------------|--------|--------|
| Cloudinary | 🟡 Media  | ⬜ Pendiente | 3   | 5      |

---

## 📄 Módulo: TYPE-DOCUMENT

### HU-033 — Gestionar Tipos de Documento
- **Como** administrador,
- **Quiero** configurar los tipos de documento de identidad aceptados,
- **Para** poder clasificar correctamente a clientes y proveedores.

**Criterios de Aceptación:**
- [ ] CRUD completo disponible en `/type-document`
- [ ] Ejemplos: DNI, RUC, Pasaporte, Cédula
- [ ] Un tipo de documento activo puede ser asignado al registrar un cliente

| Módulo        | Prioridad | Estado     | Puntos | Sprint |
|---------------|-----------|------------|--------|--------|
| Type Document | 🟢 Baja   | ⬜ Pendiente | 1   | 1      |

---

## 📊 Resumen General

| Sprint | Historias | Puntos Totales |
|--------|-----------|---------------|
| 1      | HU-001 a HU-005, HU-033 | 13 |
| 2      | HU-006 a HU-013        | 22 |
| 3      | HU-014 a HU-018        | 19 |
| 4      | HU-019 a HU-025        | 29 |
| 5      | HU-026 a HU-032        | 26 |
| **Total** | **33 historias**    | **109 pts** |

---

## ✅ Definición de "Terminado" (Definition of Done)

Una historia de usuario se considera **Terminada** cuando:

1. ✅ El endpoint está implementado y documentado
2. ✅ Las validaciones de entrada están aplicadas (DTOs con class-validator)
3. ✅ Los errores HTTP retornan mensajes descriptivos (400, 404, 409, etc.)
4. ✅ El código pasa el linting sin errores (`npm run lint`)
5. ✅ La funcionalidad fue probada manualmente con Postman o Thunder Client
6. ✅ El código fue revisado antes de hacer merge a la rama principal

---

*📝 Este documento debe actualizarse al inicio de cada sprint y al completar cada historia.*
