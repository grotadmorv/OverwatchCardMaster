import React, { Component } from 'react';

import { View, Text } from 'react-native'
import { Images } from '../Themes'

import { Animatable } from '../Themes'
import { Button } from 'react-native-elements'

import styles from './Styles/MainScreenStyle'

class Main extends Component {

    render () {
        return (
            <View style={[styles.container]}>
                <View contentContainerStyle={{justifyContent: 'center'}} style={styles.welcome}>
                    <Animatable.Image animation='pulse' style={styles.logo} source={Images.clearLogo} />
                </View>
                <View contentContainerStyle={{justifyContent: 'center'}} style={styles.actions}>
                    <View style={styles.action}>
                        <Button
                            large
                            color={'#000'}
                            backgroundColor={'#FFFFFF'}
                            borderRadius={5}
                            icon={{name: 'login', type: 'entypo', backgroundColor: styles.button, color: '#000' }}
                            title="S'IDENTIFIER"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                    <View style={styles.action}>
                        <Button
                            large
                            color={'#000'}
                            backgroundColor={'#FFFFFF'}
                            borderRadius={5}
                            icon={{name: 'text-document', type: 'entypo', color: '#000'}}
                            title="S'INSCRIRE"
                            onPress={() => this.props.navigation.navigate('Register')}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default Main
