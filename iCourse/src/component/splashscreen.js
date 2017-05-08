import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Navigator
} from 'react-native';
class SplashPage extends Component {

    constructor(props){
      super(props);
    }

    _onChangePage(){
      this.props.navigator.replace({
        id: 'MainView'
      })
    }

    componentWillMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
            this._onChangePage();
        }, 2000);
    }
    render () {
        return (
            <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{position: 'absolute', resizeMode: 'cover'}} source={require('../images/splashscreen.png')}></Image>
            </View>
        );
    }
}

module.exports = SplashPage;
