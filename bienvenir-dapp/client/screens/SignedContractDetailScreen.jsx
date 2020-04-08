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
import moment from 'moment'
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
    const { id, name, steps } = this.props.route.params
    return (
      <View>
        <List.Section
          titleNumberOfLines={10}
          title={name}
        >
          {steps.map((step, i) => {
            let iconName = `numeric-${step.id + 1}-circle-outline`
            return (
              <List.Accordion
                titleNumberOfLines={10}
                title={step.name}
                style={styles.listAccordion}
                left={
                  props => <List.Icon {...props} icon={iconName} />
                }
              >
                {step.accomplishments.map((accomplishment, i) => {
                  let status = (accomplishment.accomplishmentCategory == 1) ? 'Iniciado' : 'Finalizado'
                  let time = moment.unix(accomplishment.accomplishDate).format("DD-MM-YYYY");
                  let accomplishmentName = `${status} el ${time}`
                  return (
                    <List.Item
                      key={i}
                      titleNumberOfLines={10}
                      title={accomplishmentName}
                      style={styles.listItem}
                      left={
                        props => <List.Icon {...props} icon="alarm" />
                      }
                    />
                  )
                })}
              </List.Accordion>
            )
          })}
        </List.Section>
        <Button icon="check-decagram" style={styles.button} mode="contained" onPress={() => this.props.celoSignCommitment(id)}>Concluir Paso</Button>
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
    signedCommitments: props.signedCommitment.signedCommitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(SignedContractDetailScreen));