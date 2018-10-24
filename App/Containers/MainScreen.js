import React, { Component } from 'react';

import { View, ActivityIndicator } from 'react-native'
import { Images } from '../Themes'
import { Animatable } from '../Themes'
import styles from './Styles/MainScreenStyle'

class MainScreen extends Component {

    render () {
        return (
            <View style={[styles.container]}>
                <View contentContainerStyle={{justifyContent: 'center'}} style={styles.welcome}>
                    <Animatable.Image animation='pulse' style={styles.logo} source={Images.clearLogo} />

                    <ActivityIndicator animating={this.state.showProgress} size="large" color="#0000ff" />
                </View>
            </View>
        )
    }
}

export default MainScreen
