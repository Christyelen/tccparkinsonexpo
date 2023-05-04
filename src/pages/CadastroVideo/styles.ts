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
        marginTop: 8
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
    campostexto: {
        width: '100%',
        marginTop: 5,
    },
    containerLista: {
        flex: 1,
        padding: 16,
    },
    listAccordion: {
        marginTop: -8,
    },
    selectedItem: {
        backgroundColor: '#f2f2f2',
    },
    listagem:{
        width:'100%'
    }
})