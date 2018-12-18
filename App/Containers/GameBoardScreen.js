import React, { Component } from 'react';

import { View, Text, Image, ImageBackground, TouchableOpacity, AsyncStorage, Animated } from 'react-native';

import SoundPlayer from 'react-native-sound-player'

import { Animatable } from '../Themes'

import Storage from 'react-native-storage';

import data from './heroes.json';

const storage = new Storage({
    size: 2000,

    storageBackend: AsyncStorage,

    defaultExpires: null,

    enableCache: true,

});
// global.storage = storage;


class gameBoardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player_one_heroes: [],
            player_two_heroes: [],
            player_one: { hp: 50 },
            player_two: { hp: 50 },
            turn: 1,
            background: "",
            player_one_crit: false,
            player_two_crit: false
        }
    }

    componentDidMount() {
        // console.warn(this.state.player_one_heroes);
    }

    componentWillMount() {
        obj_hero_one = []
        obj_hero_two = []
        for (let i = 0; i < 4; i++) {
            let rand_one = Math.floor(Math.random() * 19) + 0;
            let rand_two = Math.floor(Math.random() * 19) + 0;
            let hero_one = data[rand_one];
            let hero_two = data[rand_two];
            obj_hero_one.push(hero_one);
            obj_hero_two.push(hero_two);
        }
        this.setState({
            player_one_heroes: [...this.state.player_one_heroes, obj_hero_one]
        })
        this.setState({
            player_two_heroes: [...this.state.player_two_heroes, obj_hero_two]
        })
        storage
            .load({
                key: 'dataArena',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                this.setState({background: ret.actualBackgroundArena})
            }).catch(err => {
                if (err.name == 'dataArena') {
                    // this.setState({error: true})
                }
            });
    }

    onAttack(turn, index) {
        if (this.state.turn == turn) {
            try{
                if(Math.floor(Math.random() * 2) + 1 == 1){
                    SoundPlayer.playUrl(index.song_1)
                } else{
                    SoundPlayer.playUrl(index.song_2)
                }
            }catch(e){
                console.warn(`cannot play the sound file`, e)
            }

            rand = Math.floor(Math.random() * 10) + 1;
            if (index.critical_hit - 1 >= rand) {
                critical = 1 + (index.critical_hit / 100);
                attack = Math.ceil(index.attack * critical)
                
            if (this.state.turn == 1) {
                this.setState({player_two_crit: true})
                setTimeout(() => {
                    this.setState({player_two_crit: false})
                }, 1000);
            } else {
                this.setState({player_two_crit: false})
            }

            if (this.state.turn == 2) {
                this.setState({player_one_crit: true})
                setTimeout(() => {
                    this.setState({player_one_crit: false})
                }, 1000);
            } else {
                this.setState({player_one_crit: false})
            }

            } else {
                attack = index.attack
            }
            
            
            if (this.state.turn == 1) {
                if (this.state.player_two.hp - attack <= 0) {
                    hp = 0
                    this.onWin(1)
                } else {
                    hp = this.state.player_two.hp - attack
                }
                this.setState({ player_two: { hp: hp }, turn: 2 })
            } else {
                if (this.state.player_one.hp - attack <= 0) {
                    hp = 0
                    this.onWin(2)
                } else {
                    hp = this.state.player_one.hp - attack
                }
                this.setState({ player_one: { hp: (this.state.player_one.hp - attack) }, turn: 1 })
            }
        }
    }


    loadPlayerData(winner) {
        storage
            .load({
                key: 'dataPlayer',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                let total_won_played = ret.gameWon;
                let total_game_played = ret.gamePlayed += 1
                let total_credit_played = ret.gameCredit;
                
                if(winner){
                    total_won_played += 1
                    total_credit_played += 200
                }

                storage.save({
                    key: 'dataPlayer',
                    data: {
                        gamePlayed: total_game_played,
                        gameWon: total_won_played,
                        gameLastHeroes: this.state.player_one_heroes[0],
                        gameCredit: total_credit_played
                    },

                    expires: null
                });
            })
            .catch(err => {
                let winnerNum = 0
                let creditNum = 0;
                if (winner){
                    winnerNum = 1;
                    creditNum = 200;
                }
                if (err.name == 'NotFoundError') {
                    storage.save({
                        key: 'dataPlayer',
                        data: {
                            gamePlayed: 1,
                            gameWon: winnerNum,
                            gameLastHeroes: this.state.player_one_heroes[0],
                            gameCredit: creditNum
                        },

                        expires: null
                    })
                }
            });
    }

    onWin(winner) {
        // todo animation win
        winner == 1 ? this.loadPlayerData(true) : this.loadPlayerData(false);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={this.state.background ? {uri: this.state.background} : require('../Themes/Images/Background/default.png')}
                    style={{width: '100%', height: '100%'}}
                >
                <View style={styles.imagesWrapperPlayerOne}>
                    { 
                        this.state.player_two_crit == true &&
                        <View style={{position: 'absolute', top: 450, left: 150, zIndex: 9999}}>
                        <Animatable.Image animation='pulse' source={require('../Themes/Images/critical.png')}/>
                        </View>
                    }
                    {
                        this.state.player_one_heroes[0].map((index, key) => {

                            return (
                                <TouchableOpacity onPress={() => this.onAttack(1, index)} style={styles.containerOne} key={{ key }}>
                                    <Image style={styles.imagePlayerOne} source={{ uri: index.image }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View>
                    {
                        this.state.turn == 1 &&
                        <Text style={{ position: 'absolute', transform: [{ rotate: '180deg' }], textShadowColor: '#000000', textShadowOffset: { width: 0, height: 0 },textShadowRadius: 15, left: 145, bottom: 280, fontSize: 30, color: '#FFFFFF', fontFamily: 'big_noodle_titling_oblique'}}>A votre tour</Text>
                    }
                    {
                        this.state.turn == 2 &&
                        <Text style={{position: 'absolute', textShadowColor: '#000000', textShadowOffset: { width: 0, height: 0 },textShadowRadius: 15, left: 145, bottom: 20, color: '#FFFFFF', fontSize: 30, fontFamily: 'big_noodle_titling_oblique'}}>A votre tour</Text>
                    }
                    <Text style={{ position: 'absolute', transform: [{ rotate: '180deg' }], textShadowColor: '#000000', textShadowOffset: { width: 0, height: 0 },textShadowRadius: 15, left: 30, bottom: 290, fontSize: 25, color: '#FFFFFF', fontFamily: 'big_noodle_titling_oblique'}}>
                       PV:  {this.state.player_one.hp}
                    </Text>
                    <Text style={{ position: 'absolute', textShadowColor: '#000000', textShadowOffset: { width: 0, height: 0 },textShadowRadius: 15, right: 30, bottom: 5, fontSize: 25, color: '#FFFFFF', fontFamily: 'big_noodle_titling_oblique'}} >
                        PV:  {this.state.player_two.hp}
                    </Text>
                </View>
                <View style={styles.imagesWrapperPlayerTwo}>
                { 
                        this.state.player_one_crit == true &&
                        <View style={{position: 'absolute', bottom: 450, left: 150, zIndex: 9999}}>
                        <Animatable.Image animation='pulse' source={require('../Themes/Images/critical.png')}/>
                        </View>
                    }
                    {
                        this.state.player_two_heroes[0].map((index, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.onAttack(2, index)} style={styles.containerTwo} key={{ key }}>
                                    <Image key={{ key }} style={styles.imagePlayerTwo} source={{ uri: index.image }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                </ImageBackground>
            </View>
        )
    }
}

let styles = {
    container: {
        flex: 1,
    },
    imagesWrapperPlayerOne: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'stretch'
    },
    imagePlayerOne: {
        transform: [{ rotate: '180deg' }],
        height: 150,
        width: 100,
        resizeMode: 'contain'
    },
    imagesWrapperPlayerTwo: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    imagePlayerTwo: {
        height: 150,
        width: 100,
        resizeMode: 'contain'
    }
}


export default gameBoardScreen
