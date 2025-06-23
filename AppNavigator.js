import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistroFacturaScreen from './screens/RegistroFacturaScreen';
import ListaFacturasScreen from './screens/ListaFacturasScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Registro" component={RegistroFacturaScreen} />
        <Stack.Screen name="Listado" component={ListaFacturasScreen} />
      </Stack.Navigator>


      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2196F3',
        }}
      >
        <Tab.Screen
          name="Registrar"
          component={RegistroFacturaScreen}
          options={{ tabBarLabel: 'Registro' }}
        />
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