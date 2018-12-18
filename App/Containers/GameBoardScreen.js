import React, { Component } from 'react';

import { View, Text, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native';

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
            all_hero: [{name: "tracer", win: 0},{name: "winston", win: 0},{name: "pharah", win: 0},{name: "reinhardt", win: 0},{name: "symmetra", win: 0},{name: "reaper", win: 0},{name: "mccree", win: 0},{name: "mercy", win: 0},{name: "mei", win: 0},{name: "roadhog", win: 0},{name: "junkrat", win: 0},{name: "hanzo", win: 0},{name: "window", win: 0},{name: "zenyatta", win: 0},{name: "bastion", win: 0},{name: "zarya", win: 0},{name: "lucio", win: 0},{name: "dva", win: 0},{name: "soldier_76", win: 0},{name: "genji", win: 0}]
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
    }

    onAttack(turn, index) {
        if (this.state.turn == turn) {
            rand = Math.floor(Math.random() * 10) + 1;
            if (index.critical_hit - 1 >= rand) {
                critical = 1 + (index.critical_hit / 100);
                attack = Math.ceil(index.attack * critical)

                // todo animation hit
            } else {
                attack = index.attack
            }

            // todo animation attack
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
                <View style={styles.imagesWrapperPlayerOne}>
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
                        <Text style={{ position: 'absolute', left: 60, bottom: 250}}>A votre tour</Text>
                    }
                    {
                        this.state.turn == 2 &&
                        <Text>A votre tour</Text>
                    }
                    <Text style={{ position: 'absolute', left: 30, bottom: 300 }}>
                       PV:  {this.state.player_one.hp}
                    </Text>
                    <Text style={{ position: 'absolute', right: 30 }} >
                        PV:  {this.state.player_two.hp}
                    </Text>
                </View>
                <View style={styles.imagesWrapperPlayerTwo}>

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
            </View>
        )
    }
}

let styles = {
    container: {
        flex: 1
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
        width: 90,
        resizeMode: 'contain'
    },
    imagesWrapperPlayerTwo: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    imagePlayerTwo: {
        height: 150,
        width: 90,
        resizeMode: 'contain'
    }
}


export default gameBoardScreen
