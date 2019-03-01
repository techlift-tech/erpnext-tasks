import { StyleSheet, Platform } from 'react-native'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    headerArea: {
        backgroundColor: "#768365",
        paddingTop: 0,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleTxt: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'normal',
    },
    headerIcons: {
        fontSize: 25,
        marginTop: 5,
        color: '#fff',
        fontWeight: 'normal',
    },
    listIcons: {
        fontSize: 22,
        color: '#b3b2c5',
    },
    assignedIcons: {
        color: '#d9c993',
    },
    listTxt: {
        color: '#464646',
    },
    contentArea: {
        flex: 1,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});