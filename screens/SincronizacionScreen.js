import { useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { marcarFacturasComoSincronizadas, obtenerFacturasLocales } from '../storage/facturaStorage';

export default function SincronizacionScreen() {
  const [cargando, setCargando] = useState(false);

 

  const sincronizar = async () => {
    setCargando(true);

    try {
      const facturas = await obtenerFacturasLocales();
      const noSincronizadas = facturas.filter(f => !f.sincronizada);

      if (noSincronizadas.length === 0) {
        Alert.alert('Listo', 'No hay facturas pendientes por sincronizar.');
        setCargando(false);
        return;
      }

      const respuesta = await fetch('http://192.168.10.37:7112/api/Factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noSincronizadas),
      });

      console.log(respuesta)

      if (!respuesta.ok) throw new Error('Error al sincronizar');

      // Si fue exitosa, marcar como sincronizadas
      const result = await respuesta.json();
      const idsSincronizadas = noSincronizadas.map(f => f.id.toString());
      await marcarFacturasComoSincronizadas(idsSincronizadas);
      Alert.alert('Sincronizado', `${idsSincronizadas.length} facturas marcadas como sincronizadas.`);

      

    } catch (error) {
      console.error('Error en sincronización:', error);
      Alert.alert('Error', 'No se pudo sincronizar las facturas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 16 }}>Presiona el botón para sincronizar las facturas no enviadas.</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <Button title="Sincronizar con servidor" onPress={sincronizar} />
      )}
    </View>
  );
}