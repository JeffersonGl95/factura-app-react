import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarFacturaLocal = async (factura) => {
  const almacenadas = JSON.parse(await AsyncStorage.getItem('facturas')) || [];
  almacenadas.push(factura);
  await AsyncStorage.setItem('facturas', JSON.stringify(almacenadas));
};

/*export const obtenerFacturasLocales = async () => {
  return JSON.parse(await AsyncStorage.getItem('facturas')) || [];
};*/

export const obtenerFacturasLocales = async () => {
  const data = await AsyncStorage.getItem('facturas');
  return data ? JSON.parse(data) : [];
};