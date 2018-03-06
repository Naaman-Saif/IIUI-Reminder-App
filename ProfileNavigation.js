import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import lHomeComponent from './LogHome';
import SignUpComponent from './SignUpScreen'
import FeeComponent from './FeeSchedule';
import SideMenu from './SideMenuFile';
import AccountsComponent from './Accounts';
    

const ProfileNavigator = DrawerNavigator({
    lHome:{
        screen:lHomeComponent,
    },
    FeeSchedule:{
        screen:FeeComponent,
    },
    SignUp: {
        screen: SignUpComponent,
    },
    Accounts:{
        screen:AccountsComponent
    }
},{
    contentComponent:SideMenu
    }
);
export default ProfileNavigator;