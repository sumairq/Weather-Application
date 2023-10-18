import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import Details from './components/Details'

const Stack = createNativeStackNavigator();
// Todo: Implement a settings screen to allow conversion between temperature units.
const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App