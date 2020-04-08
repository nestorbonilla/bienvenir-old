import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
//import CardComponent from '../components/CardComponent'
import { 
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  withTheme,
  Theme,
} from 'react-native-paper';
import { connect } from 'react-redux'
import * as actions from '../actions'

class SignedContractScreen extends Component {

  componentDidMount() {
    this.props.celoGetSignedCommitments()
  }
  
  render() {
    return(
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {this.props.signedCommitments.map((item, i) => {
          return (
            <Card
              key={i}
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate('signedContractDetail', {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  steps: item.steps
                })
              }}
            >
              <Card.Title title={item.name} />
              <Card.Content>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Cover source={require('../assets/card_background_default.png')} />
            </Card>
          )
        })}  
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
})

function mapStateToProps(props) {
  //console.log('celo_contract', props.commitment.commitments)
  return {
    celo: props.auth.authentication,
    signedCommitments: props.signedCommitment.signedCommitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(SignedContractScreen))