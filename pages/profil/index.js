import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import GlobalContext from '../../context/global-context';

export default function Profile() {
  const jwt = useContext(GlobalContext).jwt;
  const bottomSheetRef = useRef();
  const toggleModal = () => {
    bottomSheetRef.current.open();
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);
  //Update password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Update Profile
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [email, setEmail] = useState('user@gmail.com');
  const [disable, setDisable] = useState(false);

  const handleSubmit = () => {
    axios
      .put(
        'https://UnacceptablePastPhases.yassineakermi.repl.co/update_profile',
        {
          firstName,
          lastName,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(({ status }) => {
        if (status == 201) {
          alert('Success');
          return;
        } else {
          alert('An error occured');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require('../../assets/images.png')}
        />
        <Text style={styles.text}>{"UserName"}</Text>
        <TouchableOpacity onPress={toggleModal}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'lightgrey',
              borderRadius: 7,
            }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Change password
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View>
          <BottomSheet
            ref={bottomSheetRef}
            closeOnDragDown={true}
            height={480}
            openDuration={250}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#222',
              },
              container: {
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: '#222',
              },
            }}>
            <LinearGradient colors={['#222', '#222', '#111']}>
              <View
                style={{
                  width: '100%',
                  height: 451,
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}>
                  <LinearGradient
                    colors={['#222', '#222', '#111']}
                    style={styles.container}>
                    <Text style={styles.label}>{"Current Password"}</Text>

                    <TextInput
                      placeholderTextColor="#808e9b"
                      style={styles.input}
                      autoCorrect={true}
                      autoCapitalize={false}
                      placeholder="Enter Current Password"
                      secureTextEntry={true}
                    />
                    <Text style={styles.label}>{"New Password"}</Text>
                    <TextInput
                      placeholderTextColor="#808e9b"
                      style={styles.input}
                      autoCorrect={true}
                      autoCapitalize={false}
                      placeholder="Enter New Password"
                      secureTextEntry={true}
                    />

                    <Text style={styles.label}>{"Cofirm Password"}</Text>
                    <TextInput
                      placeholderTextColor="#808e9b"
                      style={styles.input}
                      autoCorrect={true}
                      autoCapitalize={false}
                      placeholder="Cofirm Your Password"
                      secureTextEntry={true}
                      onChangeText={(text) => setConfirmPassword(text)}
                    />

                    <TouchableOpacity style={styles.updateButton}>
                      <Text style={styles.updateButtonText}>{"Update"}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </LinearGradient>
          </BottomSheet>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <LinearGradient
            colors={['#222', '#222', '#111']}
            style={styles.container}>
            <Text style={styles.label}>{"First Name"}</Text>

            <TextInput
              placeholderTextColor="#808e9b"
              style={styles.input}
              autoCorrect={true}
              autoCapitalize={false}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={styles.label}>{"Last Name"}</Text>
            <TextInput
              placeholderTextColor="#808e9b"
              style={styles.input}
              autoCorrect={true}
              autoCapitalize={false}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />

            <Text style={styles.label}>{"Email"}</Text>
            <TextInput
              placeholderTextColor="#808e9b"
              style={styles.input}
              autoCorrect={true}
              autoCapitalize={false}
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleSubmit}>
              <Text style={styles.updateButtonText}>{"Save"}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: 9,
  },
  header: {
    flex: 2,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: 'green',
    width: '100%',
  },
  image: {
    width: 140,
    height: 140,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    width: '99%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  updateButton: {
    backgroundColor: '#1245a8',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
    paddingHorizontal: 100,
  },
  label: {
    color: '#fff',
    marginLeft: 7,
    marginTop: 10,
    fontWeight: 700,
  },
});
