import { StyleSheet, Dimensions } from 'react-native'
import { Color } from "@common"
const width = Dimensions.get('window').width
const heignt = Dimensions.get('window').width

export default StyleSheet.create({
    buttonBg: {
        backgroundColor: '#00AFEF',
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonTxt: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
    },
});