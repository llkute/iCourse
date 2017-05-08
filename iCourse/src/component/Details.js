import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  ToolbarAndroid,
  TouchableHighlight,
  Modal,
  ToastAndroid
} from 'react-native';

var _urlDB = require('./configUrl.js');

export default class Details extends Component {
  constructor(props) {
      super(props);
      navigator = this.props.navigator;
      this.state ={
      isVisible: false,
      info: ""
     }
   }
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
                    title={this.props.courseName}
                    navIcon={require('../icons/ic_arrow_left_white_24dp.png')}
                    onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
          <View style={styles.container}>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/code.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Mã học phần: {this.props.courseID}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/teacher.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Giảng viên: {this.props.professorName}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/location.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Phòng: {this.props.room}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/clock.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Thời gian: {this.props.time}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/available.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Tổng số: {this.props.available}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/occupied1.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Đã đăng ký: {this.props.occupied}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/credit.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Tín chỉ: {this.props.credit}</Text>
            </View>

            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></View>

            <View style={styles.itemListView}>
               <Image style={{height:25,width:25}} source={require('../icons/money.png')} />
               <Text style={{paddingLeft:15,fontSize:20}}>Học phí: {this.props.fee} VND</Text>
            </View>

            <Text style={{color:'red', paddingLeft: 15, paddingTop: 20}}>{this.state.info}</Text>

            <View style={styles.containerInput}>
              <TouchableHighlight onPress={() => this.setState({isVisible:true})}  style={styles.containerRegister}>
                <Text style={styles.textRegister}>Đăng Ký</Text>
              </TouchableHighlight>
            </View>
            {/* <TouchableHighlight onPress={this._onRegister.bind(this)} style={styles.containerRegister}>
              <Text style={styles.textRegister}>Đăng Ký</Text>
            </TouchableHighlight> */}
            {/* <Text style={styles.buttonText} style ={{color : 'blue', fontSize: 20,}}
                onPress = {this._onRegister.bind(this)}
              >Đăng Ký</Text> */}

              <Modal
                animationType={'fade'}
                visible={this.state.isVisible}
                transparent={true}
                 onRequestClose={() => this.setState({isVisible:false})}
                >
                  <View style={{flex:1, justifyContent: 'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.5)', borderWidth:1}}>
                    <View style={{borderRadius:20,backgroundColor:'#FFF',padding:20, width: 300,}}>
                      <Text style= {{fontSize:20,fontWeight:'200', justifyContent: 'center', marginBottom: 10}}>
                        Bạn có muốn đăng ký khóa học này?</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between',padding:10}}>
                        <View style={styles.rowChoice}>
                          <Text style={styles.textChoice}
                            // onPress={this._onRegister.bind(this)}
                            onPress={() => {
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
                                  if(responseJson.message === "Thành công"){
                                    this.props.navigator.push({
                                      id : 'mydrawerlayout',
                                      // Registered: 'Registered'
                                    });
                                    this.setState({isVisible: false});
                                    ToastAndroid.show("Thành công", ToastAndroid.SHORT);
                                  }else {

                                    this.setState({isVisible: false});
                                    this.setState({info: responseJson.message});
                                  }

                                  // alert(responseJson.message);
                                }
                              )
                              .done();



                          }}
                            >Đồng ý</Text>
                        </View>

                        <View style={styles.rowChoice}>
                          <Text style={styles.textChoice} onPress={() => this.setState({isVisible: false})}>Không</Text>
                        </View>

                      </View>
                    </View>
                  </View>

              </Modal>

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
var mausac = '#2aa22a';
var styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    container: {
    flex: 1,

    backgroundColor: 'white',
  },
  toolbar: {
      height: 56,
    backgroundColor: mausac,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#2B3C53',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  itemListView:{
    flexDirection:'row',
    margin:10
  },
  containerRegister:{
  	justifyContent:'center',
  	alignItems: 'center',
  	backgroundColor: 'red',
    // padding
  },

  textRegister:{
  	color:'white',
  	fontSize:25,
    padding: 10
  },
  containerInput:{
    paddingTop: 40,
    paddingHorizontal: 50,
  },


  rowChoice:{
  flex:1,
  flexDirection:'row',
  margin:5,
  padding:5,
  justifyContent:'center',
  alignItems: 'center'
},

textChoice:{
  color:'grey',
  marginLeft:5,
  fontWeight:'200',
  fontSize: 18,
},
});
