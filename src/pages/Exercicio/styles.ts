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
        marginTop: 8
    },
    appBar:{
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
    load: {
        flex: 1,
        justifycontent: "center",
        alignitems: "center"
    }
});