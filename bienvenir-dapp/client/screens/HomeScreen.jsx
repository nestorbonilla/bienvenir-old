import React, { Component } from 'react'

import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox, TouchableOpacity, AsyncStorage } from 'react-native'


import { connect } from 'react-redux'
import * as actions from '../actions'

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
            <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>
        <Text>Current Account Address:</Text>
        <Text>Address</Text>
        <Text>Phone number: </Text>
        <Text>cUSD Balance: </Text>
          
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
  
  export default connect(null, actions)(HomeScreen);