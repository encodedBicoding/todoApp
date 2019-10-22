import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ActivityDashboard from '../containers/ActivityDashboard';

class HomeScreen extends Component{
  static navigationOptions(){
    return {
      title: 'Activity Manager',
      headerTitleStyle: {
        justifyContent: 'center'
      }
    }
  }
  render(){
    return(
      <ActivityDashboard/>
    )
  }
}

const iNavigator = createStackNavigator({
  Home: HomeScreen
})

export default createAppContainer(iNavigator);