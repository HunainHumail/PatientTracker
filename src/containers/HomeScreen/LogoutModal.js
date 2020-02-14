import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

export default class LogoutModal extends Component {
  render() {
    const {show_modal, toggle_modal, logout_user} = this.props;
    return (
      <Modal transparent={true} visible={show_modal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LOGOUT</Text>
            <Text style={{padding: 20}}>Are you sure you want to logout?</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.buttons, {backgroundColor: 'grey'}]}
                onPress={() => {
                  toggle_modal();
                }}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  logout_user();
                }}
                style={[styles.buttons, {backgroundColor: 'red'}]}>
                <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modelContainer: {
    padding: 20,
    width: 400,
    height: 200,
    backgroundColor: 'white',
    elevation: 0.3,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttons: {
    margin: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 10,
  },

  btnText: {
    color: 'white',
  },
});
