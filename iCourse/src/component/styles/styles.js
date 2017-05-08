import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  logo:{
  	width:220,
  	resizeMode: 'contain',

  },

  containerInput:{
  	width:350,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 30
  },

  textRegister:{
  	fontStyle:'italic',
  	alignSelf:'flex-end',
  	fontSize:12
  },

  textInput:{
  	padding:10,
  	fontSize:20,
    marginTop: 10,
  	color:'rgba(0,0,0,0.3)',

    flex:1
  },

  containerLoginButton:{
  	justifyContent:'center',
  	alignItems: 'center',
  	backgroundColor: '#48BBEC',
  	padding:10,
    marginTop: 20,
  },

  textLoginButton:{
  	color:'#FFF',
  	fontSize:25,

  },

  row:{
  	flexDirection:'row',
  	alignItems:'center',
  	marginTop:5
  },


  line:{
  	flex:1,
  	height:2,
  	backgroundColor:'rgba(0,0,0,0.3)'
  },

  containerNav:{
    flexDirection :'row',
    height: 45,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  iconNav: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  textNav: {
    fontSize: 15,
    fontWeight: '700',
  },

  tabNav: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'space-around'
  }

});

export default styles;
