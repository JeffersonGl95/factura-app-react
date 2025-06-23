import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { productos, subproductos } from '../constants/data';

export default function SeleccionProductoScreen() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [subproductoSeleccionado, setSubproductoSeleccionado] = useState(null);
  const [subproductosFiltrados, setSubproductosFiltrados] = useState([]);

  useEffect(() => {
    if (productoSeleccionado) {
      const filtrados = subproductos.filter(
        (s) => s.productoId === productoSeleccionado
      );
      setSubproductosFiltrados(filtrados);
      setSubproductoSeleccionado(null); // reinicia selección de subproducto
    }
  }, [productoSeleccionado]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Producto:</Text>
      <Picker
        selectedValue={productoSeleccionado}
        onValueChange={(value) => setProductoSeleccionado(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un producto" value={null} />
        {productos.map((p) => (
          <Picker.Item key={p.id} label={p.nombre} value={p.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Subproducto:</Text>
      <Picker
        selectedValue={subproductoSeleccionado}
        onValueChange={(value) => setSubproductoSeleccionado(value)}
        style={styles.picker}
        enabled={subproductosFiltrados.length > 0}
      >
        <Picker.Item label="Selecciona un subproducto" value={null} />
        {subproductosFiltrados.map((s) => (
          <Picker.Item key={s.id} label={s.nombre} value={s.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 15 },
  picker: { backgroundColor: '#f0f0f0' },
});