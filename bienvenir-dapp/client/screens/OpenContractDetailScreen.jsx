import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  withTheme,
  List,
  Theme,
} from 'react-native-paper';
import { connect } from 'react-redux'
import * as actions from '../actions'

class OpenContractDetailScreen extends Component {
  
  state = {
    expanded: true
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.transaction.status){
      this.props.navigation.navigate('signedContract')
    }
  }

  render() {
    const { id, name, steps } = this.props.route.params
    return (
      <View>
        <List.Section
          titleNumberOfLines={10}
          title={name}
        >
          {steps.map((item, i) => {
          return (
            <List.Item
              key={item.name}
              titleNumberOfLines={10}
              title={item.name}
              style={styles.listItem}
              left={
                props => <List.Icon {...props} icon="numeric-1-circle-outline" />
              }
            />
          )})}
        </List.Section>
        <Button icon="check-decagram" style={styles.button} mode="contained" onPress={() => this.props.celoSignCommitment(id)}>Firmar Compromiso</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    textAlign: 'justify'
  },
  button: {
    backgroundColor: '#FFCC25',
    margin: 50,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

function mapStateToProps(props) {
  return {
    celo: props.auth.authentication,
    commitments: props.commitment.commitments,
    transaction: props.tx.transaction
  }
}

export default connect(mapStateToProps, actions)(withTheme(OpenContractDetailScreen));