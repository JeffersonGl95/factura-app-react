import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerFacturasLocales } from '../storage/facturaStorage';
import { subproductos } from '../constants/data';

export default function ListaFacturasScreen() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const cargarFacturas = async () => {
      const datos = await obtenerFacturasLocales();
      setFacturas(datos);
    };
    cargarFacturas();
  }, []);

  const obtenerNombreSubproducto = (id) => {
    const sub = subproductos.find((s) => s.id === id);
    return sub ? sub.nombre : 'No encontrado';
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>identificacion: {item.identificacion}</Text>
      <Text>nombre: {item.nombre}</Text>
      <Text style={styles.numeroFactura}>Factura #{item.numeroFactura}</Text>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Proveedor: {item.proveedor}</Text>
      <Text>Monto: ${item.monto}</Text>
      <Text>Subproducto: {obtenerNombreSubproducto(item.subproductoId)}</Text>
      <Text style={{ color: item.sincronizada ? 'green' : 'orange' }}>
        {item.sincronizada ? '✔ Sincronizada' : '⏳ No sincronizada'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📄 Facturas Registradas</Text>
      <FlatList
        data={facturas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay facturas registradas aún.</Text>}
      />

      <Button title="Nueva Factura" onPress={() => navigation.navigate('Registro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  item: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  numero: { fontWeight: 'bold', fontSize: 16 },
});