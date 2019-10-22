import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Button, Text, StyleSheet, Picker, ScrollView} from 'react-native';
import ActivityForm from '../components/ActivityForm';
import ActivityCard from '../components/ActivityCard';
import {openForm, seedDb} from '../actions/activity.actions';


class ActivityDashboard extends Component{
  state = {
    activities: [],
    filterBy: '',
    isDeleting: this.props.isDeleting
  }
  componentDidMount(){
    this.setState({
      ...this.state,
      activities: this.props.activities
    })
  }
  handleOpenForm = () => {
    this.props.open()
  }
  handleFilter = (payload) => {
    const {filterBy} = this.state;
    let filtered;
    if(!filterBy) return payload;
    if(filterBy === 'ascending') {
      filtered = payload.sort((a,b) => a.date.split('-').join('') - b.date.split('-').join())
    }
    if(filterBy === 'descending') {
      filtered = payload.sort((a,b) => b.date.split('-').join('') - a.date.split('-').join())
    }
    return filtered;
  }
  
  render(){
    const {isFormOpen, activity} = this.props;
    const filtered = this.handleFilter(this.state.activities);
    const view = isFormOpen ? 
      <ActivityForm 
      id={activity.id || ''}
      name={activity.name || ''}
      description={activity.description || ''}
      date={activity.date || ''}
      time={activity.time || ''}
      />
      :
      <ScrollView>
        {
          filtered.map((activity) => 
          <ActivityCard
          key={activity.id}
          id={activity.id}
          name={activity.name}
          description={activity.description}
          date={activity.date}
          time={activity.time}
          />
          )
        }
      </ScrollView>
    return (
      <>
        {
          !isFormOpen?
          <>
          <Text>Filter by dates</Text>
          <Picker
            selectedValue={this.state.filterBy}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({filterBy: itemValue})
            }
          >
            <Picker.Item label='Ascending' value='ascending'/>
            <Picker.Item label='Descending' value='descending'/>
          </Picker>
          </>
          :
          false
        }
      <View 
        style={{ 
          flex: 2,
          marginTop: 5, 
          flexDirection: 'column', 
          backgroundColor: 'rgba(000,000,000, .1)',
        }}>
        {
          view
        }
      </View>
      <View
        style={style.newActivity}
       >
        {
          !isFormOpen?
            <Button
            color='grey'
            title='+ New Activity'
            onPress={() => this.handleOpenForm()}
            /> 
          : <Text></Text>
        }
      </View>
      </>
    )
  }
}

const style = StyleSheet.create({
  newActivity: {
    position:'absolute',
    top: 0,
    borderRadius: 50,
    right: 0,
  },
})
const mapStateToProps = state => ({
  isFormOpen: state.activityReducer.isFormOpen,
  activity: state.activityReducer.activity,
  activities: state.activityReducer.activities,
  isDeleting: state.activityReducer.isDeleting
})

export default connect(mapStateToProps, {
  open: openForm,
  seed: seedDb,
})(ActivityDashboard);