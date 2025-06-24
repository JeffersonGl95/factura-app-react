import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaFacturasScreen from './screens/ListaFacturasScreen';
import RegistroFacturaScreen from './screens/RegistroFacturaScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
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
          component={ListaFacturasScreen}
          options={{ tabBarLabel: 'Facturas' }}
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

      </Tab.Navigator>
    
        
    </NavigationContainer>
    


  );
}


  /*  <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Registro" component={RegistroFacturaScreen} />
        <Stack.Screen name="Listado" component={ListaFacturasScreen} />
      </Stack.Navigator>*/