import { StyleSheet } from "react-native";

export const VIDEO_HEIGHT = 180;
export const SCREEN_SPACE = 24;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
    },
    buttom: {
        marginTop: 8,
        backgroundColor: "#54abf7"
    },
    buttomAdm: {
        marginTop: 8,
        borderColor: "#54abf7"
    },
    appBar: {
        backgroundColor: '#f0dbff',
    },
    scroll: {
        flex: 1,
    },
    player: {

        alignItems: "center",
        justifyContent: "center",
        margin: 30
    },
    loadingContainer: {
        position: 'relative',
        borderRadius: 10,
        padding: 10,
        color: "#663399"
    },
    containerBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20
    },
});