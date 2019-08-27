import React from 'react'
import { StyleSheet } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Appbar } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import MyAccount from '../screens/MyAccount';
import Splash from '../screens/Splash';
import Statistics from '../screens/Statistics';



import { Icon } from 'native-base';


const AppStack = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Statistics: { screen: Statistics },

    MyAccount: { screen: MyAccount },

  },
  {
    shifting: true,
    labeled: true,
    activeColor: '#f0edf6',
    inactiveColor: '#f0edf6',
    barStyle: { backgroundColor: '#694fad' },
  }
);
const AppDrawer = createDrawerNavigator(
  {
    App: AppStack,
  }, {
    initialRouteName: 'App',
    drawerPosition: 'right',
  }
);

const SplashStack = createStackNavigator(
  {
    Splash: Splash
  }
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    Splash: { screen: SplashStack },
    AppDrawer: { screen: AppDrawer },

  }, {
    initialRouteName: 'Splash'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
export default () => (
  <AppContainer
  />
);