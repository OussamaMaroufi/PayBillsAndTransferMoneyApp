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
import axios from 'axios';
import GlobalContext from '../../context/global-context';

export default function Transaction() {
  const jwt = useContext(GlobalContext).jwt;
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);
  const [data, setData] = useState({
    recepient_email: '',
    amount: null,
    notes: '',
    pinCode: null
  });

  const [errors, setErrors] = useState({
    recepient_email: null,
    amount: null,
    notes: null,
    pinCode: null
  });

  const setDataByKey = (key, value) => {
    console.log(value)
    let repErrors = errors;
    switch (key) {
      case 'recepient_email':
        if (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value.toLowerCase()
          )
        )
          repErrors[key] = null;
        else repErrors[key] = 'Invalid Email';
        break;
        case 'amount':
        if (/^\d+$/.test(value)) repErrors[key] = null;
        else repErrors[key] = 'Amount must be an integer';
        break;
        case 'pinCode':
        if (/^\d{4}$/.test(value)) repErrors[key] = null;
        else repErrors[key] = 'Pin Code must be 4 digits';
        break;
    }
    setErrors(repErrors);
    let repData = { ...data };
    repData[key] = value;
    setData(repData);
  };

  const transferFund = () => {
    axios
      .post(
        'https://UnacceptablePastPhases.yassineakermi.repl.co/make_transaction',
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          alert('Success');
          return;
        } else if(res.status == 202) {
          alert(res.data);
        }
      })
      .catch(err=>console.log(err))
  };
  const countries = ['Account\'s Balance'];

  return (
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
              marginBottom: 15,
              marginRight: 10,
            }}>
            Send Money
          </Text>
          <Icon1 name="direction" size={40} color="#fff" />
        </View>

        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonStyle={styles.input}
          buttonTextStyle={{ color: '#fff' }}
          dropdownIconPosition="left"
          // dropdownIconStyle={{color:'green'}}
          dropdownStyle={styles.drop}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            item = (
              <View style={{ margin: 10, fontSize: 20 }}>
                <Text>{item}</Text>
              </View>
            );
            return item;
          }}
        />
        <TextInput
          value={data.recepient_email}
          onChangeText={(val) => setDataByKey('recepient_email', val)}
          placeholder="Recepient Email"
          placeholderTextColor="#fff"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />
        {errors.recepient_email && (
          <Text style={styles.error}>{errors.recepient_email}</Text>
        )}
        <TextInput
          value={data.amount}
          onChangeText={(val) => setDataByKey('amount', parseInt(val))}
          placeholder="Amount"
          placeholderTextColor="#fff"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          keyboardType="numeric"
        />
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
        <TextInput
          value={data.pinCode}
          onChangeText={(val) => setDataByKey('pinCode', parseInt(val))}
          placeholder="Code Pin"
          placeholderTextColor="#fff"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          keyboardType="numeric"
        />
        {errors.pinCode && <Text style={styles.error}>{errors.pinCode}</Text>}
        <TouchableOpacity onPress={transferFund} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>TransferFund</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },

  inputdropdown:{
    color:"#444"
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
    marginVertical: 20,
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
  drop: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    marginLeft: 10,
    marginTop: -15,
    color: 'red',
  },
});
