import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  View,
} from 'native-base';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import firebase from 'react-native-firebase';
import BackHeader from '../../shared/header';
import LinearGradient from 'react-native-linear-gradient';
let db = firebase.database();
const {width: WIDTH} = Dimensions.get('window');

export default class PatientForm extends Component {
  state = {
    patientname: '',
    disease: '',
    medication: '',
    date: '',
    cost: '',
    doctorid: firebase.auth().currentUser.uid,
  };

  getdb() {
    db.ref()
      .child(`patient/${doctorid}`)
      .on('value', snap => {
        let arr = Object.values(snap.val());
      });
  }

  onPressHandler = () => {
    this.setDate();
    this.addPatientDetails();
  };

  addPatientDetails = () => {
    let patientDetails = ({
      patientname,
      disease,
      medication,
      cost,
      doctorid,
    } = this.state);
    (patientDetails['date'] = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ).getTime()),
      db
        .ref()
        .child(`patient/${doctorid}`)
        .push(patientDetails);
    console.log('DataPushed..');

    this.setState({
      patientname: '',
      disease: '',
      medication: '',
      date: '',
      cost: '',
    });
  };

  submitButtonHandler = () => {
    if (
      this.state.patientname &&
      this.state.disease &&
      this.state.medication &&
      this.state.cost
    ) {
      Keyboard.dismiss();
      this.addPatientDetails();
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Container>
          <BackHeader />
          <Content>
            <Form>
              <Item inlineLabel>
                <Label>Patient Name</Label>
                <Input
                  onChangeText={patientname => this.setState({patientname})}
                  value={this.state.patientname}
                />
              </Item>
              <Item inlineLabel>
                <Label>Disease</Label>
                <Input
                  onChangeText={disease => this.setState({disease})}
                  value={this.state.disease}
                />
              </Item>
              <Item inlineLabel>
                <Label>Medication</Label>
                <Input
                  onChangeText={medication => this.setState({medication})}
                  value={this.state.medication}
                />
              </Item>

              <Item inlineLabel last>
                <Label>Cost</Label>
                <Input
                  onChangeText={cost => this.setState({cost})}
                  value={this.state.cost}
                  keyboardType="numeric"
                />
              </Item>
            </Form>
          </Content>
        </Container>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.submitButtonHandler}>
          <LinearGradient
            colors={['#3867B4', '#0F94B4']}
            style={styles.buttonGradient}>
            <Text style={{color: 'white'}}>SUBMIT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    height: '100%',
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
