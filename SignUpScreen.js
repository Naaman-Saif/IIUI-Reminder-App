import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage, Alert, Button, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
export default class SignUpComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            user: '',
            password: '',
            repeatPassword: '',
            load: 0,
            kids: 0,
            annualFees: 0
        }
    }
    onChangeEmail = (value) => {
        this.setState({
            email: value
        });
    }
    onChangeUser = (value) => {
        this.setState({
            user: value
        });
    }
    onChangePassword = (value) => {
        this.setState({
            password: value
        });
    }
    onChangePasswordAgain = (value) => {
        this.setState({
            repeatPassword: value
        });
    }
    onChangeKids = (value) => {
        this.setState({
            kids: value
        });
    }
    onChangeAnnualFees = (value) => {
        this.setState({
            annualFees: value
        })
    }
    onSubmit = () => {
        this.setState({
            load: 1
        })
        if (this.state.password != this.state.repeatPassword) {
            return alert("Passwords do not match");
            this.setState({
                password: '',
                repeatPassword: ''
            })
        } else {
            if (this.state.email == '') {
                return alert('Email is required!');
                this.setState({
                    password: '',
                    repeatPassword: ''
                });
            } else {
                var userName = this.state.user;
                var Kids = this.state.kids;
                var annualFees = this.state.annualFees;
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function () {
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: userName
                    }).then(function () {

                        // Get a reference to the database service
                        var database = firebase.database();
                        firebase.database().ref('users/' + user.displayName).set({
                            name: user.displayName,
                            Data: [{ key: 1, name: "January", isPaid: false, fees: 0, MNI: 0 }, { key: 2, name: "February", isPaid: false, fees: 0, MNI: 0 }, { key: 3, name: "March", isPaid: false, fees: 0, MNI: 0 }, { key: 4, name: "April", isPaid: false, fees: 0, MNI: 0 }, { key: 5, name: "May", isPaid: false, fees: 0, MNI: 0 }, { key: 6, name: "June", isPaid: false, fees: 0, MNI: 0 },
                            { key: 7, name: "July", isPaid: false, fees: 0, MNI: 0 }, { key: 8, name: "August", isPaid: false, fees: 0, MNI: 0 }, { key: 9, name: "September", isPaid: false, fees: 0, MNI: 0 }, { key: 10, name: "October", isPaid: false, fees: 0, MNI: 0 }, { key: 11, name: "November", isPaid: false, fees: 0, MNI: 0 }, { key: 12, name: "December", isPaid: false, fees: 0, MNI: 0 }],
                            isAdmin: false,
                            kids: Kids,
                            totalFees: annualFees
                        });
                    }, function (error) {
                        console.log(error);
                    });
                })
                const navigation = this.props.navigation;
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        navigation.navigate('Profile');
                    } else {
                        console.log("No User Logged in Yet!");
                    }
                });
            }
        }

    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            (this.state.load == 0 ? <View style={styles.container}>
                <View style={styles.form}>
                    <ScrollView style={{ marginTop: "20%" }}>
                        <TextInput style={styles.loginInput} placeholder='Email' placeholderTextColor="#BFBFBF" onChangeText={this.onChangeEmail} />
                        <TextInput style={styles.signUpInput} placeholder='User' placeholderTextColor="#BFBFBF" onChangeText={this.onChangeUser} />
                        <TextInput style={styles.signUpInput} placeholder='Password' placeholderTextColor="#BFBFBF" secureTextEntry={true} onChangeText={this.onChangePassword} />
                        <TextInput style={styles.signUpInput} placeholder='Repeat Password' placeholderTextColor="#BFBFBF" secureTextEntry={true} onChangeText={this.onChangePasswordAgain} />
                        <TextInput style={styles.signUpInput} placeholder="How Many kids?" placeholderTextColor="#BFBFBF" onChangeText={this.onChangeKids} />
                        <TextInput style={styles.signUpInput} placeholder="Annual Fees?" placeholderTextColor="#BFBFBF" onChangeText={this.onChangeAnnulFees} />

                        <Button style={styles.signUp} title="Sign Up!" onPress={this.onSubmit}></Button>
                    </ScrollView>
                </View>
            </View> : <View><Bubbles size={10} color="#000"></Bubbles></View>)

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
        marginTop: -20
    },
    form: {
        marginTop: "15%",
    },
    head: {
        fontSize: 40,
        color: "#fff",
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
        fontFamily: 'Roboto'
    },
    loginInput: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Roboto'
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
        marginTop: 10,
        fontFamily: 'Roboto'
    },
    signUpFb: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#FFF",
        marginTop: 30,
        backgroundColor: "#4267b2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpFbText: {
        color: '#FFF',
        fontSize: 15,
    }
});