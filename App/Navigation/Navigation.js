import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../Containers/MainScreen';


export default MainStack = createStackNavigator({
    Main: {
        screen: MainScreen,
    }
    }, {
        headerMode: 'none',
        initialRouteName: 'Main',
});
