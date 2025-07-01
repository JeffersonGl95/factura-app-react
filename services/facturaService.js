




export const sincronizarFacturas = async (facturas) => {

const facturasSync = facturas.map(({id, ...resto})=> resto)

const response  = await fetch('http://192.168.10.37:5022/api/Factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturasSync),
      });


  return response;
}





