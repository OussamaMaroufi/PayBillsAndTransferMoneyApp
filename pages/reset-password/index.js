import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { EMAIL_PATTERN } from '../../shared/constant';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  const reset = () => {
    if (email == "") {
      ToastAndroid.showWithGravity(
        'Email field is empty',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      ToastAndroid.showWithGravity(
        'Invalid email format',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    axios
      .get(
        `https://UnacceptablePastPhases.yassineakermi.repl.co/forgot_password/${email}`
      )
      .then(({ data }) => {
        ToastAndroid.showWithGravity(
          'Check email for new password.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate('Login');
      })
      .catch((err) => {});
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={['#222', '#222', '#111']}
        style={styles.container}>
        <View
          style={{
            marginTop: "-40%",
            flex: 1,
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}>
          <Text style={[styles.welcomeText, {marginBottom: "10%"} ]}>{"Get a new password"}</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#808e9b"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            autoCorrect={true}
            autoCapitalize={false}
          />
          <TouchableOpacity onPress={reset} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{'Request new password'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centered: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    //transform: 'translate(-50%, -50%)',
  },
  container: {
    height: '100%',
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
    alignSelf: 'center',
    width: '90%',
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
    color: '#1245a8',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    alignSelf: 'center',
    width: '90%',
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
