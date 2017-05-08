import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native';
import styles from '../styles/styles';

export default class Nav extends Component {
  constructor(props){
    super(props);
    this.state={
      isSelected : false
    }
  }

  render() {
    return (
      <View>
        <View style = {styles.containerNav}>
          <Image style ={styles.iconNav} source={require('../../images/ic_clear_all_black_24dp.png')}/>
          <Text style ={styles.textNav}>Register Course</Text>
          <Image style ={styles.iconNav} source={require('../../images/ic_search_black_24dp.png')}/>
        </View>

        <View style = {styles.tabNav}>
          <TouchableOpacity>
            <Text style ={styles.textNav}>My Course</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style ={styles.textNav}>Course</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
