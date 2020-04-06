import React, { Component } from 'react'
import { YellowBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { Provider } from 'react-redux'
import store from './store'

import HomeScreen from './screens/HomeScreen'
import OpenContractScreen from './screens/OpenContractScreen'
import OpenContractDetailScreen from './screens/OpenContractDetailScreen'
import SignedContractScreen from './screens/SignedContractScreen'
import SignedContractDetailScreen from './screens/SignedContractDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileDetailScreen from './screens/ProfileDetailScreen'
import ErrorBoundary from './components/ErrorBoundary'

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

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
    </Stack.Navigator>
  )
}

function ContractTopTab() {
  return(
    <TopTab.Navigator>
      <TopTab.Screen
        name="openContract"
        component={OpenContractScreen}
        options={{
          title: 'Disponibles',
        }}
      />
      <TopTab.Screen
        name="signedContract"
        component={SignedContractScreen}
        options={{
          title: 'Firmados',
        }}
      />
    </TopTab.Navigator>
  )
}

function ContractStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="contractTopTab"
        component={ContractTopTab}
        options={{
          title: 'Compromisos',
        }}
      />
      <Stack.Screen
        name="openContractDetail"
        component={OpenContractDetailScreen}
        options={{
          title: 'Pasos',
        }}
      />
      <Stack.Screen
        name="signedContractDetail"
        component={SignedContractDetailScreen}
        options={{
          title: 'Pasos a hacer',
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
            <BottomTab.Navigator
              initialRouteName="home"
              barStyle={{ backgroundColor: '#2169B3' }}
            >          
              <BottomTab.Screen
                name="home"
                component={HomeStack}
                options={{
                  tabBarLabel: 'Inicio',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={color} size={22} />
                  )
                }}
              />
              <BottomTab.Screen
                name="contracts"
                component={ContractStack}
                options={{
                  tabBarLabel: 'Compromisos',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="script-text-outline" color={color} size={22} />
                  )
                }}
              />
              <BottomTab.Screen
                name="profiles"
                component={ProfileStack}
                options={{
                  tabBarLabel: 'Perfil',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="face-outline" color={color} size={22} />
                  )
                }}  
              />
            </BottomTab.Navigator>
          </ErrorBoundary>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;