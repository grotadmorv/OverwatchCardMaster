import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native'

import Storage from 'react-native-storage';

const storage = new Storage({
    size: 2000,

    storageBackend: AsyncStorage,

    defaultExpires: null,

    enableCache: true,

});

class ProfilScreen extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            heroes: [],
            error: false
        };

    }

    componentWillMount() {
        storage
            .load({
                key: 'dataPlayer',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                this.setState({data: ret})
                this.setState({heroes: ret.gameLastHeroes})
            }).catch(err => {
                if (err.name == 'NotFoundError') {
                    this.setState({error: true})
                }
            });
    }

    render() {
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../Themes/Images/pattern.png')}
                    style={{ width: '100%', height: '100%' }}>
                    <View>
                        <View>
                            <Text style={styles.centerTextName}>
                                MON PROFIL
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.centerText}>
                                Nombre de parties jouées : {this.state.error ? 'Pas de données' : this.state.data.gamePlayed}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.centerText}>
                                Nombre de parties gagnées : {this.state.error ? 'Pas de données' : this.state.data.gameWon}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.centerText}>
                                Nombre de crédits : {this.state.error ? 'Pas de données' : this.state.data.gameCredit}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <View>
                            <Text style={styles.centerText}>
                                Meilleurs personnages
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', alignItems: 'stretch' }} >
                            {
                                this.state.heroes.map((index, key) => {
                                    return (
                                        <TouchableOpacity key={{ key }} style={{margin: 5}} >
                                            <Image style={styles.icon} source={{uri: this.state.error === false ? index.icon : "https://www.ikeraguirre.com/wp-content/uploads/sites/2/2016/10/image-transparente.png" }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    centerTextName: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        fontSize: 25,
        textShadowColor: '#336cec',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 7,
        margin: 5
    },
    centerText: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        fontSize: 20,
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        margin: 5
    },
    icon: {
        width: 50,
        height: 50
    }
})


export default ProfilScreen
