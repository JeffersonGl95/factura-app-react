import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { productos, subproductos } from '../constants/data';
import Factura from '../models/Factura';
import { guardarFacturaLocal } from '../storage/facturaStorage';

export default function RegistroFacturaScreen() {

  const navigation = useNavigation();
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fecha, setFecha] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [monto, setMonto] = useState('');

  const [productoId, setProductoId] = useState(null);
  const [subproductoId, setSubproductoId] = useState(null);
  const [subproductosFiltrados, setSubproductosFiltrados] = useState([]);

  useEffect(() => {
    if (productoId) {

      console.log(subproductos.length);
      const filtrados = subproductos.filter((s) => s.productoId === Number(productoId));

      setSubproductosFiltrados(filtrados);
      setSubproductoId(null);
    }
  }, [productoId]);

  const guardar = async () => {
    if (!identificacion||!nombre ||!numeroFactura || !fecha || !proveedor || !monto || !subproductoId) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    const factura = new Factura(identificacion,nombre,numeroFactura, fecha, proveedor, parseFloat(monto), subproductoId);
    await guardarFacturaLocal(factura);
    Alert.alert('Guardado', 'Factura almacenada localmente');

    setIdentificacion('');setNombre('');setNumeroFactura(''); setFecha(''); setProveedor(''); setMonto('');
    setProductoId(null); setSubproductoId(null); setSubproductosFiltrados([]);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Identificacion:</Text>
      <TextInput style={styles.input} value={identificacion} onChangeText={setIdentificacion} />

      <Text style={styles.label}>Cliente:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Número:</Text>
      <TextInput style={styles.input} value={numeroFactura} onChangeText={setNumeroFactura} />

      <Text style={styles.label}>Fecha:</Text>
      <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Proveedor:</Text>
      <TextInput style={styles.input} value={proveedor} onChangeText={setProveedor} />

      <Text style={styles.label}>Monto:</Text>
      <TextInput style={styles.input} value={monto} onChangeText={setMonto} keyboardType="numeric" />

      <Text style={styles.label}>Producto:</Text>
      <Picker selectedValue={productoId} onValueChange={setProductoId}>
        <Picker.Item label="Selecciona un producto" value={null} />
        {productos.map((p) => (
          <Picker.Item key={p.id} label={p.nombre} value={p.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Subproducto:</Text>
      <Picker selectedValue={subproductoId} onValueChange={setSubproductoId} enabled={subproductosFiltrados.length > 0}>
        <Picker.Item label="Selecciona un subproducto" value={null} />
        {subproductosFiltrados.map((s) => (
          <Picker.Item key={s.id} label={s.nombre} value={s.id} />
        ))}
      </Picker>
      <View style={{ height: 20 }} />
      <Button title="Guardar factura" onPress={guardar} />
       {/*<Button title="Ver Facturas" onPress={() => navigation.navigate('Listado')} />*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
});