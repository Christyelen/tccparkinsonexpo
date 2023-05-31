import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center"
    },
    buttom: {
        marginTop: 50,
        height: 60,
        width: '100%'
    },
    appBar: {
        backgroundColor: '#f0dbff',
    },
    scroll: {
        flex: 1,
    },
    textButton: {
        fontSize: 30,
        padding: 15,
        width: '100%'
    },
    textGroup: {
        fontSize: 20,
        margin: 8,
        fontWeight: "bold",
        color: '#663399'
    },
    containerBotoes: {
        flexDirection: "row",
        justifyContent:"space-between",
        marginLeft: 20,
        marginRight:20
    },
    buttomAdm: {
        marginTop: 8
    },
})