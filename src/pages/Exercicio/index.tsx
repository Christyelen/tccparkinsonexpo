import React, { useState, useCallback, useEffect } from "react";
import { Button, View, Alert, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { SCREEN_SPACE, VIDEO_HEIGHT, styles } from "./styles";
import * as ScreenOrientation from 'expo-screen-orientation';
//import moment from 'moment';


const Exercicio = () => {

    const params = useRoute()
    //console.log("params exercicio: "+ params.params.idVideo1)
    const [playing, setPlaying] = useState(false);
    const navigation = useNavigation<propsStack>();
    const [videoReady, setVideoReady] = useState(false);
    const { width } = useWindowDimensions();
    const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);
    let [isCounting, setIsCounting] = useState(false);
    let [dataFinal, setDataFinal] = useState(new Date());
    let [dataInicial, setDataInicial] = useState(new Date());
    let duracao;

    const inicioExercicio = () => {
        setDataInicial(new Date());
        console.log("setou data inicial + " + dataInicial.toLocaleString())
    };

    const fimExercicio = () => {
        setDataFinal(new Date())
        console.log("setou data final + " + dataFinal.toLocaleString());
        //const diff = moment(dataFinal).diff(moment(dataInicial), 'days');
        duracao = "oi";
        setPlaying(false);
        setVideoReady(false);
        setIsCounting(false);
    }

    const onChangeState = useCallback((state) => {
        if (state === PLAYER_STATES.ENDED) {
            //video deveria ficar em looping mas so passa 2x
            togglePlaying();
        }
        else if (state === PLAYER_STATES.PLAYING) {
            console.log("antes do if:" + isCounting);
            if (!isCounting) {
                inicioExercicio();
                setIsCounting(true);
                console.log("dentro do if:" + isCounting);
            }
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying(true);
    }, []);

    const onFullScreenChange = useCallback((isfullscreen: boolean) => {
        if (isfullscreen) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                <YoutubePlayer
                    height={videoReady ? VIDEO_HEIGHT + 20 : 0}
                    width={VIDEO_WIDTH}
                    play={playing}
                    videoId={"iee2TATGMyI"}
                    onChangeState={onChangeState}
                    onReady={() => setVideoReady(true)}
                    onFullScreenChange={onFullScreenChange}
                />
            </View>
            <View style={styles.buttom}>
                {!videoReady && <ActivityIndicator color="red" />}
                <Text>
                    Tempo para realizar o exercicio: {duracao}
                </Text>
                {isCounting && (<Button title="Finalizar exercicio" onPress={fimExercicio} />)}

                <TouchableOpacity
                    style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                    onPress={() => navigation.navigate("Ofensiva")}>
                    <Text>Ofensiva Diária</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                    onPress={() => navigation.goBack()}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Exercicio