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

class SignedContractDetailScreen extends Component {
  
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
          <List.Accordion
            titleNumberOfLines={10}
            title="Concluir el curso 'Iniciando mi proceso migratorio' en la plataforma Bienvenir."
            style={styles.listAccordion}
            left={
              props => <List.Icon {...props} icon="numeric-1-circle-outline" />
            }
          >
            <List.Item
              title="Iniciado por Nestor Bonilla. | 12-04-2020 03:00 PM"
              titleNumberOfLines={5}
              left={
                props => <List.Icon {...props} color="#FFCC25" style={styles.listItem} icon="alarm" />
              }
            />
            <List.Item
              title="Finalizado por Nestor Bonilla. | 13-04-2020 05:00 PM"
              titleNumberOfLines={5}
              left={
                props => <List.Icon {...props} color="#FFCC25" style={styles.listItem} icon="alarm" />
              }
            />
          </List.Accordion>

          <List.Accordion
            titleNumberOfLines={10}
            title="Completar prueba diagnostica del curso 'Iniciando mi proceso migratorio' en la plataforma Bienvenir y obtener como minimo 70% de puntaje."
            left={
              props => <List.Icon {...props} icon="numeric-2-circle-outline" />
            }
          >
            <List.Item
              title="Iniciado por Nestor Bonilla. | 12-04-2020 03:00 PM"
              titleNumberOfLines={5}
              left={
                props => <List.Icon {...props} color="#FFCC25" style={styles.listItem} icon="alarm" />
              }
            />
            <List.Item
              title="Finalizado por Nestor Bonilla. | 13-04-2020 05:00 PM"
              titleNumberOfLines={5}
              left={
                props => <List.Icon {...props} color="#FFCC25" style={styles.listItem} icon="alarm" />
              }
            />
          </List.Accordion>
        </List.Section>
        <Button icon="check-decagram" style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>Completar Paso</Button>
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
  listAccordion: {
  },
  listItem: {
    marginLeft: 60
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
  //console.log('celo_contract', props.commitment.commitments)
  return {
    celo: props.auth.authentication,
    commitments: props.commitment.commitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(SignedContractDetailScreen));