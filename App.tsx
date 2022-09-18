import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AsteroidInfo from './screens/AstreriodInfo';
import { AstroidInfoProvider } from './Context/AstroidInfoContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AstroidInfoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home} options={{ title: 'Nasa' }} />
          <Stack.Screen name="AsteroidInfo" component={AsteroidInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </AstroidInfoProvider>
  );
};

export default App;