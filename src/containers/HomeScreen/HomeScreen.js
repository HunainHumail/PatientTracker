import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  DatePickerAndroid,
  TextInput,
  Dimensions,
  Modal,
  Keyboard,
} from 'react-native';
import firebase from 'react-native-firebase';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import NavigationService from '../../config/navigationService';
import {Card, Drawer} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import LogoutModal from './LogoutModal';
import SideBar from '../../navdrawer/drawers';
import {ScrollView} from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');
const {height} = Dimensions.get('window');

reference = firebase.database().ref('patients');

export default class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLogoutModalVisible: false,
      currentUser: firebase.auth().currentUser,
      firebasedata: [],
      keys: [],
      searchingarray: [],
      date: '',
      datetext: 'Pick a date',
      clearbuttonstate: false,
    };
  }

  componentDidMount() {
    const snapshot = firebase
      .database()
      .ref(`patient/${firebase.auth().currentUser.uid}`)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data) {
          this.setState({
            firebasedata: Object.values(data),
            searchingarray: Object.values(data),
          });
        } else {
          this.setState({
            firebasedata: '',
            searchingArray: '',
          });
        }
      });
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => 
      NavigationService.reset_0('LoginScreen')
      
      )
      .catch(error => this.setState({errorMessage: error.message}));
  };

  handleChangeText = text => {
    let data = [...this.state.searchingarray];

    data = data.filter(patient =>
      patient.patientname.toLowerCase().startsWith(text.trim().toLowerCase()),
    );

    this.setState({
      firebasedata: data,
      text,
    });
  };

  clearSearch = () => {
    Keyboard.dismiss();
    this.setState({
      firebasedata: [...this.state.searchingarray],
      date: '',
      text: '',
    });
  };

  datePickerButton = async () => {
    console.log('OK');
    try {
      const {action, ...data} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action != DatePickerAndroid.dismissedAction) {
        console.log(new Date(data.year, data.month, data.day).getTime());

        let searchingArray = [...this.state.searchingarray];
        searchingArray = searchingArray.filter(searchedDate => {
          console.log(searchedDate.date, 'filter');
          if (
            searchedDate.date ==
            new Date(data.year, data.month, data.day).getTime()
          ) {
            return searchedDate;
          }
        });
        console.log('DATA: ', searchingArray);

        this.setState({
          firebasedata: searchingArray,
          date: new Date(data.year, data.month, data.day),
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };
  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  toggle = () => {
    this.setState({
      isLogoutModalVisible: !this.state.isLogoutModalVisible,
    });
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigate={this.navigator} />}>
        <View style={{height: height, width: WIDTH}}>
          <LogoutModal
            show_modal={this.state.isLogoutModalVisible}
            toggle_modal={this.toggle}
            logout_user={this.handleLogout}
          />

          <View style={styles.appBar}>
            <LinearGradient
              colors={['#3867B4', '#0F94B4']}
              style={styles.linearGradient}>
              <TouchableOpacity style={styles.icon} onPress={this.openDrawer}>
                <Icons name="menu" size={25} color="#FFF" />
              </TouchableOpacity>

              <View style={styles.title}>
                <Text style={{color: '#FFF'}}>Patient Tracker</Text>
              </View>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => this.setState({isLogoutModalVisible: true})}>
                <FeatherIcon name="power" size={25} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.searchBar}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
              }}>
              <Icons name="search" size={20} />
              <TextInput
                placeholder="Search Patients"
                onChangeText={this.handleChangeText}
                style={{width: '100%'}}
                value={this.state.text}
              />
            </View>
            <View style={{width: '20%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.datePickerButton();
                }}>
                <FeatherIcon name="calendar" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.date || this.state.text ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={this.clearSearch}
                style={{
                  backgroundColor: 'white',
                  height: 30,
                  width: 70,
                  borderRadius: 10,
                  elevation: 2,
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                <Text style={{textAlign: 'center'}}>Clear</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          <FlatList
            data={this.state.firebasedata}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('PatientDetails', item)
                  }>
                  {console.log('=====itemmsssss', item)}

                  <Card style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: this.getRandomColor(),
                          ...styles.circleAvatar,
                        }}>
                        <View
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            borderRadius: 35,
                          }}></View>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          {item.patientname &&
                            item.patientname[0].toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.patientList}>
                      <Text>{item.patientname}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity
            style={styles.myFAB}
            onPress={() => this.props.navigation.navigate('PatientForm')}>
            <LinearGradient
              colors={['#3867B4', '#0F94B4']}
              style={styles.fabGradient}>
              <Icons name="add" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  username: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'yellow',
  },
  icon: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: '100%',
    width: WIDTH,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  appBar: {
    height: 80,
  },
  welcomeStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    color: '#0F94B4',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  patientList: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    padding: 30,
    margin: 10,
  },
  circleAvatar: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myFAB: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
    elevation: 10,
  },
  fabGradient: {
    height: 60,
    width: 60,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
