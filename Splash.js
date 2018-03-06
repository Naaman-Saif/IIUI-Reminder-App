import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import { Font } from 'expo';

export default class SplashComponent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        const navigation = this.props.navigation;
        Expo.Font.loadAsync({
            'Roboto': require('./Resources/Roboto-Regular.ttf')
        });
        var config = {
            apiKey: "AIzaSyA8T-R5bt4h5_hs9us0YMRsNljaiORtpBo",
            authDomain: "firstapp-bdbd5.firebaseapp.com",
            databaseURL: "https://firstapp-bdbd5.firebaseio.com",
            projectId: "firstapp-bdbd5",
            storageBucket: "firstapp-bdbd5.appspot.com",
            messagingSenderId: "873716676309"
        };
        firebase.initializeApp(config);
        // Get a reference to the database service
        var database = firebase.database();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var UserData = firebase.database().ref('users/' + user.displayName);
                UserData.on('value', function (snapshot) {
                    AsyncStorage.setItem("UserData",JSON.stringify(snapshot.val()));
                });
                navigation.navigate("Profile");
            } else {
                navigation.navigate("Login");
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Animatable.Image animation="wobble" iterationCount="infinite"
                    source={require('./Resources/logo.png')}
                />
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
});