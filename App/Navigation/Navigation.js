import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../Containers/MainScreen';
import BoardScreen from "../Containers/BoardScreen";
import gameBoardScreen from "../Containers/GameBoardScreen";


export default MainStack = createStackNavigator({
    Main: {
        screen: MainScreen,
    },
    Board: {
        screen: BoardScreen
    },
    gameBoard: {
        screen: gameBoardScreen
    }
    }, {
        headerMode: 'none',
        initialRouteName: 'Main',
});
