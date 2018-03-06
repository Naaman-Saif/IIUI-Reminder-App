import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image, FlatList, Button, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Notifications } from 'expo';
export default class FeeComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            monthNames: [{ key: 1, name: "January", isPaid: false, fees: 0,MNI:0 }, { key: 2, name: "February", isPaid: false, fees: 0,MNI:0 }, { key: 3, name: "March", isPaid: false, fees: 0,MNI:0 }, { key: 4, name: "April", isPaid: false, fees: 0,MNI:0 }, { key: 5, name: "May", isPaid: false, fees: 0,MNI:0 }, { key: 6, name: "June", isPaid: false, fees: 0,MNI:0 },
            { key: 7, name: "July", isPaid: false, fees: 0,MNI:0 }, { key: 8, name: "August", isPaid: false, fees: 0,MNI:0 }, { key: 9, name: "September", isPaid: false, fees: 0,MNI:0 }, { key: 10, name: "October", isPaid: false, fees: 0,MNI:0 }, { key: 11, name: "November", isPaid: false, fees: 0,MNI:0 }, { key: 12, name: "December", isPaid: false, fees: 0,MNI:0 }],
            isModalVisible: false,
            MonthIndex: 0,
            isDateTimePickerVisible: false,
            currentFees: "",
            feesChange: true,
            setForAll: false,
            isPaid: 0,
            isAdmin:false
        }
    }
    onPress = (i) => {
        this.setState({
            MonthIndex: i,
            isModalVisible: !this.state.isModalVisible
        })
    }
    componentWillMount() {
        AsyncStorage.getItem("UserData", (err, userData) => {
            userData = JSON.parse(userData);
            this.setState({
                monthNames: userData.Data
            })
            var Counter = 0;
            for (i = 0; i <= 11; i++) {
                if (userData.Data[i].isPaid) {
                    Counter++
                }
            }
            this.setState({
                isPaid: Counter
            })
            if(userData.isAdmin){
                this.setState({
                    isAdmin:true
                })
            }
        })
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        const localNotification = {
            title: 'Reminder',
            body: 'This is a reminder to please clear your dues.', // (string) — body text of the notification.
            ios: { // (optional) (object) — notification configuration specific to iOS.
                sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
            android: // (optional) (object) — notification configuration specific to Android.
                {
                    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
                    icon: './Resources/logo.png',
                    //color (optional) (string) — color of the notification icon in notification drawer.
                    priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
                    sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
                    vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
                    // link (optional) (string) — external link to open when notification is selected.
                }
        };
        const schedulingOptions = {
            time: date
        };
        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
        this._hideDateTimePicker();
    };
    onChange = () => {
        let monthCopy = JSON.parse(JSON.stringify(this.state.monthNames));
        monthCopy[this.state.MonthIndex].isPaid = !monthCopy[this.state.MonthIndex].isPaid;
        this.setState({
            monthNames: monthCopy
        })
    }
    valueSwitch = (i) => {
        let monthCopy = JSON.parse(JSON.stringify(this.state.monthNames));
        return monthCopy[i].isPaid
    }
    OnFeeSetChange = () => {
        let navigation = this.props.navigation;
        let monthCopy = JSON.parse(JSON.stringify(this.state.monthNames));
        this.setState({
            setForAll: !this.state.setForAll
        });
        if (this.state.setForAll == true) {
            for (i = this.state.MonthIndex; i <= 12; i++) {
                monthCopy[i].fees = this.state.currentFees;
                this.setState({
                    monthNames: monthCopy
                })
            }
        }
        navigation.navigate("FeeSchedule");
    }
    onTextChange = (text) => {
        this.setState({
            currentFees: text
        })
    }
    render() {
        let monthCopy = JSON.parse(JSON.stringify(this.state.monthNames));
        var CurrentDate = new Date();
        var currentMonth = CurrentDate.getMonth();
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ marginRight: "70%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#00f", width: "70%", borderRadius: 30 }} onPress={() => navigate('DrawerOpen')}>
                        <Text style={{ textAlign: 'center', color: "#fff" }}>Open SideMenu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: "20%" }}>
                    <Image
                        source={require('./Resources/logo.png')}
                    />
                </View>
                <View>
                    <FlatList
                        style={{ height: "70%" }}
                        data={this.state.monthNames}
                        renderItem={({ item, index }) => {
                            return (item.isPaid ?
                                <View style={styles.monthsPaid}>
                                    <TouchableOpacity onPress={() => this.onPress(index)}>
                                        <Text style={{ fontSize: 25 }}>
                                            {item.name}'s Fees is paid.
                                        </Text>
                                        <Text style={{ fontSize: 18 }}>
                                            Fees Paid is: {item.fees}
                                        </Text>
                                    </TouchableOpacity>
                                </View> :
                                <View>
                                    {index <= currentMonth ?
                                        <View style={styles.due}>
                                            <TouchableOpacity onPress={() => this.onPress(index)}>
                                                <Text style={{ fontSize: 25, color: "#FFF" }}>
                                                    {item.name}'s Fees is due.
                                                </Text>
                                            </TouchableOpacity></View> :
                                        <View style={styles.unPaid}>
                                            <TouchableOpacity onPress={() => this.onPress(index)}>
                                                <Text style={{ fontSize: 25, color: "#FFF" }}>
                                                    {item.name}'s Fees is not paid.
                                        </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>)
                        }}
                    />
                    <Modal style={styles.container} isVisible={this.state.isModalVisible}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline' }}>{this.state.monthNames[this.state.MonthIndex].name}</Text>
                            <Button title="Set a Reminder" onPress={this._showDateTimePicker} style={{ width: "30%" }} />

                            {(this.state.isAdmin==true ? <View><TextInput value={this.state.currentFees} style={{ marginTop: 20 }} placeholder="How much is the Fees Paid?" onChangeText={(text) => this.setState({ currentFees: text })} />
                                <Text>Set This Fees for All Months?</Text><Switch value={this.state.setForAll} onValueChange={this.OnFeeSetChange} />
                            <Text>Is the Fees Paid?</Text>
                            <Switch value={this.state.monthNames[this.state.MonthIndex].isPaid} onValueChange={this.onChange} /></View>:null)}
                            <DateTimePicker
                                mode='datetime'
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                                is24Hour={false}
                            />

                            <Text>----------------------------------------</Text>
                            <Button style={{ marginTop: 100 }} title="Close Me" onPress={() => {
                                monthCopy[this.state.MonthIndex].fees = this.state.currentFees;
                                this.setState({
                                    isModalVisible: false,
                                    monthNames: monthCopy,
                                    feesChange: true
                                });
                            }} />
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        paddingTop: 30
    },
    monthsPaid: {
        width: "100%",
        backgroundColor: "#aaa",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    due: {
        width: "100%",
        backgroundColor: "#f00",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    unPaid: {
        width: "100%",
        backgroundColor: "#00f",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});