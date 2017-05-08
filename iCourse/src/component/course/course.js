import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid
} from 'react-native';

import Nav from '../widgets/nav'

export default class Course extends Component {
  // state={
  //   userid : []
  // }
  //
  // componentDidMount(){
  //   this._loadInitialState().done;
  // }
  //
  // _loadInitialState = async () => {
  //   var value = await AsyncStorage.getItem('userid');
  //   if(value !=null){
  //     this.setState({userid : value});
  //   }
  // }


  render() {
    return (
      <View>
        <Text>Sourese113</Text>
        {/* <Nav/> */}
        {/* <text>{this.props.userid}</text> */}
      </View>
    );
  }
}
