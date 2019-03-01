import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    headerArea: {
        flex: 2,
        backgroundColor: "#2b88d8",
    },
    headerIconArea: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputArea: {
        marginHorizontal: 60,
    },
    headerIcons: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'normal',
    },
    headerIconsTick: {
        color: '#fff',
        marginRight: 5,
        marginTop: 5,
    },
    listNameStyle: {
        color: '#fff',
        fontSize: 12
    },
    contentArea: {
        flex: 6,
        paddingHorizontal: 15,
    },
    listTitle: {
        fontSize: 18,
        color: '#bbbbbb',
        paddingTop: 15,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    ownerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    ownerIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        backgroundColor: '#67d8e6',
    },
    iconTxt: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    listGreyTxt: {
        fontSize: 22,
        color: '#626262',
        marginRight: 15,
    },
    ownerTag: {
        borderWidth: 1,
        borderColor: '#4389c1',
        paddingHorizontal: 15,
        borderRadius: 12,
        paddingVertical: 3,
    },
    ownerTagTxt: {
        fontSize: 12,
        color: '#4389c1',
    },
    invitePeople: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inviteIconBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        backgroundColor: '#2c87d6',
    },
    inviteIcon: {
        fontSize: 22,
        color: '#fff',
    },
    inviteTxt: {
        fontSize: 26,
        color: '#3c89c4',
    },
    dontTxt: {
        color: '#aeaeae',
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
    listOptIcon: {
        color: '#aeaeae',
        marginRight: 20,
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
    listTxt: {
        color: '#464646',
    },
});