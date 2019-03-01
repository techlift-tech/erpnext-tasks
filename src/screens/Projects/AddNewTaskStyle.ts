import { Platform, StyleSheet } from 'react-native'

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
    contentArea: {
        flex: 1,
    },
    iconImg: {
        color: '#fff',
        marginHorizontal: 10,
    },
    topArea: {
        flex: Platform.OS === 'ios' ? 5 : 4,
    },
    listNameStyle: {
        borderColor: '#F9F9F9',
        fontSize: 25,
    },
    pickerStyle: {
        width: '80%',
    },
    footerArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    footerIcons: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerIcon: {
        color: '#7E7E7E',
        fontSize: 25,
    },
    footerCancel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7E7E7E',
    },
    footerAdd: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00AFEF',
    },
});