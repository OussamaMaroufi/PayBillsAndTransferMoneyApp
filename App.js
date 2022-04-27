import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import Login from './pages/login';
import Register from './pages/register';
import Splash from './pages/splach';
import Home from './pages/home';
import ForgotPassword from './pages/reset-password';
import Transaction from './pages/transaction';
import Profile from './pages/profil';
import Deposit from './pages/deposit';
import PayBills from './pages/pay-bills';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
// You can import from local files
import AssetExample from './components/AssetExample';
import GlobalContext from './context/global-context';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let fetch = async () => {
      try {
        let data = await AsyncStorage.getItem('JWT');
        let decodedData = jwt_decode(data);
        setUser({ ...decodedData, jwt: data });
        if (Date.now() >= decodedData.exp * 1000) {
          return false;
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <GlobalContext.Provider value={user}>
      <NavigationContainer>
        <RootStack.Navigator>
          {loading ? (
            <RootStack.Screen
              name="Loading"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : !user ? (
            <>
              <RootStack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <Login {...props} setUser={setUser} />}
              </RootStack.Screen>
              <RootStack.Screen
                name="Regsiter"
                options={{ headerShown: false }}>
                {(props) => <Register {...props} setUser={setUser} />}
              </RootStack.Screen>
              <RootStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: true, title: "Forgot Password" }}
              />
            </>
          ) : (
            <>
              <RootStack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} setUser={setUser} />}
              </RootStack.Screen>
              <RootStack.Screen name="Profile" component={Profile} />
              <RootStack.Screen name="Deposit">
              {(props) => <Deposit {...props} setUser={setUser} />}
              </RootStack.Screen>
              <RootStack.Screen name="PayBills" component={PayBills} />
              <RootStack.Screen name="Transaction" component={Transaction} />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
