import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { createActivity, closeForm } from '../actions/activity.actions';
import { View, TextInput, Text, StyleSheet, Button, TouchableHighlight} from 'react-native';
import database from '../model/data';
import DatePicker from 'react-native-datepicker';

class ActivityForm extends Component{
    static errArr = [];
    state = {
      id: this.props.id,
      name: this.props.name || '',
      description: this.props.description || '',
      date: this.props.date || '',
      time: this.props.time || '',
      error: {
        message: []
      }
    }
    handleTextChange = (name, text) => {
      this.setState({[name]: text})
    }

    validate = (name, type) => {
      name = name.replace(/\s/g, '');
      return () => {
        if(!/[a-z]/.test(name)|| !name){
          ActivityForm.errArr.push({
            type,
            message: `Activity ${type} must only be alphabets`
          })
          this.setState({
            ...this.state,
            error: {
              ...this.state.error,
              message: [...ActivityForm.errArr]
            }
          })
          return false;
        }
        return true;
      }
    }

    handleCreateActivity = () => {
      let error = 0
      const {add} = this.props;
      let isNameValid = this.validate(this.state.name, 'name');
      let isDescriptionValid = this.validate(this.state.description, 'description');
      let iNV = isNameValid();
      let iDV = isDescriptionValid();
      if(!iNV || !iDV) error = 1;
      if(error > 0) return;
      const isFound = database.getByid(this.state);
      if(isFound !== -1) {
        database.findAndUpdate(this.state);
      } else {
        const newActivity = {
          id: uuid(),
          name: this.state.name,
          description: this.state.description,
          date: this.state.date,
          time: this.state.time,
        }
        database.add(newActivity);
        add(newActivity);
      }
      delete ActivityForm.errArr;
      this.closeForm();
    }

    closeForm = () => {
      return this.props.close()
    }

    handleDateTimeSet = (date, time) => {
      this.setState({
        ...this.state,
        date: date
      })
      let mainTime = this.handleTimeCalc(time);
      this.setState({
        ...this.state,
        time: mainTime,
      })
    }
    handleTimeCalc = (time) => {
      time = time.toLocaleString().split(' ')[3].split(':');
      let local = ''
      if(time[0] < 12) {
        local = 'AM'
      }
      if(time[0] >= 12) {
        local = 'PM';
        time[0] = time[0]-12
      }
      return `${time[0]}:${time[1]}:${time[2]}${local}`
    }
  render(){
    return(
      <View style={style.card}>
        <View style={style.left}>
          <TouchableHighlight
          onPress={() => this.closeForm()}
          >  
            <Text
            style={style.close}
            >
              X
            </Text>
          </TouchableHighlight>
        </View>
        <View style={style.cardHolder}>
          <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 19,
          }}
          >
            Create An Activity
          </Text>
          <Text>Todo Name</Text>
          <TextInput
          style={style.input}
          value={this.state.name}
          name='name'
          onChangeText={(text) => this.handleTextChange('name',text)}
          />
          <Text style={style.error}>
            {
              this.state.error.message.length >0 ?
              this.state.error.message.find((message) => message.type === 'name').message
              :
              ''
            }
          </Text>
          <Text>Todo Description</Text>
          <TextInput
          style={style.input}
          value={this.state.description}
          name='description'
          onChangeText={(text) => this.handleTextChange('description', text)}
          />
          <Text style={style.error}>
          {
              this.state.error.message.length >0 ?
              this.state.error.message.find((message) => message.type === 'description').message
              :
              ''
            }
          </Text>
          <Text>Set Date and Time</Text>
          <DatePicker
          style={{width: 300, marginTop: 3, marginBottom: 3}}
          mode="datetime"
          date={this.state.date}
          format="YYYY-MM-DD"
          minDate="2019-10-20"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour={false}
          onDateChange={(date, time) => this.handleDateTimeSet(date, time)}
          />
          <Button
          title={this.state.id ? 'Update Activity' : 'Create Activity'}
          onPress={() => this.handleCreateActivity()}
          />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  card: {
    flexDirection: 'column',
  },
  left: {
    position: 'absolute',
    left: '90%'
  },
  cardHolder: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '30%'
  },
  close: {
    fontSize: 20,
    color: 'red',
    backgroundColor: 'transparent',
  },
  error: {
    marginBottom: '2%',
    color: 'red'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 4,
  }
})
export default connect(null, {
  add: createActivity,
  close: closeForm
})(ActivityForm);