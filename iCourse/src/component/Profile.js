import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ToolbarAndroid
} from 'react-native';

var _urlDB = require('./configUrl.js');

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1===r1});

export default class DemoParseJson extends Component {

constructor(props) {
  super(props);
   dataListView = [];

   this.state ={
     dataProfile : ""
  }
 }

componentDidMount() {
   fetch(_urlDB.url+"profile")
   .then((response)=>response.json())
   .then((dataJson)=>{

    this.setState({dataProfile: dataJson})
   })
   .done();
}


render(){
    return(
        <View style={styles.container}>
          <ToolbarAndroid
                       title='Thông tin sinh viên'
                       navIcon={require('../icons/ic_arrow_left_white_24dp.png')}
                       onIconClicked={() => this.props.navigator.push({
                         id: 'mydrawerlayout'
                       })}
             style={styles.toolbar}
             titleColor='white'
           />
            <View style={{justifyContent:'center',alignItems:'center', backgroundColor: 'white' }}>
              <Image style={{height:100,width:100, marginTop : 20, marginBottom: 20}} source={require('../icons/Student.png')}/>
            </View>

            <View style={{backgroundColor: 'white'}}>
              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/student.png')}/>
                <Text style={styles.textDrawer}>Tên sinh viên: {this.state.dataProfile.studentName}</Text>
              </View>

              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/code.png')}/>
                <Text style={styles.textDrawer}>Mã sinh viên: {this.state.dataProfile.studentID}</Text>
              </View>

              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/class.png')}/>
                <Text style={styles.textDrawer}>Lớp: {this.state.dataProfile.class}</Text>
              </View>

              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/birthday.png')}/>
                <Text style={styles.textDrawer}>Ngày sinh: {this.state.dataProfile.birthday}</Text>
              </View>

              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/ic_account_outline_black_24dp.png')}/>
                <Text style={styles.textDrawer}>Kỳ: {this.state.dataProfile.semester}</Text>
              </View>

              <View style={styles.itemDrawer} >
                <Image style={styles.imageDrawer} source={require('../icons/faculty.png')}/>
                <Text style={styles.textDrawer}>Khoa: {this.state.dataProfile.faculty}</Text>
              </View>
            </View>

                {/* <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.studentID}</Text> */}
                {/* <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.studentName}</Text> */}
                {/* <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.class}</Text> */}



         {/* <View style={{flex:1}}>
           <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.studentID}</Text>
           <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.studentName}</Text>
           <Text style={{paddingLeft:5,fontSize:25,fontWeight:'300', color: 'red'}}>{this.state.dataProfile.class}</Text>
         </View> */}
        </View>
    )
}


}
var mausac = '#2aa22a';
var styles = StyleSheet.create({
  container: {
        flex:1,
        backgroundColor: 'white'
    },
    itemDrawer : {
      paddingTop : 10,
      paddingLeft : 25,
      paddingBottom : 10,
      flexDirection : 'row'
    },
    imageDrawer : {
      width: 25,
      height: 25,
      marginRight: 10
    },
    toolbar: {
        height: 56,
      backgroundColor: mausac,
    },

    textDrawer : {
        fontSize: 16,

        color: 'black'
    },
  itemListView:{
    flexDirection:'row',
    margin:5
  },
  containerBodyWeather:{
    flex:1,
    margin:30,
    borderRadius:20,
    backgroundColor:"rgba(0,0,0,0.5)"
  },
});
