import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage, Alert,BackHandler } from 'react-native';
import firebase from 'firebase';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            load:0
        }
    }
    componentWillMount() {
        BackHandler.addEventListener('hadrwareBackPress', this.handleBackHandler);
    }
    handleBackHandler() {
        BackHandler.exitApp();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hadrwareBackPress', this.handleBackHandler);
        this.setState({
            load: 0
        });
    }
    onChangeUser = (value) => {
        this.setState({
            email: value
        })
    }
    onChangePassword = (value) => {
        this.setState({
            password: value
        })
    }
    onSubmit = () => {
        this.setState({
            load:1
        });
        const navigation = this.props.navigation;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorMessage);
            navigation.navigate("Login");
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigation.navigate('Profile');
            } else {
                console.log("No User Logged in Yet!");
            }
        });
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            (this.state.load==0 ? <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('./Resources/logo.png')}
                    />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                        <Image source={require('./Resources/user.png')} style={{ marginRight: 10, marginTop: 3 }} />
                        <TextInput style={styles.loginInput} placeholder='Email' onChangeText={this.onChangeUser} placeholderTextColor="#BFBFBF" />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                        <Image source={require('./Resources/pass.png')} style={{ marginRight: 10, marginTop: 3 }} />
                        <TextInput style={styles.loginInput} placeholder='Password' placeholderTextColor="#BFBFBF" onChangeText={this.onChangePassword} onSubmitEditing={this.onSubmit} secureTextEntry={true} />
                    </View>
                </View>
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity style={styles.signUp} onPress={this.onSubmit}><Text style={styles.signUpText}>Login!</Text></TouchableOpacity>
                </View>
            </View>:<View style = {styles.container}><Bubbles size={10} color="#000" /></View>)
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
    header: {
        marginTop: "15%"
    },
    head: {
        fontSize: 40,
        color: "#000",
        marginBottom: 20
    },
    signUp: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#000",
        marginTop: 30,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: '#000',
        fontSize: 25,
        fontFamily:'Roboto'
    },
    loginInput: {
        width: 250,
        fontSize: 20,
        fontFamily:'Roboto'
    },
    signUpPage: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#FFF",
        backgroundColor: "#FFF",
        alignItems: 'center'
    },
    signUpInput: {
        width: 250,
        fontSize: 20,
        marginTop: 10
    },
});