import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage} from 'react-native'

import Storage from 'react-native-storage';

import { List, ListItem, Avatar, Button } from 'react-native-elements'

const storage = new Storage({
    size: 2000,

    storageBackend: AsyncStorage,

    defaultExpires: null,

    enableCache: true,

});

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  ]

class ShopScreen extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            price: 250,
            status: false
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
        }).catch(err => {
            if (err.name == 'NotFoundError') {
                this.setState({error: true})
            }
        });
    }

    _buy(url) {
        storage.save({
            key: 'dataBackground',
            data: {
                background: url,
                status: true
            },
            expires: null
        })
        storage
        .load({
            key: 'dataPlayer',
            autoSync: true,
            syncInBackground: true,
        })
        .then(ret => {
            storage.save({
                key: 'dataPlayer',
                data: {
                    gamePlayed: ret.gamePlayed,
                    gameWon: ret.gameWon,
                    gameLastHeroes: ret.gameLastHeroes,
                    gameCredit: this.state.data.gameCredit - this.state.price
                },
                expires: null
            })
            this.setState({status: true})
        }).catch(err => {
            if (err.name == 'NotFoundError') {
                this.setState({error: true})
            }
        });

    }

    render () {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Vos points OW : {this.state.data.gameCredit}</Text>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        list.map((l) => (
                        <ListItem
                            roundAvatar
                            key={l.name}
                            subtitle={
                                <Text style={styles.ratingText}>
                                    Wallpeper Tracer mobile
                                </Text>
                            }
                            rightIcon={
                                    <View style={styles.subtitleView}>
                                        <Button onPress={(index) => this._buy(l.avatar_url)} title={'Buy ' + this.state.price}/>
                                    </View>
                            }
                            avatar={
                                <Avatar
                                    xlarge
                                    source={{ uri: l.avatar_url}}
                                />
                            }
                        />
                        ))
                    }
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
      color: 'grey',
    },
    title: {
        textAlign: 'center',
        top: 30,
        fontSize: 26

    }
  })

export default ShopScreen
