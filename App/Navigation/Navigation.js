import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../Containers/MainScreen';
import BoardScreen from "../Containers/BoardScreen";


export default MainStack = createStackNavigator({
    Main: {
        screen: MainScreen,
    },
    Board: {
        screen: BoardScreen
    }
    }, {
        headerMode: 'none',
        initialRouteName: 'Main',
});
