import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import firebase from 'firebase';
export default class AccountComponent extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var Users = firebase.database().ref('/');
                Users.on('value', function (snapshot) {
                    var users = snapshot.val();
                    console.log(users);
                });
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text>KuchBhi!</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
})