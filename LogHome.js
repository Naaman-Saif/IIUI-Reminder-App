import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, Vibration, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Notifications } from 'expo';
import Pie from 'react-native-pie';

export default class LogHome extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            isPaid: 0,
            totalFees:0,
            series3:0
        }
    }
    componentWillMount() {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        AsyncStorage.getItem("UserData", (err, UserData) => {
            UserData = JSON.parse(UserData);
            var MonthData = UserData.Data;
            var i = 0;
            var Counter = 0;
            var DueCounter = 0;
            while (i <= 11) {
                if (MonthData[i].isPaid == true) {
                    Counter++
                }
                if(MonthData[i].isPaid == false && i<= currentMonth){
                    DueCounter++;
                }
                i++;
            }
            this.setState({
                isPaid: Counter,
                series3:DueCounter
            })
        })

    }
    componentDidMount() {
        AsyncStorage.getItem("UserData", (err, UserData) => {
            UserData = JSON.parse(UserData);
            var MonthData = UserData.Data;
            var i = 0;
            var Counter = 0;
            while (i <= 11) {
                if (MonthData[i].isPaid == true) {
                    Counter++
                }
                i++;
            }
            this.setState({
                isPaid: Counter
            })
        })
    }
    static navigationOptions = {
        drawerLabel: 'Home'
    }
    render() {
        currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();
        var series1 = (this.state.isPaid) * 100;
        var series2 = 100 - series1;
        var paid = this.state.isPaid;
        var unPaid = this.state.totalFees - this.state.isPaid;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ marginRight: "70%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#00f", width: "70%", borderRadius: 30 }} onPress={() => navigate('DrawerOpen')}>
                        <Text style={{ textAlign: 'center', color: "#fff" }}>Open SideMenu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Image
                        source={require('./Resources/logo.png')}
                    />
                </View>
                <Text>Today is:{currentDay}/{currentMonth + 1}/{currentYear}</Text>
                <View style={{ marginTop: 70 }}>
                    <Pie
                        radius={100}
                        innerRadius={60}
                        series={[series1, series2,this.state.series3]}
                        colors={['#aaa', '#00f',"#f00"]} />
                </View>
                <Text><Text style={{ color: "#aaa" }}>Grey</Text> is Paid!</Text>
                <Text><Text style={{ color: "#00f" }}>Blue</Text> is Unpaid</Text>
                <Text><Text style={{ color: "#f00" }}>Red</Text> is Due</Text>
                <Text>The Current Fees paid is {paid}</Text>
                <Text>{unPaid} is the currently Amount unpaid.</Text>
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
    header: {
        marginTop: -30
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
        borderColor: "#FFF",
        marginTop: 30,
        backgroundColor: "#c2453b",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25
    },
    loginInput: {
        width: 250,
        fontSize: 20
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