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
  Modal,
  RefreshControl,
  ToastAndroid
} from 'react-native';

var _urlDB = require('../configUrl.js');

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1===r1});

export default class DemoParseJson extends Component {

constructor(props) {
  super(props);
   dataListView = [];

   navigator = this.props.navigator;
   this.state ={
    data: ds.cloneWithRows(dataListView),
    isVisible: false,
    refreshing: false,
   }
 }

_myFetch(){
  fetch(_urlDB.url+"mycourses")
   .then((response)=>response.json())
   .then((dataJson)=>{
    dataListView=dataJson;
    this.setState({data:ds.cloneWithRows(dataListView)})
   })
   .done();
}

componentDidMount() {
  this._myFetch();
}


componentWillMount() {
  this._myFetch();
}

_onRefresh() {
    this.setState({refreshing: true});
    fetch(_urlDB.url+"mycourses")
     .then((response)=>response.json())
     .then((dataJson)=>{
      dataListView=dataJson;
      this.setState({data:ds.cloneWithRows(dataListView)})
     }).
     then(() => {
      this.setState({refreshing: false});
    }).done();
  }

_renderRow(data){
   return(

       <TouchableOpacity

         >
           <View style={styles.itemListView}>
              <Image style={{height:40,width:40, marginTop : 15, flex: 1}} source={require('../../icons/book.png')} />
              <View style={{flex: 8}}>

                  <Text style={{paddingLeft:10,fontSize:20,fontWeight:'300'}}>{data.courseName}</Text>
                  <Text style={{paddingLeft:10}}>Giảng Viên: {data.professorName}</Text>
                  <Text style={{paddingLeft:10}}>Thời Gian: {data.time}</Text>
                  {/* <Text style={{paddingLeft:5, color: 'green'}}>{'rating : ' + data.studentName + " - repleaseYear : " + data.class}</Text> */}
              </View>

              <TouchableHighlight onPress={() => this.setState({isVisible:true})}>
              {/* <TouchableHighlight onPress={() => this._myPopUp(data)}> */}
                <Image style={{margin: 20}} source={require('../../icons/delete-trash.png')}/>
              </TouchableHighlight>

              <Modal
                animationType={'fade'}
                visible={this.state.isVisible}
                transparent={true}
                 onRequestClose={() => this.setState({isVisible:false})}
                >
                  <View style={{flex:1, justifyContent: 'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.3)', borderWidth:1}}>
                    <View style={{borderRadius:20,backgroundColor:'#FFF',padding:20, width: 300,}}>
                      <Text style= {{fontSize:20,fontWeight:'200', justifyContent: 'center', marginBottom: 10}}>
                        Bạn muốn xóa khóa học này?</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between',padding:10}}>
                        <View style={styles.rowChoice}>
                          <Text style={styles.textChoice}
                            onPress={() => {
                              let courseID = data.courseID;
                              //alert(ten);
                              fetch(_urlDB.url+"mycourses/",{
                                method:'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  courseID: courseID
                                })
                              })
                              .then((response)=>response.json())
                              .then((responseJson)=>{
                                if(responseJson.message === "Thành công"){
                                  // console.log(responseJson.message);
                                  // this.setState({isVisible: false});
                                  dataListView1=responseJson.myCourses;
                                  // dataListView1 = $.grep(data, function(e) { return e.courseID !=  courseID});
                                  // console.log(dataListView1);

                                  this.setState({data:ds.cloneWithRows(dataListView1)});
                                  // this.setState({isVisible: false});
                                  // this.props.navigator.push({
                                  //   id: 'mydrawerlayout'
                                  // });


                                  this.setState({isVisible: false});
                                  ToastAndroid.show("Thành công", ToastAndroid.SHORT);

                                }else {
                                  this.setState({isVisible: false});
                                  // alert(responseJson.message);
                                  ToastAndroid.show("Thất bại", ToastAndroid.SHORT);
                                }
                              })
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
              {/* <Text style={{marginRight:25,fontSize:25,fontWeight:'300', color: 'green'}}
                onPress={() => {
                  let id = data.courseID;
                  //alert(ten);
                  fetch("http://192.168.1.3:8080/mycourses/"+id,{
                    method:'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    }
                  })
                  .then((response)=>response.json())
                  .then((responseJson)=>{
                    if(responseJson.message === "success"){
                      alert("oki");
                    }else {
                      alert(responseJson.message);
                    }
                  })
                  .done();
              }}
                >Xoa</Text> */}
            </View>

            <View style={{height: 1, backgroundColor: 'black'}}></View>


        </TouchableOpacity>

    );
}
_onDel(data){
  fetch("http://192.168.31.214:8080/mycourses/"+data)
  .then((response)=>response.json())
  .then((responseJson)=>{
    if(responseJson.message === "success"){
      alert("oki");
    }else {
      alert(responseJson.message);
    }
  })
  .done();
}

_onDetail(data){
  let myCourseID = data.courseID;
  let myCourseName =data.courseName;
  this.props.navigator.push({
    id: 'detailsDel',
    myCourseID: myCourseID,
    myCourseName: myCourseName
  })
}

render(){
    return(
        <View style={styles.container}>

         <View style={{flex:1}}>
             <ListView
                enableEmptySections={true}
                dataSource={this.state.data}
                renderRow={this._renderRow.bind(this)}

                  refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
             />}
             >

             </ListView>

         </View>
        </View>
    )
}


}

var styles = StyleSheet.create({
  container: {
        flex:1
    },

  toolbar:{
    height:55,
    backgroundColor:"aqua"
  },

  itemListView:{
    flexDirection:'row',
    margin:5
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
