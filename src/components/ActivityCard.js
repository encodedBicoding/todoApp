import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import { connect } from 'react-redux';
import {openForm, isDeleting, deleted} from '../actions/activity.actions';
import database from '../model/data';

class ActivityCard extends Component{
  state = {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      date: this.props.date,
      time: this.props.time,
  }
  handleDelete = () => {
    this.props.isDeleting();
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this activity?',
      [
        {
          text: 'Cancel',
          onPress: () => '',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          database.delete(this.state)
          return this.props.deleted()
        }},
      ],
      {cancelable: true},
    );
  }

  render() {
    const date = this.state.date;
    const time = this.state.time;
    return (
      <View style={style.mainInner}>
          <View 
           style={style.textInner}>
            <Text style={{
              fontSize: this.state.name.length > 20 ? 19 : 29,
              fontWeight: 'bold'
            }}>
              {this.state.name}
            </Text>
            <Text>
            {this.state.description}
            </Text>
          </View>
            <View style={style.viewInner}>
                <Text
                style={style.date}
                >
                  {date}
                </Text>
                <Text
                style={style.time}
                >
                  {time}
                </Text>
              <View style={style.command}>
                <TouchableHighlight
                onPress={() => this.handleDelete()}
                >
                  <Text
                    style={style.delete}
                    >Delete
                  </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.props.open(this.state)}
              >
                <Text
                style={style.edit}
                  >Edit
                </Text>
              </TouchableHighlight>
              </View>
            </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  mainInner: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 5,
    borderRadius: 2,
    shadowColor: '#000',
    backgroundColor: '#fff'
  },
  viewInner: {
    flexDirection: 'column'
  },
  textInner: {
    flexGrow: 1,
  },
  command: {
    display: 'flex',
    flexDirection: 'row'
  },
  delete: {
    marginRight: 3,
    color: 'red'
  },
  edit: {
    marginLeft: 3,
    fontWeight: 'bold'
  },
  time: {
    fontWeight: 'bold'
  },
  date: {
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => ({
  isFormOpen: state.activityReducer.isFormOpen
})
export default connect(mapStateToProps, {
  open: openForm,
  isDeleting: () => isDeleting(),
  deleted: () => deleted()
})(ActivityCard);
