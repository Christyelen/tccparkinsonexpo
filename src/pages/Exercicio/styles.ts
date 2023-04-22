import { StyleSheet } from "react-native";

export const VIDEO_HEIGHT = 180;
export const SCREEN_SPACE = 24;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    player: {
    
        alignItems: "center",
        justifyContent: "center",
        margin: 30
    },
    buttom: {
        flex: 1,
        flexDirection: "column",
        alignItems:"flex-start",
        marginTop: 12,
    },
});