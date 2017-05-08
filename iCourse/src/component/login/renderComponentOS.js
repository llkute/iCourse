import React, { Component } from 'react';
import {
  TextInput,
  Platform,
  View,
  Image
} from 'react-native';

import styles from '../styles/styles';

export function TextInputUserName(THIS){
    if(Platform.OS === 'android'){
      return (
        <View style={{height:55,
        flexDirection:'row',

        alignItems:'center'}}>
          <Image style={{width:30,
          height:30,
          resizeMode:'contain'}} source={require('../../icons/ic_account_outline_black_24dp.png')}
          />
          <TextInput onChangeText={(value) => THIS.setState({username: value})}
          underlineColorAndroid={'transparent'} style={styles.textInput} placeholder="Tên đăng nhập"
          placeholderTextColor={"rgba(0,0,0,0.3)"}/>
        </View>
        );
    }else if(Platform.OS === 'ios'){
      return (
        <View style={{height:55,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'}}>
          <Image style={{width:30,
          height:30,
          resizeMode:'contain'}} source={require('../../icons/ic_account_outline_black_24dp.png')}
          />
          <TextInput style={styles.textInput} placeholder="Tên đăng nhập" placeholderTextColor={"#FFF"}/>
        </View>
        );
    }
  }

export function TextPassword(THIS){
  if(Platform.OS === 'android'){
    return (
      <View style={{height:55,
      flexDirection:'row',

      alignItems:'center'}}>
        <Image style={{width:30,
        height:30,
        resizeMode:'contain'}} source={require('../../icons/lock.png')}
        />
        <TextInput onChangeText={(value) => THIS.setState({password: value})}
          secureTextEntry={true} underlineColorAndroid={'transparent'} style={styles.textInput}
          placeholder="Mật khẩu" placeholderTextColor={"rgba(0,0,0,0.3)"}/>
        </View>
      );
  }else if(Platform.OS === 'ios'){
    return (
      <View style={{height:55,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'}}>
        <Image style={{width:30,
        height:30,
        resizeMode:'contain'}} source={require('../../icons/lock.png')}
        />
        <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Mật khẩu" placeholderTextColor={"#FFF"}/>
      </View>
      );
  }


}
