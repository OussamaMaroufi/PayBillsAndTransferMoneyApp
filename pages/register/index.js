import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function RegisterScreen({ navigation, setUser }) {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    password: null,
    email: null,
    pinCode: null,
    tel: null,
  });

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    pinCode: '',
    tel: '',
  });
  const [passwordR, setPasswordR] = useState('');

  const setDataByKey = (key, value) => {
    let repErrors = errors;
    switch (key) {
      case 'lastName':
      case 'firstName':
        if (/^[a-zA-Z]+$/.test(value)) repErrors[key] = null;
        else repErrors[key] = 'Contains invalid characters';
        break;
      case 'email':
        if (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value.toLowerCase()
          )
        )
          repErrors[key] = null;
        else repErrors[key] = 'Invalid Email';
        break;
      case 'tel':
        if (/^8[0-9]{9}$/.test(value)) repErrors[key] = null;
        else repErrors[key] = 'Invalid phone number';
        break;
      case 'pinCode':
        if (/^[0-9]{4}$/.test(value)) repErrors[key] = null;
        else repErrors[key] = 'Pin code must be 4 digits';
        break;
      case 'password':
        const uppercase = /[A-Z]+/;
        const lowercase = /[a-z]+/;
        const digit = /[0-9]+/;
        const special = /[\W]+/;
        if (
          !uppercase.test(value) ||
          !lowercase.test(value) ||
          !digit.test(value) ||
          !special.test(value) ||
          value.length < 8
        )
          repErrors[key] =
            'The password must be at least 8 characters and contains digits/symbols';
        else repErrors[key] = null;
    }
    setErrors(repErrors);
    let repData = { ...data };
    repData[key] = value;
    setData(repData);
  };

  const register = () => {
    if (passwordR != data.password) {
      alert("Passwords don't match");
      return;
    }
    axios
      .post(
        'https://UnacceptablePastPhases.yassineakermi.repl.co/register',
        data
      )
      .then(({ data, status }) => {
        if (status == 200) {
          setUser(setUser({ ...jwt_decode(data), jwt: data }));
          AsyncStorage.setItem('JWT', data);
          alert('success');
        }
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={['#222', '#222', '#111']}
        style={styles.container}>
        <Text style={styles.loginText}>Register</Text>
        <TextInput
          value={data.email}
          onChangeText={(val) => setDataByKey('email', val)}
          placeholder="Email Address"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <TextInput
          value={data.firstName}
          onChangeText={(val) => setDataByKey('firstName', val)}
          placeholder="First Name"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
        <TextInput
          value={data.lastName}
          onChangeText={(val) => setDataByKey('lastName', val)}
          placeholder="First Name"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
        <TextInput
          value={data.password}
          onChangeText={(val) => setDataByKey('password', val)}
          placeholder="Password"
          placeholderTextColor="#808e9b"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <TextInput
          value={passwordR}
          onChangeText={setPasswordR}
          placeholder="Reapeat Password"
          placeholderTextColor="#808e9b"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
        />
        <TextInput
          value={data.tel}
          onChangeText={(val) => setDataByKey('tel', parseInt(val))}
          placeholder="Telephone"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
        />
        {errors.tel && <Text style={styles.error}>{errors.tel}</Text>}
        <TextInput
          value={data.pinCode}
          onChangeText={(val) => setDataByKey('pinCode', parseInt(val))}
          placeholder="PIN Code"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
        />
        {errors.pinCode && <Text style={styles.error}>{errors.pinCode}</Text>}
        <TouchableOpacity onPress={register} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}> I have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.signUpText, { color: '#1245a8' }]}>
              {' Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  error: {
    marginLeft: 10,
    marginTop: 5,
    color: "red",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#1245a8',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
  },
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#808e9b',
    fontSize: 20,
    fontWeight: '500',
  },
});
