import React, { Component, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, View, YellowBox, TouchableOpacity, AsyncStorage } from 'react-native'
import {
  Button
} from 'react-native-paper'
import { connect } from 'react-redux'
import * as actions from '../actions'

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image resizeMode={'cover'}
          style={{ width: '70%', height: 300 }} 
          source={require("../assets/home_ic.png")}/>
          <Button
            style={styles.button}
            mode="contained"
            onPress={
              () => this.manageLogin()
            }
          >{this.props.celo.clLogin}</Button>
        <Text>Dirección de cuenta:</Text>
        <Text>{this.props.celo.clAddress}</Text>
        <Text>Teléfono: {this.props.celo.clPhone}</Text>
        <Text>Balance cUSD: {this.props.celo.clBalance}</Text>
        <Text>Compromisos actuales: 0</Text>
      </View>
    );
  }

  async manageLogin() {
    if(this.props.celo.clLogin === 'AUTENTICAR') {
      this.props.celoLogin()
    } else {
      this.props.celoLogout()
    }
  }

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCC25',
    marginTop: 12,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(props) {
  return {
    celo: props.auth.authentication
  }
}

export default connect(mapStateToProps, actions)(HomeScreen);