import React, {useContext,useEffect,useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ScrollView,
  Image,
  SectionList,
} from 'react-native';
import Antd from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import GlobalContext from '../../context/global-context';
import axios from "axios";

export default function Home({ navigation, setUser }) {
  // Transaction data
  const user = useContext(GlobalContext)
  
  useEffect(()=>{
    axios.get("https://UnacceptablePastPhases.yassineakermi.repl.co/profil", {
      headers: {
        "Authorization": `Bearer ${user.jwt}`}
    })
    .then(({data,status}) => {
      if (status == 200)
        setUser({...data, jwt: user.jwt})
    })    
  },[])
  const disconnect = async () => {
    AsyncStorage.removeItem('JWT');
    setUser(null);
  };

  const renderItem = ({ item }) =>  <Item amount={item.amount} to={item.to} from={item.from} date={item.date} />    
  
  const DATA = [
    {
      title: '2022/01/12',
      data: [
        {
          id: '1',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
        {
          id: '2',
          amount: '1000',
          to: 'yassine akermi',
          from: '',
        },
        {
          id: '3',
          amount: '3000',
          to: '',
          from: 'Ahmed akermi',
        },
        {
          id: '4',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
      ],
    },
    {
      title: '2022/01/15',
      data: [
        {
          id: '1',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
        {
          id: '2',
          amount: '1000',
          to: 'yassine akermi',
          from: '',
        },
        {
          id: '3',
          amount: '3000',
          to: '',
          from: 'Ahmed akermi',
        },
        {
          id: '4',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
      ],
    },
    {
      title: '2022/01/19',
      data: [
        {
          id: '1',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
        {
          id: '2',
          amount: '1000',
          to: 'yassine akermi',
          from: '',
        },
        {
          id: '3',
          amount: '3000',
          to: '',
          from: 'Ahmed akermi',
        },
        {
          id: '4',
          amount: '2000',
          to: '',
          from: 'oussama maaroufi',
        },
      ],
    },
  ];

  //rendered Item in data

  const Item = ({ amount, to, from, date }) => (
    <View style={styles.item}>
      {from ? (
        <>
          <Antd style={{ width: '10%', fontSize: 20 }} name="export2" />
          <View
            style={{
              position: 'relative',
              width: '70%',
              alignItems: 'flex-start',
              paddingStart: '3%',
            }}>
            <Text>
              <Text style={{ opacity: 0.5 }}>From</Text> {from}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '200',
              }}>
              received
            </Text>
          </View>
          <Text style={{ width: '20%', color:'#006400' }}>{`+\$${amount}`}</Text>
        </>
      ) : (
        <>
          <Antd style={{ width: '10%', fontSize: 20 }} name="export" />
          <View
            style={{
              position: 'relative',
              width: '70%',
              alignItems: 'flex-start',
              paddingStart: '3%',
            }}>
            <Text>
              <Text style={{ opacity: 0.5 }}>To</Text> {to}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '200',
              }}>
              sent
            </Text>
          </View>
          <Text style={{ width: '20%', color:'#FF0000' }}>{`-\$${amount}`}</Text>
        </>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: '15%', marginLeft: "-30%" }]}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTE_52ZBH4c0MfPtibPvRDFbOpuGGkDn0-A&usqp=CAU',
          }}
          name="user-circle"
          size={60}
        />
        <View style={styles.headerSubView}>
          <Text style={[styles.text, {fontWeight: "700", fontSize: 18}]}>Hello, {user.firstName + ' ' + user.lastName}</Text>
          <Text>
            Your balance is:{' '}
            <Text style={{ fontWeight: 'bold',color:'#006400' }}>${user.balance}</Text>
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={['#222', '#222', '#111']}
        style={styles.scrollViewContent}>
        <View style={styles.scrollViewContent}>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction')}
              style={styles.card}>
              <Icon2 name="money-check-alt" size={45}  />
              <Text style={styles.text}>Transfer Fund</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Deposit')}
              style={styles.card}>
              <Icon3 name="cash-plus" size={65}  />
              <Text style={styles.text}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("PayBills")} style={styles.card}>
              <Icon1 name="payments" size={55}  />
              <Text style={styles.text}>Pay Bills</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={disconnect} style={styles.card}>
              <Icon name="sign-out" size={45}  />
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transaction}>
            <SectionList
              renderSectionHeader={({ section }) => {
                return (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginTop: 15,
                      marginBottom: 7
                    }}>
                    {moment(section.title).format('LL')}
                  </Text>
                );
              }}
              sections={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //backgroundColor: '#FEFEFA',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignSelf: "center",
  },
  headerSubView: {
    paddingStart: 5,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  card: {
    marginTop: 20,
    width: "45%",
    height: 100,
    textAlign: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    shadowColor: 'darkgray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transaction: {
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    width: 300,
    height: 70,
    textAlign: 'center',
    justifyContent: 'space-around',
    borderRadius: 7,
    alignItems: 'center',
    paddingLeft: 15
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
});