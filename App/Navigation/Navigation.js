import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../Containers/MainScreen';
import BoardScreen from "../Containers/BoardScreen";
import gameBoardScreen from "../Containers/GameBoardScreen";
import ProfilScreen from "../Containers/ProfilScreen";
import ProfilOverwatchScreen from "../Containers/ProfilOverwatchScreen";
import ShopScreen from "../Containers/ShopScreen";
import shopConfirmScreen from "../Containers/shopConfirmScreen"


export default MainStack = createStackNavigator({
    Main: {
        screen: MainScreen,
    },
    Board: {
        screen: BoardScreen
    },
    myProfil: {
        screen: ProfilScreen
    },
    myProfilOverwatch: {
        screen: ProfilOverwatchScreen
    },
    gameBoard: {
        screen: gameBoardScreen
    },
    shop: {
        screen: ShopScreen,
    },
    shopConfirm: {
        screen: shopConfirmScreen
    }
    }, {
        headerMode: 'none',
        initialRouteName: 'Main',
});
