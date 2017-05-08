import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ListView,
  RefreshControl,
  AsyncStorage
} from 'react-native';

import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

var ToolbarAndroid = require('ToolbarAndroid');
import MyCourse from './course/mycourse.js'
var _urlDB = require('./configUrl.js');
var name;
const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1===r1});

export default class MyDrawerLayout extends Component {

  constructor(props){
    super(props);
    dataListView = [];
    navigator = this.props.navigator;
    name = this.props.name;

    console.log(name);

    this.state={
      data: ds.cloneWithRows(dataListView),
      isSearch:false,
      username : "",
      refreshing: false,
      dataProfile : "",
      namesv : name
    };

    iconSearch= require('../icons/ic_magnify_white_24dp.png');
    iconDrawer= require('../icons/ic_menu_white_24dp.png');

    
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetch(_urlDB.url+"courses")
    .then((response)=> response.json())
    .then((dataJson)=>{
      dataListView = dataJson;
     // this.setState({dataProfile : dataJson});
     this.setState({data:ds.cloneWithRows(dataListView)})
    })
    .then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    //  fetch("http://192.168.31.214:8080/profile")
    //  .then((response)=> response.json())
    //  .then((dataJson)=>{
    //   //  dataListView = dataJson;
    //   this.setState({dataProfile : dataJson});
    //   // this.setState({data:ds.cloneWithRows(dataListView)})
    //  })
    //  .done();

     fetch(_urlDB.url+"courses")
     .then((response)=> response.json())
     .then((dataJson)=>{
       dataListView = dataJson;
      // this.setState({dataProfile : dataJson});
      this.setState({data:ds.cloneWithRows(dataListView)})
     })
     .done();

  }

  // componentDidMount(){
  //
  //   this._loadInitialState().done;
  // }
  //
  // _loadInitialState = async () => {
  //   var value = await AsyncStorage.getItem('username');
  //   if(value !=null){
  //     this.setState({userid : value});
  //   }else{
  //     this.setState({userid : "lyly"});
  //   }
  // }


  _renderNavigationView(){
    return(
      <View style={styles.container}>
        <View style={styles.headerDrawer}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 25}}>
            <Image style={{width: 45, height: 45,}} source={require('../icons/profile.png')}/>
            {/* <Text style={{fontSize: 20}}>{this.state.dataProfile.studentName</Text> */}
              <Text style={{fontSize: 20,paddingLeft: 10, color: 'white'}}>{this.state.namesv}</Text>
          </View>
        </View>

