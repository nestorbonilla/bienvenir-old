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

class OpenContractScreen extends Component {

  componentDidMount() {
    this.props.celoGetCommitments()
  }

  render() {
    return(
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {this.props.commitments.map((item, i) => {
          return (
            <Card
              key={item.name}
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate('openContractDetail', {
                  id: item.id,
                  title: item.name,
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
  return {
    celo: props.auth.authentication,
    commitments: props.commitment.commitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(OpenContractScreen))