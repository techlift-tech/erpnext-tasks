import { StyleSheet, Dimensions } from 'react-native'
import { Color } from "@common"
const width = Dimensions.get('window').width

export default StyleSheet.create({
    connectionStatus: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: Color.error,
        alignItems: 'center'
    },
    connectionText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
    }
});