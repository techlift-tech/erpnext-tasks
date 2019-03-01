import { StyleSheet, Platform } from 'react-native'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    headerArea: {
        backgroundColor: "#768365",
        paddingTop: 0,
        height: Platform.OS === 'ios' ? 40 : 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#65d9e8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    userIconTxt: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
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
    listContain: {
        height: 50,
    },
    listBody: {
        fontSize: 22,
        fontWeight: 'normal',
        borderBottomWidth: 0,
        color: '#3f3f3f',
    },
    listCount: {
        fontSize: 22,
        paddingTop: 5,
        fontWeight: 'normal',
        borderBottomWidth: 0,
        color: '#3f3f3f',
    },
    listIcons: {
        fontSize: 22,
        color: '#b3b2c5',
    },
    assignedIcons: {
        color: '#d9c993',
    },
    todayIcons: {
        color: '#abb374',
    },
    createListIcons: {
        color: '#6b92d7',
    },
    createlistBody: {
        color: '#6b92d7',
    },
    addNewBtn: {
        width: 50,
        height: 50,
        backgroundColor: '#6b92d7',
        borderRadius: 30,
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    addIcon: {
        color: '#ffffff',
    },
    listTxt: {
        color: '#464646',
    },
});