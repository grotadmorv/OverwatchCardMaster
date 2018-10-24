import React, { Component } from 'react';

import { View, ActivityIndicator } from 'react-native'
import { Images } from '../Themes'
import { Animatable } from '../Themes'
import styles from './Styles/MainScreenStyle'
import BoardScreen from "./BoardScreen";

class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timePassed: false
        };
    }

    componentDidMount() {
        setTimeout( () => {
            this.setTimePassed();
        }, 2000);
    }

    setTimePassed() {
        this.setState({timePassed: true});
    }

    render () {
        if (this.state.timePassed) {
            return <BoardScreen />;
        } else {
            return (
                <View style={[styles.container]}>
                    <View contentContainerStyle={{justifyContent: 'center'}} style={styles.welcome}>
                        <Animatable.Image animation='pulse' style={styles.logo} source={Images.clearLogo}/>

                        <ActivityIndicator style={{top: 100}}size="large" color="#0000ff"/>
                    </View>
                </View>
            )
        }
    }
}


export default MainScreen
