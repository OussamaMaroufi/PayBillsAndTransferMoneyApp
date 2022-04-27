import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import Icon1 from 'react-native-vector-icons/Entypo';
import { Paystack } from 'react-native-paystack-webview';
import GlobalContext from '../../context/global-context';

export default function TransferFund({ navigation }) {

  const jwt = useContext(GlobalContext).jwt;

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  var axios = require('axios');
  const [amount, setAmount] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [loadPaymentPage, setloadPaymentPage] = useState(false);
  const [reference, setReference] = useState('');

  const handleAmount = (amountField) => {
    try {
      amountField = amountField.replace('$', '');
      if (parseInt(amountField) > 0) setAmount('$' + amountField);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePinCode = (pincodeField) => {
    try {
      if (pincodeField.length <= 4) setPinCode(pincodeField);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeposit = async (event) => {
    console.log(pinCode.length, amount.replace('$', ''));
    console.log(parseInt(amount.replace('$', '')) > 0);
    if (parseInt(amount.replace('$', '')) > 0 && pinCode.length == 4) {
      console.log('entered');
      setloadPaymentPage(true);
    }
  };

  const updateBalance = (balance) => {};

  return loadPaymentPage ? (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="pk_test_5642220ba3bf7b728ec0ee034d041985544ce6d3"
        amount={amount.replace('$', '')}
        billingEmail="oussama@gmail.com"
        billingName="Oussama Maaroufi"
        activityIndicatorColor="green"
        onCancel={(e) => {
          console.log('Canceled');
          setloadPaymentPage(false);
          setAmount('');
          setPinCode('');
        }}
        onSuccess={async (res) => {
          console.log(res);
          var axios = require('axios');
          var data = JSON.stringify({
            balance: amount,
          });

          var config = {
            method: 'put',
            url: 'https://UnacceptablePastPhases.yassineakermi.repl.co/update_balance',
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              setloadPaymentPage(false);
              setAmount('');
              setPinCode('');
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
        autoStart={true}
      />
    </View>
  ) : (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={['#222', '#222', '#111']}
        style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              marginBottom: 30,
              marginRight: 10,
            }}>
            Deposit Funds
          </Text>
          <Icon1 name="direction" size={40} color="#fff" />
        </View>

        <TextInput
          type="text"
          placeholder="$100"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          value={amount}
          onChangeText={handleAmount}
        />
        <TextInput
          type="password"
          placeholder={pinCode.length > 1 ? pinCode : 'Code Pin'}
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          value={pinCode}
          onChangeText={handlePinCode}
        />

        <TouchableOpacity onPress={handleDeposit} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Deposit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#1245a8',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
