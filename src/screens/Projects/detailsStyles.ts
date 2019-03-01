import { Platform, StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");
const navbarHeight = 80;
export default StyleSheet.create({
    headerArea: {
        backgroundColor: "#768365",
        paddingTop: 0,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerIcons: {
        fontSize: 25,
        marginTop: 5,
        color: '#fff',
        fontWeight: 'normal',
    },
    titleTxt: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'normal',
    },
    bg: {
        width,
        height: height,
        resizeMode: "cover",
        backgroundColor: "#eee",
        position: "absolute"
    },
    navbar: {
        height: navbarHeight,
        backgroundColor: "#588d64",
        paddingTop: 20,
        justifyContent: "center"
    },
    navbarTitle: {
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18
    },
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 10
    },
    btn: {
        alignSelf: "center",
        marginVertical: 20,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: "rgba(88,141,100,0.8)",
        borderRadius: 2
    },
    btnText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "600"
    },
    containers: {
        backgroundColor: "#ffffff",
        borderRadius: 2,
        marginBottom: 1,
        height: 50,
        overflow: "hidden"
    },
    wrap: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row"
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#555",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingTop: 3
    },
    title: {
        color: "#111",
        fontSize: 16,
        backgroundColor: "transparent"
    },
    body: {
        flex: 1,
        justifyContent: "center"
    },
    taskTitle: {
        color: "#111",
        fontSize: 16,
    },
    dateTitle: {
        color: "#555",
        fontSize: 16,
    },
    checked: {
        textDecorationLine: "line-through",
        color: "#555"
    },
    btns: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    swipeBtns: {
        top: 3,
        borderRadius: 3,
        alignSelf: "flex-end",
        flexDirection: "row",
        overflow: "hidden"
    },
    swipeBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    deleteBtn: {
        backgroundColor: "#ee3229"
    },
    editBtn: {
        backgroundColor: "#0f85d9"
    },
    swipeIcon: {
        fontSize: 24,
        color: "white"
    },
    ProjListTogal: {
        display: 'none'
    }
});