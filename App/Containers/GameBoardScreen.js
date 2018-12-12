import React, { Component } from 'react';

import { View, Text, Image, Button } from 'react-native'

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
        // console.log(this.state.player_two_heroes);
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
                    this.state.player_one_heroes[0].map(function(index){                        
                        <Image style={styles.imagePlayerOne} source={index.image} />
                        // console.log(index)
                    })
                }
                </View>

                <View style={styles.imagesWrapperPlayerTwo}>
                {
                    this.state.player_two_heroes.map(function(index){
                        <Image style={styles.imagePlayertwo} source={{ uri: index.image}} />
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
