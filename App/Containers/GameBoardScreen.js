import React, { Component } from 'react';

import { View, Text, Image, Button, TouchableOpacity } from 'react-native'

import data from './heroes.json'

class gameBoardScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            player_one_heroes: [],
            player_two_heroes: [],
            player_one: {hp : 50},
            player_two: {hp: 50},
            turn: 1
        }
    }

    componentDidMount(){
        // console.warn(this.state.player_one.hp);
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

    onAttack(turn, index){
        if(this.state.turn == turn){
            rand = Math.floor(Math.random() * 10) + 1;
            if(index.critical_hit - 1 >= rand ){
                critical = 1 + (index.critical_hit/100);
                attack = Math.ceil(index.attack * critical)

                // todo animation hit
            }else{
                attack = index.attack
            }

            // todo animation attack
            if(this.state.turn == 1){
                if( this.state.player_two.hp - attack <= 0 ){
                    hp = 0
                    this.onWin(1)
                }else{
                    hp = this.state.player_two.hp - attack
                }
                this.setState({player_two: {hp: hp},  turn: 2})
            }else{
                if(this.state.player_one.hp - attack <= 0){
                    hp = 0
                    this.onWin(2)
                }else{
                    hp = this.state.player_one.hp - attack
                }
                this.setState({player_one: {hp: (this.state.player_one.hp - attack)},  turn: 1}) 
            }
        }
    }

    onWin(winner){
        // todo animation win
        console.warn(winner)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagesWrapperPlayerOne}>
                    {
                        this.state.player_one_heroes[0].map((index, key) => {

                            return(
                                <TouchableOpacity onPress={() => this.onAttack(2,index) }  style={styles.containerOne}  key={{key}}>
                                    <Image style={styles.imagePlayerOne} source={{uri: index.image}}/>
                                </TouchableOpacity>
                        )})
                    }
                </View>
                    <View>
                        <Text style={{marginLeft:100}} >
                            {this.state.turn} {this.state.player_one.hp} {this.state.player_two.hp}
                        </Text>
                    </View>
                <View style={styles.imagesWrapperPlayerTwo}>
                {
                        this.state.player_two_heroes[0].map((index, key) => {
                            return(
                            <TouchableOpacity onPress={() => this.onAttack(1,index)} style={styles.containerTwo}  key={{key}}>
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