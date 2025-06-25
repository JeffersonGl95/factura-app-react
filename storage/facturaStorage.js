import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarFacturaLocal = async (factura) => {

  try {
  const almacenadas = JSON.parse(await AsyncStorage.getItem('facturas')) || [];
  almacenadas.push(factura);
  await AsyncStorage.setItem('facturas', JSON.stringify(almacenadas));
  } catch (error) {
  console.error('❌ Ocurrió un problema al guardar la factura:', error);
   Alert.alert('Error', 'Ocurrió un problema al guardar la factura.');
  }

};

export const obtenerFacturasLocales = async () => {
  const data = await AsyncStorage.getItem('facturas');
  console.log('facturas: ' + data);
  return data ? JSON.parse(data) : [];
};

export const guardarFacturas = async (nuevasFacturas) => {

  try {
    await AsyncStorage.setItem('facturas', JSON.stringify(nuevasFacturas));
  } catch (error) {
    console.error('❌ Ocurrió un problema al guardar las facturas:', error);
    Alert.alert('Error', 'Ocurrió un problema al guardar las facturas.');
  }

};

export const actualizarFactura = async (facturaActualizada) => {


  try {
    
  const facturas = await obtenerFacturasLocales();
  const actualizadas = facturas.map(f =>
    f.id === Number(facturaActualizada.id) ? facturaActualizada : f
  );

  await AsyncStorage.setItem('facturas', JSON.stringify(actualizadas));
  } catch (error) {
    console.error('❌ Error al actualizar la factura:', error);
    Alert.alert('Error', 'Ocurrió un problema al actualizar la factura.');
  }
 

};

export const marcarFacturasComoSincronizadas = async (ids) => {

  try {
  const facturas = await obtenerFacturasLocales();
  const actualizadas = facturas.map(f =>
    ids.includes(f.id.toString()) ? { ...f, sincronizada: true } : f
  );
  await AsyncStorage.setItem('facturas', JSON.stringify(actualizadas));
  } catch (error) {
    console.error('❌ Error al sincronizar', error);
    Alert.alert('Error', 'Ocurrió un problema al sincronizar.');
  }

};

