import React, { useEffect } from 'react';
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
import SelectDropdown from 'react-native-select-dropdown'
import Icon1 from 'react-native-vector-icons/FontAwesome5';
//file-invoice-dollar


export default function PayBills() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);
  const countries = ["Type1", "Type2", "Type3", "Type4"]

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        colors={['#222', '#222', '#111']}
        style={styles.container}
      >
      <View style={styles.header}>
        <Text style={{color:"#fff",fontSize:30,fontWeight:"bold",marginBottom:15 ,marginRight:10}}>Pay Bills</Text>
        <Icon1 name="file-invoice-dollar" size={40} color="#fff"/>
      </View>

    <SelectDropdown
      data={countries}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
      buttonStyle={styles.input}
      buttonTextStyle={{color:"#fff"}}
      dropdownIconPosition="left"
      defaultButtonText="Account Balance "
      dropdownStyle={styles.drop}
   
      
      
   
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        item=<View style={{margin:10,fontSize:20}}>
         <Text>{item}</Text>
        </View>
        return item
      }}
  />
      <SelectDropdown
      
      data={countries}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
      buttonStyle={styles.input}
      buttonTextStyle={{color:"#fff"}} 
      dropdownIconPosition="left"
      dropdownStyle={styles.drop}
       defaultButtonText="Bill Type"
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        item=<View style={{margin:10,fontSize:20}}>
         <Text>{item}</Text>
        </View>
        return item
      }}
  />
        <TextInput
          placeholder='Email'
          placeholderTextColor='#fff'
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          
        />
          <TextInput
          placeholder='Account Name'
          placeholderTextColor='#fff'
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />
        <TextInput
          placeholder='Amount'
          placeholderTextColor='#fff'
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />
        <TextInput
          placeholder='Code Pin'
          placeholderTextColor='#fff'
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Pay Bill</Text>
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
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    
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
    marginVertical:10
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

  drop:{
    backgroundColor:"#fff"
  },
  header:{
    flexDirection:"row",
    justifyContent:"center"
  }

});