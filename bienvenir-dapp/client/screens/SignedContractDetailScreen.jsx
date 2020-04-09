import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { 
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  withTheme,
  List,
  Theme
} from 'react-native-paper'
import DialogInput from 'react-native-dialog-input';
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { t } from '../services/i18n'

class SignedContractDetailScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isAlertVisible: false };
  }

  componentDidMount() {
    this.showDialog(false)
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.transaction.status){
      this.props.celoGetSignedCommitments()
      this.props.navigation.goBack()
    }
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });
  
  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }

  manageAccomplishment() {
    //Get step type to validate if a transaction value is required
    let stepType = this.props.route.params.steps[this.props.route.params.id].stepType

    //STEP TYPES OPTIONS
    //1. simple
    //2. value_required
    //3. automatic_transfer
    if (stepType == 2) {
      this.showDialog(true) 
    } else {
      let assignment = {
        signedCommitmentId: this.props.route.params.id,
        stepId: this.props.route.params.currentStep,
        accomplishValue: ''
      }
      this.props.celoCreateAssignment(assignment)  
    }
  }

  sendTransactionWithValue(txValue){
    //API validation to verify if the provided code is valid for the step the beneficiary is applying for
    let codeValidation = true;
    if (codeValidation) {
      let stepType = this.props.route.params.steps[this.props.route.params.id].stepType
      let assignment = {
        signedCommitmentId: this.props.route.params.id,
        stepId: this.props.route.params.currentStep,
        accomplishValue: txValue
      }
      this.props.celoCreateAssignment(assignment)  
    }
    
  }

  render() {
    const { id, name, steps } = this.props.route.params
    //console.log('steps inside signed screen', steps)
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <List.Section
          titleNumberOfLines={10}
          title={name}
        >
          {steps.map((step, i) => {
            let iconName = `numeric-${step.id + 1}-circle-outline`
            if(step.accomplishments.length > 0) {
              if (step.active) {
                return (
                  <List.Accordion
                    key={step.id}
                    titleNumberOfLines={10}
                    title={step.name}
                    style={styles.listAccordionActive}
                    left={
                      props => <List.Icon {...props} icon={iconName} />
                    }
                  >
                    {step.accomplishments.map((accomplishment, i) => {
                      let accomplishmentStatus = (accomplishment.accomplishmentCategory == 1) ? t('started') : t('ended')
                      let accomplishmentTime = moment.unix(accomplishment.accomplishDate).format("DD-MM-YYYY") + ' ' + moment.unix(accomplishment.accomplishDate).format("HH:mm:ss")
                      let accomplishmentName = `${accomplishmentStatus} ${t('the')} ${accomplishmentTime}`
                      return (
                        <List.Item
                          key={accomplishment.id}
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
              } else {
                return (
                  <List.Accordion
                    key={step.id}
                    titleNumberOfLines={10}
                    title={step.name}
                    style={styles.listAccordionInactive}
                    left={
                      props => <List.Icon {...props} icon={iconName} />
                    }
                  >
                    {step.accomplishments.map((accomplishment, i) => {
                      let accomplishmentStatus = (accomplishment.accomplishmentCategory == 1) ? t('started') : t('ended')
                      let accomplishmentTime = moment.unix(accomplishment.accomplishDate).format("DD-MM-YYYY") + ' ' + moment.unix(accomplishment.accomplishDate).format("HH:mm:ss")
                      let accomplishmentName = `${accomplishmentStatus} ${t('the')} ${accomplishmentTime}`
                      return (
                        <List.Item
                          key={accomplishment.id}
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
              }
            } else {
              if (step.active) {
                return (
                  <List.Item
                    key={step.id}
                    titleNumberOfLines={10}
                    title={step.name}
                    style={styles.listAccodionItemActive}
                    left={
                      props => <List.Icon {...props} icon={iconName} />
                    }
                  />
                )
              } else {
                return (
                  <List.Item
                    key={step.id}
                    titleNumberOfLines={10}
                    title={step.name}
                    style={styles.listAccodionItemInactive}
                    left={
                      props => <List.Icon {...props} icon={iconName} />
                    }
                  />
                )
              }
              
            }
          })}
        </List.Section>
        <Button 
          icon="check-decagram"
          style={styles.button}
          mode="contained" onPress={() => this.manageAccomplishment()}
        >{t('finalizeStep')}</Button>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={t('information')}
            message={t('informationRequired')}
            hintInput ={""}
            submitInput={ (txValue) => {this.sendTransactionWithValue(txValue)} }
            closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listAccordionActive: {
  },
  listAccordionInactive: {
  },
  listAccodionItemActive: {
    marginLeft: 8
  },
  listAccodionItemInactive: {
    marginLeft: 8,
    opacity: 0.3
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
  return {
    celo: props.auth.authentication,
    signedCommitments: props.signedCommitment.signedCommitments,
    transaction: props.tx.transaction
  }
}

export default connect(mapStateToProps, actions)(withTheme(SignedContractDetailScreen));