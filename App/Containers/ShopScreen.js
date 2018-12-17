import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'

import Storage from 'react-native-storage';

import { ListItem, Avatar } from 'react-native-elements';

import RNRestart from 'react-native-restart';

const storage = new Storage({
    size: 2000,

    storageBackend: AsyncStorage,

    defaultExpires: null,

    enableCache: true,

});

global.storage = storage;

class ShopScreen extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            status: false,
            actualCredit: 0,
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
                this.setState({ data: ret })
                this.setState({ actualCredit: ret.gameCredit })
            }).catch(err => {
                if (err.name == 'NotFoundError') {
                    this.setState({ error: true })
                }
            })
    }

    _buy(url) {
        storage
            .load({
                key: 'dataBackground',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                storage.save({
                    key: 'dataBackground',
                    data: {
                        actualBackground: url
                    },
                    expires: null
                })


            }).catch(err => {
                if (err.name == 'NotFoundError') {
                    storage.save({
                        key: 'dataBackground',
                        data: {
                            actualBackground: url
                        },
                        expires: null
                    })
                }
            });
            RNRestart.Restart();
    }

    checkPrice(priceBg, actualMoney) {
        if (priceBg <= actualMoney) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../Themes/Images/pattern.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <ScrollView>
                        <View>
                            <Text style={styles.title}>Vos crédits : {this.state.actualCredit}</Text>
                        </View>
                        {
                            list.map((l, index) => {
                                return (
                                    <ListItem
                                        roundAvatar
                                        key={index}
                                        subtitle={
                                            <Text style={styles.ratingText}>
                                                Crédits requis : {l.price}
                                            </Text>
                                        }
                                        rightIcon={
                                            <View style={styles.subtitleView}>
                                                {
                                                    <TouchableOpacity style={styles.buttonSelect}  onPress={() => this._buy(l.avatar_url)} disabled={this.checkPrice(l.price, this.state.actualCredit)}>
                                                        <Text style={styles.textButton} >GO</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        }
                                        avatar={
                                            <Avatar
                                                xlarge
                                                source={{ uri: l.avatar_url }}
                                            />
                                        }
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingTop: 5
    },
    ratingText: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        textShadowColor: '#336cec',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 7,
        marginLeft: 5
    },
    title: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        fontSize: 25,
        textShadowColor: '#336cec',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 7,
        margin: 5

    },
    buttonSelect: {
        backgroundColor: "rgb(255, 156, 0)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        padding: 7,
        marginRight: 20
    },
    textButton : {
        color: 'white',
        fontFamily: 'futura',
    },
})

const list = [
    {
        name: 'Default',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524307491618553867/background.png",
        subtitle: 'Default',
        price: 0
    },
    {
        name: 'OW Team',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524273510407995392/4db7f9c8fbebc0dce9a51ed0717eb0e8.png",
        subtitle: 'OW Team',
        price: 200
    },
    {
        name: 'Tracer',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524273592536530954/656850.png",
        subtitle: 'Tracer',
        price: 200
    },
    {
        name: 'Ana',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524273947840217089/13591.png",
        subtitle: 'Ana',
        price: 200
    },
    {
        name: 'Widow',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524274085316919296/603714_widowmaker-overwatch-wallpaper.png",
        subtitle: 'Widow',
        price: 300
    },
    {
        name: 'W & T',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524274173854351361/695005_overwatch-android-wallpaper.png",
        subtitle: 'W & T',
        price: 400
    },
    {
        name: 'Junkrat',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524274258424102932/overwatch_junkrat_mako_rutledge_jamison_fawkes_106631_938x1668.png",
        subtitle: 'Junkrat',
        price: 400
    },
    {
        name: 'Genji & Bastion',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524274529275740168/genji-overwatch-genji-shimada-5617.png",
        subtitle: 'Genji & Bastion',
        price: 400
    },
    {
        name: 'Mccree',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524275775713574922/wp1987603.png",
        subtitle: 'Mccree',
        price: 500
    },
    {
        name: 'Genji',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524277369612271626/0052ac83f4926a83c5cf72fa5814a2a4.png",
        subtitle: 'Genji',
        price: 700
    },
    {
        name: 'Rein',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524276046372274203/reinhardt-in-overwatch-ap-1080x1920.png",
        subtitle: 'Rein',
        price: 800
    },
    {
        name: 'Mccree & Genji',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524276481325531137/640689.png",
        subtitle: 'Mccree & Genji',
        price: 800
    },
    {
        name: 'Mercy',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524273457593188365/papers.png",
        subtitle: 'Mercy',
        price: 800
    },
    {
        name: 'Genji',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524273363892568091/genji-overwatch-10k-1e-640x960.png",
        subtitle: 'Genji',
        price: 800
    },
    {
        name: 'Genji Shimada',
        avatar_url: "https://cdn.discordapp.com/attachments/499665539015114772/524278811886616576/overwatch-genji-wallpaper-images-17.png",
        subtitle: 'Genji Shimada',
        price: 1500
    },
]


export default ShopScreen
