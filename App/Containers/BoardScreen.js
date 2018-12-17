import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, FlatList, AsyncStorage} from 'react-native'
import { withNavigation } from 'react-navigation'

import Storage from 'react-native-storage';

const storage = new Storage({
    size: 2000,

    storageBackend: AsyncStorage,

    defaultExpires: null,

    enableCache: true,

});



class BoardScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo(pageName) {
        this.props.navigation.navigate(pageName)
    }

    componentWillMount() {
        storage
            .load({
                key: 'dataBackground',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                this.setState({data: ret})
            }).catch(err => {
                if (err.name == 'NotFoundError') {
                    this.setState({error: true})
                }
            });
        }

    render () {
        return (
            <View>
                <ImageBackground
                    source={this.state.data.actualBackground ? {uri: this.state.data.actualBackground} : require('../Themes/Images/background.png')}
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
                            {key: 'MON PROFIL',  url: 'myProfil'},
                            {key: 'PROFIL OVERWATCH', url: 'myProfilOverwatch'},
                            {key: 'BOUTIQUE', url: 'shop'},
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
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
    },
    item: {
        color: '#f3c026',
        padding: 8,
        fontSize: 50,
        textShadowColor: '#bb7e29',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        fontFamily: 'big_noodle_titling_oblique',
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
    },
    itemSecond: {
        fontFamily: 'futura',
        color: 'white',
        fontSize: 25,
        padding: 8,
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
    }
})


export default withNavigation(BoardScreen)
