import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
} from 'react-native';

var _urlDB = require('../configUrl.js');

import styles from '../styles/styles';
import {TextInputUserName,TextPassword}from './renderComponentOS';

export default class DemoPokemon extends Component {
  constructor(props){
    super(props);
    logo = require('../../images/LogoTeam.png');
    this.state = {
      password: "",
      username: ""
    }

  }

  // componentDidMount() {
  //    fetch(_urlDB.url+"login")
  //    .then((response)=> response.json())
  //    .then((dataJson)=>{
  //       //  var message=dataJson.message;
  //       //   if(message.length>0){
  //       //     alert(message);
  //       //   }
  //    })
  //    .done();
  //
  // }

  _onPress = () => {

      fetch(_urlDB.url+'login',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        }
      )
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.id === this.state.username){
            var name = responseJson.name;

            console.log(message);
            AsyncStorage.setItem('name',name);
            this.props.navigator.push({
              id: 'mydrawerlayout',
              name : name
              // passProps : {
              //   student_id: this.state.student_id
              // }
            });
          }else {
            var message=responseJson.message;
            console.log(message);
            this.props.navigator.push({
              id: 'login',
              message:message
           });
          }
        }
      )
      .done();
    }
  render() {
    return (
      <ScrollView style={{backgroundColor:'white'}}>
        <View style = {styles.container}>
          <Image source={logo} style={styles.logo} />
          <View>
            <View style={styles.containerInput}>
              <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>
              {TextInputUserName(this)}
              <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>
              {TextPassword(this)}
              <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>
              <TouchableHighlight onPress={this._onPress.bind(this)} style={styles.containerLoginButton}>
                <Text style={styles.textLoginButton}>Đăng nhập</Text>
              </TouchableHighlight>
              <Text>{this.props.message}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
