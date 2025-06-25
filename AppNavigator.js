import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaFacturasScreen from './screens/ListaFacturasScreen';
import RegistroFacturaScreen from './screens/RegistroFacturaScreen';
import SincronizacionScreen from './screens/SincronizacionScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {

  function FacturasStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Listado"
          component={ListaFacturasScreen}
          options={{ title: '📄 Facturas Registradas' }}
        />
        <Stack.Screen
          name="RegistroFactura"
          component={RegistroFacturaScreen}
          options={{ title: 'Registrar / Editar Factura' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2196F3',
        }}
      >
        <Tab.Screen
          name="Listado"
          component={FacturasStack}
          options={{
            tabBarLabel: 'Facturas',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="folder" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Registrar"
          component={RegistroFacturaScreen}
          options={{
            tabBarLabel: 'Registro',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="note-add" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Sincronizar"
          component={SincronizacionScreen}
          options={{
            tabBarLabel: 'Sincronizar',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="cloud-upload" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    


  );
}

