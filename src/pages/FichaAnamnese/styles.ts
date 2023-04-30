import { background } from "native-base/lib/typescript/theme/styled-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
    },
    scroll: {
        flex: 1,
    },
    campostexto: {
        width: '100%',
        marginTop: 5
    },
    containerBotoes: {
        flexDirection: "row",
        justifyContent:"space-between",
        marginLeft: 20,
        marginRight:20
    },
    textGroup: {
        fontSize: 20,
        margin: 8,
        fontWeight: "bold"

    },
    buttom: {
        marginTop: 8
    },
    appBar:{
        backgroundColor: '#f0dbff',
    },
});