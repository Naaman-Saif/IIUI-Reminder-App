import React from 'react';
import {StyleSheet,View,Text,Image,AsyncStorage,Button,Alert,TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class SideMenu extends React.Component{
    constructor(){
        super();
        this.state = {
            user:'',
            image:'',
            admin:0
        }
    }

    logOut = () =>{
        let navigation = this.props.navigation;
        firebase.auth().signOut().then(function() {
            navigation.navigate("Home");
          }).catch(function(error) {
            Alert.alert(error.message);
          });
    }
    componentWillMount(){
        AsyncStorage.getItem("UserData",(err,UserData)=>{
            UserData = JSON.parse(UserData)
            if(UserData.isAdmin == true){
                this.setState({
                    admin:1
                });
            }
        });
    }
    render(){
        const navigation = this.props.navigation
        return(
            <View style={{marginTop:150}}>
                <Button style={{marginTop:150}} title="Dashboard" style={styles.font} onPress={()=>navigation.navigate('lHome')}></Button>
                <Text>-----------------------------------</Text>
                {(this.state.admin == 0 ? <Button title="Fee Schedule" style={styles.font} onPress={()=>navigation.navigate("FeeSchedule")}></Button>:null)}
                <Text>-----------------------------------</Text>
                {(this.state.admin == 1 ? <View><Button title="Create An Account" onPress={()=>navigation.navigate("SignUp")}></Button><Text>-----------------------------------</Text></View>:null)}
                {(this.state.admin == 1 ? <View><Button title="Accounts" onPress={()=>navigation.navigate("Accounts")}></Button><Text>-----------------------------------</Text></View>:null)}
                <Button title="Log Out!" onPress={this.logOut}></Button>
                
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    font:{
        fontFamily:'Roboto'
    }
});
