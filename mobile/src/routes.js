/* eslint-disable react/prop-types */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import Details from './pages/Delivery/Details';
import AddProblem from './pages/Delivery/AddProblem';
import ViewProblems from './pages/Delivery/ViewProblems';
import ConfirmDelivery from './pages/Delivery/ConfirmDelivery';

export default function Routes() {
  const isLoggedIn = useSelector((state) => state.auth.signed);
  const Stack = createStackNavigator();

  const Tabs = createBottomTabNavigator();

  function Delivery() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Detalhes da encomenda',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddProblem"
          component={AddProblem}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Informar problema',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ViewProblems"
          component={ViewProblems}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Visualizar problemas',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmDelivery"
          component={ConfirmDelivery}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Confirmar entrega',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    );
  }

  function BottomTabs() {
    return (
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#7d40e7',
          inactiveTintColor: '#999',
        }}
      >
        <Tabs.Screen
          name="Delivery"
          component={Delivery}
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ color }) => (
              <Icon name="list" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Meu perfil',
            tabBarIcon: ({ color }) => (
              <Icon name="person" size={20} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false,
              }}
              component={BottomTabs}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
