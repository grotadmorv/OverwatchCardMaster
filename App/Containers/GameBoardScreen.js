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

    componentWillMount(){

    }

    shuffleHeroes(){
        for(let i = 0 ; i < 4 ; i++){
            console.log("here")
            let rand = Math.floor(Math.random() * 19) + 0 ;
            let hero = data[rand];
            this.setState({
                player_one_heroes: [...this.state.player_one_heroes, hero]
              })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagesWrapperPlayerOne}>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                </View>

                <View style={styles.imagesWrapperPlayerTwo}>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
                    <Image style={styles.imagePlayerTwo} source={require('../Themes/Images/Heroes/symmetra.png')}/>
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
