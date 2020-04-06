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

class ContractDetailScreen extends Component {
  
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <View>
        <List.Section title="Compromiso no. 1">
          <List.Item
            titleNumberOfLines={10}
            title="Concluir el curso 'Iniciando mi proceso migratorio' en la plataforma Bienvenir."
            style={styles.listItem}
            left={
              props => <List.Icon {...props} icon="numeric-1-circle-outline" />
            }
          />
          <List.Item
            titleNumberOfLines={10}
            title="Completar prueba diagnostica del curso 'Iniciando mi proceso migratorio' en la plataforma Bienvenir y obtener como minimo 70% de puntaje."
            style={styles.listItem}
            left={
              props => <List.Icon {...props} icon="numeric-2-circle-outline" />
            }
          />
        </List.Section>
        <Button icon="check-decagram" style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>Firmar Compromiso</Button>
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
    commitments: props.commitment.commitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(ContractDetailScreen));