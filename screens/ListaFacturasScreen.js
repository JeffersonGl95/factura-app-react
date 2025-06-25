import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { subproductos } from '../constants/data';
import { guardarFacturas, obtenerFacturasLocales } from '../storage/facturaStorage';


export default function ListaFacturasScreen() {
  const [facturas, setFacturas] = useState([]);
  const [facturaAEliminar, setFacturaAEliminar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
  useCallback(() => {

    console.log("Entre a cargar las facturas")
    const cargarFacturas = async () => {
      const datos = await obtenerFacturasLocales();
      setFacturas(datos);
    };
    cargarFacturas();
  }, [])
  );

 /*const guardarFacturas = async (nuevasFacturas) => {
    await AsyncStorage.setItem('facturas', JSON.stringify(nuevasFacturas));
  };*/

  const confirmarEliminar = (factura) => {
    setFacturaAEliminar(factura);
    setModalVisible(true);
  };

  const eliminarFactura = async () => {
    const nuevas = facturas.filter(f => f.numeroFactura !== (facturaAEliminar.numeroFactura).toString());
    console.log(facturaAEliminar.numeroFactura);
    console.log(facturas.length);
    setFacturas(nuevas);
    await guardarFacturas(nuevas);
    setModalVisible(false);
  };

  const editarFactura = (item) => {
    navigation.navigate('RegistroFactura', { factura:item });
  };



  const obtenerNombreSubproducto = (id) => {
    console.log('valor '+  id)

    const sub = subproductos.find((s) => s.id === Number(id));
    return sub ? sub.nombre : 'No encontrado';
  };



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Id: {item.id}</Text>
      <Text>Identificacion: {item.identificacion}</Text>
      <Text>Nombres: {item.nombre}</Text>
      <Text style={styles.numeroFactura}>Factura # {item.numeroFactura}</Text>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Proveedor: {item.proveedor}</Text>
      <Text>Producto: {obtenerNombreSubproducto(item.subproductoId)}</Text>
      <Text>Subtotal: $ {item.subtotal}</Text>
      <Text>Iva(15%): $ {item.iva}</Text>
      <Text>TOTAL: $ {item.total}</Text>
      <Text style={{ color: item.sincronizada ? 'green' : 'orange' }}>
        {item.sincronizada ? '✔ Sincronizada' : '⏳ No sincronizada'}
      </Text>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
        <Button title="Editar" onPress={() => editarFactura(item)} />
        <Button title="Eliminar" color="red" onPress={() => confirmarEliminar(item)} />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View style={styles.container}>
      <Text style={styles.titulo}>📄 Facturas Registradas</Text>
      <FlatList
        data={facturas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay facturas registradas aún.</Text>}
      />

       <Modal transparent visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000aa' }}>
          <View style={{ backgroundColor: 'white', margin: 32, padding: 20, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              ¿Estás seguro de que deseas eliminar esta factura?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16 }}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Eliminar" color="red" onPress={eliminarFactura} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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