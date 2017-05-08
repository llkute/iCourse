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


export default class About extends Component {
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
                    title='Về chúng tôi'
                    navIcon={require('../icons/ic_arrow_left_white_24dp.png')}
                    onIconClicked={() => this.props.navigator.push({
                      id: 'mydrawerlayout'
                    })}
          style={styles.toolbar}
          titleColor='white'
        />
        <View style={styles.container}>
          <View style={{justifyContent:'center',alignItems:'center', backgroundColor: 'white' }}>
            <Image style={{height:200, width: 200, marginTop : 20, marginBottom: 20}} source={require('../images/LogoTeam.png')}/>
            <Text >Phiên bản 1.0</Text>
          </View>

          <View style={{justifyContent:'center',alignItems:'center', backgroundColor: 'white', paddingTop: 30 }}>
            <Text style={{fontSize: 20}}>Hà Minh Hải</Text>
            <Text style={{fontSize: 20}}>Ngô Thị Trung Hiếu</Text>
            <Text style={{fontSize: 20}}>Triệu Thị Ly Ly</Text>
            <Text style={{fontSize: 20}}>Nguyễn Đức Tín</Text>
            <Text style={{fontSize: 20}}>Mai Đăng Tùng</Text>
          </View>

        </View>
            {/* </View>
        <Text onPress={() => this.props.navigator.pop()} >hello ahihi</Text>
      </View> */}
        </View>
    )
  }
}
var mausac = '#2aa22a';
var styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
    flex: 1,
  },
  toolbar: {
      height: 56,
    backgroundColor: mausac,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
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

AppRegistry.registerComponent('DemoApp', () => DemoParseJson);
