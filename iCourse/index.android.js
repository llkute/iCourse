/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

import SplashPage from './src/component/splashscreen'
import LogIn from './src/component/login/login'
import Course from './src/component/course/course'
import MyDrawerLayout from './src/component/MyDrawerLayout.js'
import AboutUs from './src/component/AboutUs.js'
import Details from './src/component/Details.js'
import Profile from './src/component/Profile.js'
import MyCourse from './src/component/course/mycourse.js'
import DetailsDel from './src/component/DetailsDel.js'
import TermOfUse from './src/component/TermOfUse.js'
var _navigator;
var _url;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

export default class RegisterCourse extends Component {
  _renderScence(route, navigator){
    _navigator = navigator;
    // _url = "192.168.31.127";
    let title = route.title;
    let room = route.room;
    let courseID = route.courseID;
    let myCourseID = route.myCourseID;
    let myCourseName = route.myCourseName;
    let id = route.id;
    // let username = route.username;
    // let passProps = route.passProps;
    let name= route.name;
    let message = route.message;
    let passProps = route.passProps;
    // let Registered= route.Registered;

    switch (id) {
      case 'SplashPage':
        return <SplashPage navigator={navigator}/>
        break;
      case 'MainView':
        return <LogIn navigator={navigator}/>
        break;
      case 'course':
        return <Course navigator={navigator}{...passProps}/>
        break;

      case 'mydrawerlayout': return (
        <MyDrawerLayout
            route={route}
            navigator={navigator}{...passProps}
            name= {name}
            // Registered ={Registered}

            // _url= {_url}
        />
      );

      case 'aboutus' : return(
        <AboutUs
          navigator={navigator}
        />
      );

      case 'login':
        return <LogIn navigator={navigator}
          message={message}
         />
        break;

      case 'details':
        return <Details navigator={navigator}{...passProps}
                // room ={room}
                // courseID = {courseID}
         />
        break;

        case 'profile':
          return <Profile navigator={navigator}

           />
          break;

        case 'mycourse':
        return <MyCourse navigator={navigator}
          Registered ={Registered}
              // _url= {_url}
              // route={route}
         />
        break;

        case 'detailsDel':
        return <DetailsDel
          // route={route}
          navigator={navigator}
          myCourseID={myCourseID}
          myCourseName={myCourseName}
         />
        break;

        case 'termofuse':
        return <TermOfUse
          navigator={navigator}
        />

    }
  }
  render() {
    return (
      <Navigator
         initialRoute={{id: 'SplashPage'}}
         renderScene={this._renderScence.bind(this)}
      />
    );
  }
}

AppRegistry.registerComponent('iCourse', () => RegisterCourse);
