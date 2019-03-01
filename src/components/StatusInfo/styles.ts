import { StyleSheet, Dimensions } from 'react-native'
import { Color } from "@common"
const width = Dimensions.get('window').width
const heignt = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: heignt / 10,
        left: width / 20,
        right: width / 20,
        alignItems: 'center'
    },
    textWrap: {
        backgroundColor: 'rgba(60,60,60,0.9)',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 5,
    },
    text: {
        color: Color.white
    }
});