




export const sincronizarFacturas = async (facturas) => {

const response  = await fetch('http://192.168.10.37:7112/api/Factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturas),
      });


  return response;
}





