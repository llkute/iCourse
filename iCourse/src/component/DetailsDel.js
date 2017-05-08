import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  ToolbarAndroid
} from 'react-native';

var _urlDB = require('./configUrl.js');

export default class Details extends Component {
render(){
    return(
      <View style={styles.parentContainer}>
        {/* <MyToolbar style={styles.toolbar}
               title={'About'}
               navigator={this.props.navigator}
               sidebarRef={this}
               navIcon={require('../icons/back_arrow.png')}
       /> */}
       <ToolbarAndroid
                    title='About'
                    navIcon={require('../icons/back_arrow.png')}
                    onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
        <View style={styles.container}>

                <Text style={styles.buttonText}>{this.props.myCourseName}</Text>
                <Text style={styles.buttonText}>{this.props.myCourseID}</Text>
                <Text style={styles.buttonText} style ={{color : 'blue'}}
                    onPress = {this._onRegister.bind(this)}
                  >Xoa</Text>
          </View>

        </View>
    )
  }

  _onRegister(){
    let courseID = this.props.courseID;
    fetch(_urlDB.url+'courses/',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseID: courseID
        })
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.message === "success"){

          this.props.navigator.pop();
        }else {
          alert(responseJson.message)
        }
      }
    )
    .done();

  }
}

var styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
      height: 56,
    backgroundColor: '#4883da',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#4883da',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
