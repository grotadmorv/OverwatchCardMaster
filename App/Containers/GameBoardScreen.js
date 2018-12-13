import React, { Component } from 'react';

import { View, Text, Image, Button, TouchableOpacity } from 'react-native'

import data from './heroes.json'

class gameBoardScreen extends Component {

    constructor(){
        super()
        this.state = {
            player_one_heroes: [],
            player_two_heroes: []
        }
        
    }

    componentDidMount(){
        // console.log(this.state.player_one_heroes);
    }

    componentWillMount(){
        obj_hero_one = []
        obj_hero_two = []
        for(let i = 0 ; i < 4 ; i++){
            let rand_one = Math.floor(Math.random() * 19) + 0 ;
            let rand_two = Math.floor(Math.random() * 19) + 0 ;
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagesWrapperPlayerOne}>
                    {
                        this.state.player_one_heroes[0].map(function(index, key) {
                            return(
                                <TouchableOpacity onPress={() => console.warn(key) }  style={styles.containerOne}  key={{key}}>
                                    <Image style={styles.imagePlayerOne} source={{uri: index.image}}/>
                                </TouchableOpacity>
                        )})
                    }
                </View>

                <View style={styles.imagesWrapperPlayerTwo}>
                {
                        this.state.player_two_heroes[0].map(function(index, key) {
                            return(
                            <TouchableOpacity style={styles.containerTwo}  key={{key}}>
                                <Image key={{key}} style={styles.imagePlayerTwo} source={{uri: index.image}}/>
                            </TouchableOpacity>
                        )})
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
    imagesWrapperPlayerOne : {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'stretch'
    },
    imagePlayerOne: {
        transform: [{rotate: '180deg'}], 
        height: 150,
        width:90,
        resizeMode: 'contain'
    },
    imagesWrapperPlayerTwo : {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    imagePlayerTwo: {
        height: 150,
        width:90,
        resizeMode: 'contain'
    }
}


export default gameBoardScreen
