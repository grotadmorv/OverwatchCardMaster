import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage, Image} from 'react-native'

import { List, ListItem, Avatar } from 'react-native-elements'

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

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    render () {
        const data = this.props.navigation.state.params.price
        return (
            <View style={styles.container} >
                <Text>{console.log(this.props)}</Text>
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
