import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'native-base';
import BackHeader from '../../shared/header';

export default class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let date = new Date(this.props.navigation.getParam('date')).getDate();
    let month = new Date(this.props.navigation.getParam('date')).getMonth();
    let year = new Date(this.props.navigation.getParam('date')).getFullYear();

    let dateOfPatientRegistration = date + '-' + (month + 1) + '-' + year;

    return (
      <View>
        <BackHeader />

        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Patient Details
        </Text>

        <View style={{margin: 20}}>
          <Card style={styles.cardView}>
            <Text>Name: {this.props.navigation.getParam('patientname')}</Text>
            <Text>Disease: {this.props.navigation.getParam('disease')}</Text>
            <Text>
              Medication: {this.props.navigation.getParam('medication')}
            </Text>
            <Text>Date: {dateOfPatientRegistration}</Text>
            <Text>Cost: {this.props.navigation.getParam('cost')}</Text>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
});
