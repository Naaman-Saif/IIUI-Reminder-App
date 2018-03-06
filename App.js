import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

// import HomeComponent from './Home'
import LoginComponent from './LoginScreen'
import ProfileNavigator from './ProfileNavigation'
import SplashComponent from './Splash'


const RootNavigator = StackNavigator({
    Splash: {
        screen: SplashComponent,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginComponent,
        navigationOptions: {
            header: null
            //            headerStyle:{backgroundColor: '#f15b4e',elevation: 0,visible:false}
        }
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            header: null
        }
    }
});

export default RootNavigator;
