export default class Factura {
  constructor(id,identificacion, nombre,numeroFactura,fecha, proveedor, productoId,subproductoId,cantidad,subtotal, iva, total) {
    this.id = id;
    this.identificacion = identificacion;
    this.nombre = nombre;
    this.numeroFactura = numeroFactura;
    this.fecha = fecha;
    this.proveedor = proveedor;
    this.productoId = productoId;
    this.subproductoId = subproductoId;
    this.cantidad = cantidad; 
    this.subtotal = subtotal; 
    this.iva = iva; 
    this.total = total; 
    this.sincronizada = false;
  }
}