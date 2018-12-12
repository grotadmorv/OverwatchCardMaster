import React, { Component } from 'react';

import { View, Text, Image } from 'react-native'

class gameBoardScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagesWrapperPlayerOne}>
                    <Image style={styles.imagePlayerOne} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerOne} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerOne} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerOne} source={require('../Themes/Images/symmetra.png')}/>
                </View>

                <View style={styles.imagesWrapperPlayerTwo}>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/symmetra.png')}/>
                </View>
            </View>
        )
    }
}

let styles = {
    container: {
        flex: 1
    },
    imagesWrapperPlayerOne : {
        flex: 4,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'stretch'
    },
    imagePlayerOne: {
        flex: 1,
        resizeMode: 'contain',
        transform: [{rotate: '180deg'}], 
        height: 150
    },
    imagesWrapperPlayerTwo : {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    imagePlayerTwo: {
        flex: 1,
        resizeMode: 'contain',
        height: 150
    }
}


export default gameBoardScreen
