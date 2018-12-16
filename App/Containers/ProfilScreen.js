import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, FlatList} from 'react-native'

class ProfilScreen extends Component {

    constructor() {
        super();

        this.state = {
        };

    }


    render () {
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../Themes/Images/pattern.png')}
                    style={{width: '100%', height: '100%'}}
                >
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    }
})


export default ProfilScreen
