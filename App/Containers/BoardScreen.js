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
                    source={require('../Themes/Images/tracer.png')}
                    style={{width: '100%', height: '100%'}}
                >
                <View style={styles.container}>
                    <FlatList
                        data={[
                            {key: 'Jouer', url: 'gameBoard'},
                            {key: 'Mon profile',  url: 'myProfil'},
                            {key: 'Profile Overwatch', url: 'profil'},
                            {key: 'Boutique', url: 'shop'},
                        ]}
                        renderItem={({item}) => <Text onPress={() => this._navigateTo(item.url)} style={styles.item}>{item.key}</Text>}
                    />
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})


export default withNavigation(BoardScreen)