        <View style={styles.contentDrawer}>
          <TouchableHighlight onPress={() => this.props.navigator.push({
            id : 'profile'
          })}>
            <View style={styles.itemDrawer} >
              <Image style={styles.imageDrawer} source={require('../icons/ic_account_outline_black_24dp.png')}/>
              <Text style={styles.textDrawer}>Thông tin cá nhân</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => {
            fetch(_urlDB.url+"logout")
            .then((response)=>response.json())
            .then((dataJson)=>{
              if(dataJson.message === "Thành công"){
                this.props.navigator.push({
                  id : 'login',
                });
              }else {
                alert(dataJson.message);
              }

            })
            .done();
          }}>
            <View style={styles.itemDrawer} >
              <Image style={styles.imageDrawer} source={require('../icons/ic_arrow_left_black_24dp.png')}/>
              <Text style={styles.textDrawer}>Đăng xuất</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.props.navigator.push({
            id : 'termofuse'
          })}>
            <View style={styles.itemDrawer} >
              <Image style={styles.imageDrawer} source={require('../icons/ic_bookmark_outline_black_24dp.png')}/>
              <Text style={styles.textDrawer}>Điều khoản sử dụng</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.props.navigator.push({
            id : 'aboutus'
          })}>
            <View  style={styles.itemDrawer} >
              <Image style={styles.imageDrawer} source={require('../icons/ic_information_outline_black_24dp.png')}/>
              <Text  style={styles.textDrawer}>Về chúng tôi</Text>
              </View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  _renderRow(data){
     return(

         <TouchableOpacity
           onPress={() => {
             let courseID = data.courseID
              let courseName = data.courseName
              let professorName = data.professorName
              let time = data.time
              let room = data.room
              let available = data.available
              let occupied= data.occupied
              let credit= data.credit
              let fee= data.fee
           this.props.navigator.push({
           id : 'details',
           passProps:{
             courseID: courseID,
    				courseName: courseName,
    				professorName : professorName,
            time : time,
            room: room,
            occupied: occupied,
            available : available,
            credit : credit,
            fee :fee
    			}
         })}}
         >
           <View style={styles.itemListView}>
              <Image style={{height:40,width:40, marginTop : 15}} source={require('../icons/book.png')} />
              <View>

                  <Text style={{paddingLeft:10,fontSize:20,fontWeight:'300'}}>{data.courseName}</Text>
                  <Text style={{paddingLeft:10}}>Giảng Viên: {data.professorName}</Text>
                  <Text style={{paddingLeft:10}}>Thời Gian: {data.time}</Text>
                  {/* <Text style={{paddingLeft:5, color: 'green'}}>{'rating : ' + data.studentName + " - repleaseYear : " + data.class}</Text> */}
              </View>
              {/* <Text>{this.props.Registered}</Text> */}
            </View>

            <View style={{height: 1, backgroundColor: 'black'}}></View>
          </TouchableOpacity>

      );
  }


  _searchListView(value){
    let dataSearched = dataListView.filter((course)=>{
        let courseName = course.courseName.toLowerCase();
        let valueInput = value.toLowerCase();
        if(courseName.indexOf(valueInput) >= 0){
          return course;
        }
    });
    this.setState({
      data:this.state.data.cloneWithRows(dataSearched),
    })

  }

  _renderSearchView(){
    let isSearch = this.state.isSearch;
    if(!isSearch){
      return(
          <View style={styles.toolBar}>
            <TouchableHighlight onPress={()=> this.refs['DRAWER'].openDrawer()}>
              <Image style={styles.iconToolBar} source={iconDrawer}
                />
            </TouchableHighlight>

            <Text style={styles.textToolBar}>Register Course</Text>
            <TouchableOpacity onPress={()=>this.setState({isSearch:true})}>
               <Image style={styles.iconToolBar} source={iconSearch}/>
            </TouchableOpacity>

          </View>
        );
    }else{
      return(
          <View style={styles.toolBarSearch}>
            <TouchableHighlight onPress={()=> this.setState({isSearch : false})}>
              <Image style={styles.iconToolBar} source={require('../icons/ic_arrow_left_white_24dp.png')}
                />
            </TouchableHighlight>
            <TextInput onChangeText={this._searchListView.bind(this)} style={{flex:1, color: 'white'}} placeholder={"Tìm kiếm"}
              placeholderTextColor={"white"} underlineColorAndroid={'transparent'}/>
          </View>
        );
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          drawerBackgroundColor={'white'}
          drawerWidth ={250}
          ref={"DRAWER"}
          renderNavigationView={this._renderNavigationView.bind(this)}
          >
            {/* <ToolbarAndroid
             title={'iCOurse'}
             navIcon={require('../icons/ic_menu_white_24dp.png')}
             style = {styles.toolbar}
             titleColor={'white'}
             onIconClicked={this._onIconClicked.bind(this)}
            /> */}
            {/* <MyToolbar style={styles.toolbar}
                   title={'Register Course'}
                   navigator={this.props.navigator}
                   sidebarRef={this}
           /> */}
           {this._renderSearchView()}
            <View style={{flex: 1}}>
              <IndicatorViewPager
                style={{flex:1, flexDirection: 'column-reverse'}}
                indicator={this._renderTitleIndicator()}
                >

                    <View style={{flex: 1}}>
                      <ListView
                         enableEmptySections={true}
                         dataSource={this.state.data}
                         renderRow={this._renderRow.bind(this)}

                         refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh.bind(this)}
                            />
                          }
                      >
                      </ListView>
                      {/* <Text style={{color: 'red'}}>{this.state.dataProfile.studentID}</Text>
                      <Text style={{color: 'red'}}>{this.state.dataProfile.studentName}</Text>
                      <Text style={{color: 'red'}}>{this.state.dataProfile.class}</Text>
                      <Text style={{color: 'red'}}>{this.state.dataProfile.semester}</Text> */}
                    </View>
                    <View style={{flex:1 }}>
                      <MyCourse navigator={navigator} />
                    </View>
                </IndicatorViewPager>
            </View>

        </DrawerLayoutAndroid>
      </View>
    );
  }


  _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Các Môn Học', 'Môn Học Của Tôi']}
          style={styles.indicatorContainer}
          itemTextStyle={styles.indicatorText}
          selectedItemTextStyle={styles.indicatorSelectedText}
          selectedBorderStyle={styles.selectedBorderStyle}
        />;
  }

  _renderTabIndicator() {
        let tabs = [{
                text: 'My Course',
                // iconSource: require('../imgs/ic_tab_home_normal.png'),
                selectedIconSource: require('../icons/ic_window_minimize_white_24dp.png')
            },{
                text: 'Courses',
                // iconSource: require('../imgs/ic_tab_task_normal.png'),
                selectedIconSource: require('../icons/ic_window_minimize_white_24dp.png')
            }
        ];
        return <PagerTabIndicator style={{position: 'absolute', backgroundColor: '#0000FF'}} tabs={tabs}
          style={styles.indicatorContainer}
          itemTextStyle={styles.indicatorText}
          selectedItemTextStyle={styles.indicatorSelectedText}
          selectedBorderStyle={styles.selectedBorderStyle}
        />;
      }
  _setDrawer() {
   this.refs['DRAWER'].openDrawer();
  }

}
var mausac = '#2aa22a';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerDrawer: {
    flex :2,
    backgroundColor: mausac,
  },
  contentDrawer :{
    flex: 8,
    backgroundColor: 'white',
  },

  imageDrawer : {
    width: 25,
    height: 25,
    marginRight: 10
  },

  lineDrawer:{
    height: 1,
    backgroundColor: 'black'
  },

  textDrawer : {
      fontSize: 16,

      color: 'grey'
  },

  itemDrawer : {
    paddingTop : 15,
    paddingLeft : 25,
    paddingBottom : 15,
    flexDirection : 'row'
  },

  indicatorContainer: {
        backgroundColor: mausac,
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        color: 0xFFFFFF99
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 0xFFFFFFFF
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'white'
    },
    statusBar: {
        height: 24,
        backgroundColor: '#2aa22a'
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: '#2aa22a',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20
    },

    container:{
    flex:1
  },

  toolBar:{
    backgroundColor:'#2aa22a',
    height:55,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },

  toolBarSearch:{
    backgroundColor:'#2aa22a',
    height:55,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },

  iconToolBar:{
    width:30,
    height:30,
    resizeMode:'contain'
  },

  textToolBar:{
    fontSize:25,
    fontWeight: 'bold',
    color: 'white'
  },

   textTieuDeListView:{
    fontSize:25,
    fontWeight: 'bold',
    color: '#000'
  },

  rowContainer:{
    flexDirection:'row'
  },

  itemListView:{
    flexDirection:'row',
    margin:5
  }

});
