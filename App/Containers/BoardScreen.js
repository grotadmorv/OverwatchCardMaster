import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, FlatList} from 'react-native'
import { withNavigation } from 'react-navigation'

class BoardScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo(pageName) {
        this.props.navigation.navigate(pageName)
    }

    render () {
        return (
            <View>
                <ImageBackground
                    source={require('../Themes/Images/background.png')}
                    style={{width: '100%', height: '100%'}}
                >
                <View style={styles.container}>
                    <FlatList
                        data={[
                            {key: 'Jouer', url: 'gameBoard'}
                        ]}
                        renderItem={({item}) => <Text onPress={() => this._navigateTo(item.url)} style={styles.item}>{item.key}</Text>}
                    />
                    <FlatList
                        data={[
                            {key: 'Mon profil',  url: 'myProfil'},
                            {key: 'Profil Overwatch', url: 'myProfilOverwatch'},
                            {key: 'Boutique', url: 'shop'},
                        ]}
                        renderItem={({item}) => <Text onPress={() => this._navigateTo(item.url)} style={styles.itemSecond}>{item.key}</Text>}
                    />
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: 22,
    },
    item: {
        color: '#f3c026',
        padding: 8,
        fontSize: 50,
        textShadowColor: '#bb7e29',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        fontFamily: 'big_noodle_titling_oblique'
    },
    itemSecond: {
        fontFamily: 'futura',
        color: 'white',
        fontSize: 25,
        padding: 8,
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
    }
})


export default withNavigation(BoardScreen)
