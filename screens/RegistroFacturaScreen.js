import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { productos, subproductos } from '../constants/data';
import Factura from '../models/Factura';
import { actualizarFactura, guardarFacturaLocal, obtenerFacturasLocales } from '../storage/facturaStorage';

export default function RegistroFacturaScreen({route,navigation}) {

  const facturaExistente = route.params?.factura;

 // const navigation = useNavigation();
  const [idFactura, setIdFactura] = useState(null);
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [proveedor, setProveedor] = useState('');

  const [productoId, setProductoId] = useState(null);
  const [subproductoId, setSubproductoId] = useState(null);
  const [subproductosFiltrados, setSubproductosFiltrados] = useState([]);


  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState(0.00);

  const cantidadNum = cantidad || 0;
  const precioNum = parseFloat(precioUnitario).toFixed(2) || 0;
  const subtotal =parseFloat(cantidadNum * precioNum).toFixed(2);
  const iva = parseFloat(subtotal * 0.15).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

  const [editableCantidad, setEditableCantidad] = useState(false);
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  const mostrarDPicker = () => setMostrarDatePicker(true);
  const inputRefDatePicker = useRef(null);

  const cambiarFecha = (event, nuevaFecha) => {
    setMostrarDatePicker(false);
    if (nuevaFecha){
      setFecha(nuevaFecha);
      inputRefDatePicker.current?.blur();
    }
    
  };

  const formatoFecha = new Date(fecha).toLocaleDateString();

  useEffect(() => {
    if (productoId) {

      console.log(subproductos.length);
      const filtrados = subproductos.filter((s) => s.productoId === Number(productoId));
      
      setSubproductosFiltrados(filtrados);
      setSubproductoId(null);
      setPrecioUnitario(0.00);
      setCantidad(0);
      setEditableCantidad(false);
    }

    


  }, [productoId]);


   useEffect(() => {
  

    
    if(subproductoId){

      console.log(subproductoId);
      const subproducto = subproductos.filter((s) => s.id === Number(subproductoId));
      setPrecioUnitario(subproducto[0].precioUnitario);
      setEditableCantidad(true);

    }


  }, [subproductoId]);

  useEffect(() => {
    if (facturaExistente) {

      setIdFactura(facturaExistente.id);
      setIdentificacion(facturaExistente.identificacion);
      setNombre(facturaExistente.nombre);
      setNumeroFactura(facturaExistente.numeroFactura);
      setFecha(new Date(facturaExistente.fecha));
      setProveedor(facturaExistente.proveedor);
      setSubproductoId(facturaExistente.subproductoId);
      setCantidad(facturaExistente.cantidad.toString());
      setProductoId(facturaExistente.productoId);




      const filtrados = subproductos.filter((s) => s.productoId === Number(facturaExistente.productoId));
      
      setSubproductosFiltrados(filtrados);

      console.log('valor1' + facturaExistente.productoId);
      console.log('valor2 factura' +facturaExistente.id);
    }
  }, [facturaExistente]);


  const guardar = async () => {
    console.log(fecha);

    if (!identificacion||!nombre ||!numeroFactura || !fecha || !proveedor || !total || !subproductoId||cantidadNum <= 0 || precioNum <= 0) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }



    const cargarFacturas = async () => {
      const datos = await obtenerFacturasLocales();
      const id = Number(datos.length + 1);
      console.log('valor valooooor'+ fecha);
      const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
      console.log('valor valooooor   2'+ idFactura);
         

        if (idFactura) {
          console.log('Entre a actualizar');
          const factura = new Factura(idFactura,identificacion,nombre,numeroFactura, fechaFormateada, proveedor, productoId,subproductoId,cantidadNum,subtotal,iva,total);
          await actualizarFactura(factura);
          Alert.alert('Actualizado', 'Factura actualizada correctamente');
        } else {
          const factura = new Factura(id,identificacion,nombre,numeroFactura, fechaFormateada, proveedor, productoId,subproductoId,cantidadNum,subtotal,iva,total);
          await guardarFacturaLocal(factura);
          Alert.alert('Guardado', 'Factura almacenada localmente');
        }

        navigation.goBack();

      setIdentificacion('');setNombre('');setNumeroFactura(''); setFecha(new Date()); setProveedor('');
      setProductoId(null); setSubproductoId(null); setSubproductosFiltrados([]); setCantidad(0),setPrecioUnitario(0.00)
    };
    
    cargarFacturas();
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View style={styles.container}>
      <Text style={styles.titulo}>📄 Registro de Factura</Text>
      <Text style={styles.label}>Identificacion:</Text>
      <TextInput style={styles.input} value={identificacion} onChangeText={setIdentificacion} />

      <Text style={styles.label}>Nombres Completos:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Número Factura:</Text>
      <TextInput style={styles.input} value={numeroFactura} onChangeText={setNumeroFactura} placeholder="001-001-000001" />

      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        ref={inputRefDatePicker}
        placeholder="Selecciona fecha"
        value={formatoFecha}
        onFocus={mostrarDPicker}
        editable={true}
        style={styles.input}
        showSoftInputOnFocus={false}
      />
      {mostrarDatePicker && (
        <DateTimePicker
          value={new Date(fecha)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={cambiarFecha}
        />
      )}  
      <Text style={styles.label}>Proveedor:</Text>
      <TextInput style={styles.input} value={proveedor} onChangeText={setProveedor} />

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

      <View style={styles.contenedorFila}>
      <View style={styles.grupoCampo}>
        <Text style={styles.label}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
          editable={editableCantidad}
        />
      </View>

      <View style={styles.grupoCampo}>
        <Text style={styles.label}>Precio Unitario:</Text>
        <TextInput
          style={styles.input}
          value={`$ ${precioUnitario}`}
          editable={false}
        />
      </View>
    </View>


      <View style={{ height: 20 }} />
      <Text style={styles.label}>Resumen:</Text> 
      <View style={{ height: 20 }} />
      <View style={styles.contenedorFila}>
      <View style={styles.grupoCampo}>
      <Text style={styles.label}>Subtotal:</Text> 
      </View>
        <View style={styles.grupoCampo}>
        <TextInput
          style={styles.input}
          value={`$ ${subtotal}`}
          editable={false}
        />
      </View>
      </View>
      <View style={styles.contenedorFila}>
      <View style={styles.grupoCampo}>
      <Text style={styles.label}>Iva(15%):</Text> 
      </View>
        <View style={styles.grupoCampo}>
        <TextInput
          style={styles.input}
          value={`$ ${iva}`}
          editable={false}
        />
      </View>
      </View>
       <View style={styles.contenedorFila}>
      <View style={styles.grupoCampo}>
      <Text style={styles.label}>TOTAL:</Text> 
      </View>
        <View style={styles.grupoCampo}>
        <TextInput
          style={styles.input}
          value={`$ ${total}`}
          editable={false}
        />
      </View>
      </View>
      <View style={{ height: 20 }} />
      {/*<Button style={styles.btn} title="Guardar factura" onPress={guardar} />*/}
       {/*<Button title="Ver Facturas" onPress={() => navigation.navigate('Listado')} />*/}
      <TouchableOpacity style={styles.btn} onPress={() => {guardar();}}>
      <Text style={styles.textoBoton}>Guardar factura</Text>
      </TouchableOpacity>
       

    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  contenedorFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10, // O usa marginRight en grupoCampo si tu versión no soporta 'gap'
  },
  grupoCampo: {
    flex: 1,
  },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});