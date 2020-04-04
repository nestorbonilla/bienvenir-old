import React, { Component, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image resizeMode={'cover'}
          style={{ width: '70%', height: 300 }} 
          source={require("../assets/home_ic.png")}></Image>
        <TouchableOpacity
            style={styles.button}
            onPress={()=> this.props.celoLogin()}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>{this.props.celoAuth.clLogin}</Text>
        </TouchableOpacity>
        <Text>Dirección de cuenta:</Text>
        <Text>{this.props.celoAuth.clAddress}</Text>
        <Text>Teléfono: {this.props.celoAuth.clPhone}</Text>
        <Text>Balance cUSD: {this.props.celoAuth.clBalance}</Text>
          
        <Text>Compromisos actuales</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    marginTop:30,
    marginBottom:30,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#FFCC25',
    borderRadius:10,
    width: 250
  },
  buttonText: {
    color:'#08293F',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
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
    celoAuth: props.auth.authentication
  }
}

export default connect(mapStateToProps, actions)(HomeScreen);