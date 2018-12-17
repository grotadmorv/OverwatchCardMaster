import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, FlatList} from 'react-native'

import { List, ListItem, Avatar } from 'react-native-elements'

class ShopScreen extends Component {

    constructor() {
        super();

        this.state = {
            points: 44
        };

    }


    render () {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Vos points OW : {this.state.points}</Text>
                <List>
                    <ListItem
                        xlargeAvatar
                        title={
                            <Text style={styles.ratingText}>
                                Wallpeper Tracer mobile
                            </Text>
                        }
                        subtitle={
                        <View style={styles.subtitleView}>
                            <Text style={styles.ratingText}>20 points</Text>
                        </View>
                        }
                        avatar={
                            <Avatar
                                xlarge
                                source={require('../Themes/Images/icn.png')}
                            />
                        }
                    />
                </List>
            </View>
        )
    }
}

styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingTop: 5
    },
    ratingText: {
      marginLeft: 30,
      color: 'grey'
    },
    title: {
        textAlign: 'center',
        top: 10,
        fontSize: 26

    }
  })

export default ShopScreen
