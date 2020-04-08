import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Switch } from 'react-native'
//import CardComponent from '../components/CardComponent'
import { 
  Avatar,
  Button,
  List,
  withTheme,
  Theme,
} from 'react-native-paper'
import InfoText from '../components/InfoText'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { t } from '../services/i18n'

class ProfileScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <TouchableOpacity>
            <View style={styles.userImage}>
              <Avatar.Image size={84} source={require('../assets/profile_default.png')} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 16 }}>{this.props.celo.clPhone}</Text>
            {/* <Text
              style={{
                color: "gray",
                fontSize: 16
              }}
            >{this.celo.clPhone}
            </Text> */}
          </View>
        </View>
        <InfoText text={t('account')} />
        <View>
          <List.Section>
            <List.Item
              title={t('updateInformation')}
              left={
                props => <List.Icon {...props} icon="card-text-outline" />
              }
              onPress={() => {}}
            />
          </List.Section>
        </View>
        <InfoText text={t('others')} />
        <View>
          <List.Section>
            <List.Item
              title={t('about')}
              left={
                props => <List.Icon {...props} icon="information-outline" />
              }
              onPress={() => {}}
            />
            <List.Item
              title={t('terms')}
              left={
                props => <List.Icon {...props} icon="script-text-outline" />
              }
              onPress={() => {}}
            />
            <List.Item
              title={t('shareApp')}
              left={
                props => <List.Icon {...props} icon="share-variant" />
              }
              onPress={() => {}}
            />
            <List.Item
              title={t('rateUs')}
              left={
                props => <List.Icon {...props} icon="google-play" />
              }
              onPress={() => {}}
            />
            <List.Item
              title={t('askUs')}
              left={
                props => <List.Icon {...props} icon="email-outline" />
              }
              onPress={() => {}}
            />
          </List.Section>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20
  },
  userImage: {
    marginRight: 12
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#ECECEC"
  }
});

function mapStateToProps(props) {
  //console.log('celo_contract', props.commitment.commitments)
  return {
    celo: props.auth.authentication,
    commitments: props.commitment.commitments
  }
}

export default connect(mapStateToProps, actions)(withTheme(ProfileScreen))