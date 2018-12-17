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

global.storage = storage;

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
      price: 100
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      price: 800
    },
  ]

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
            this.setState({data: ret})
            this.setState({actualCredit: ret.gameCredit})
        }).catch(err => {
            if (err.name == 'NotFoundError') {
                this.setState({error: true})
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
    }

    checkPrice(priceBg, actualMoney){
        if(priceBg <= actualMoney){
            return false;
        }else{
            return true;
        }
    }

    render () {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Vos points OW : {this.state.actualCredit}</Text>
                    {
                        list.map((l, index) => {
                            return(
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
                                            <Button style={styles.buttonSelect} onPress={() => this._buy(l.avatar_url)} disabled={this.checkPrice(l.price, this.state.actualCredit)}  
                                            title={'Go'}/> 
                                        }  
                                    </View>
                            }
                            avatar={
                                <Avatar
                                    xlarge
                                    source={{ uri: l.avatar_url}}
                                />
                            }
                        />
                            )
                        })
                    }
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
      color: 'grey',
    },
    title: {
        textAlign: 'center',
        top: 30,
        fontSize: 26

    },
    buttonSelect: {
        // width: 50
    }
  })

export default ShopScreen
