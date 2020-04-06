import React, { Component } from 'react'
import { YellowBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { Provider } from 'react-redux'
import store from './store'

import HomeScreen from './screens/HomeScreen'
import HomeDetailScreen from './screens/HomeDetailScreen'
import ContractScreen from './screens/ContractScreen'
import ContractDetailScreen from './screens/ContractDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileDetailScreen from './screens/ProfileDetailScreen'
import ErrorBoundary from './components/ErrorBoundary'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

function HomeStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={HomeScreen}
        options={{
          title: 'Bienvenir',
        }}
      />
      <Stack.Screen
        name="mainDetail"
        component={HomeDetailScreen}
        options={{
          title: 'Compromisos Firmados',
        }}
      />
    </Stack.Navigator>
  )
}

function ContractStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="contract"
        component={ContractScreen}
        options={{
          title: 'Compromisos',
        }}
      />
      <Stack.Screen
        name="contractDetail"
        component={ContractDetailScreen}
        options={{
          title: 'Pasos',
        }}
      />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
      <Stack.Screen
        name="profileDetail"
        component={ProfileDetailScreen}
        options={{
          title: 'Detalle',
        }}
      />
    </Stack.Navigator>
  )
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/isotype_ic.png')}
    />
  );
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <ErrorBoundary>
            <Tab.Navigator
              initialRouteName="home"
              barStyle={{ backgroundColor: '#2169B3' }}
            >          
              <Tab.Screen
                name="home"
                component={HomeStack}
                options={{
                  tabBarLabel: 'Inicio',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={color} size={22} />
                  )
                }}
              />
              <Tab.Screen
                name="contracts"
                component={ContractStack}
                options={{
                  tabBarLabel: 'Compromisos',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="note-outline" color={color} size={22} />
                  )
                }}
              />
              <Tab.Screen
                name="profiles"
                component={ProfileStack}
                options={{
                  tabBarLabel: 'Perfil',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="face-outline" color={color} size={22} />
                  )
                }}  
              />
            </Tab.Navigator>
          </ErrorBoundary>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;