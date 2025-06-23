export default class Factura {
  constructor(identificacion, nombre,numeroFactura,fecha, proveedor, monto,subproductoId) {
    this.identificacion = identificacion;
    this.nombre = nombre;
    this.numeroFactura = numeroFactura;
    this.fecha = fecha;
    this.proveedor = proveedor;
    this.monto = monto;
    this.subproductoId = subproductoId;
    this.sincronizada = false;
  }
}