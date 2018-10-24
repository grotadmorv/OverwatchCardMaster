import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 10
    },
    logo: {
        height: Metrics.images.logo,
        width: Metrics.images.logo,
        resizeMode: 'contain'
    },
    welcome: {
        alignItems: 'center',
        flex: 7,
        padding: 5,
        backgroundColor: Colors.snow,
    },
    line: {
        ...Fonts.style.h5,
        color: Colors.white,
        textAlign: 'center'
    },
    actions: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    action: {
        flex: 1,
        flexDirection: 'column'
    },
})
