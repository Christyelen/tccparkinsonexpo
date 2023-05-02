import React, { useState, useCallback, useEffect } from "react";
import { View, Alert, ActivityIndicator, useWindowDimensions, SafeAreaView, ScrollView } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { SCREEN_SPACE, VIDEO_HEIGHT, styles } from "./styles";
import * as ScreenOrientation from 'expo-screen-orientation';
import moment from 'moment';
import { Appbar, Button, Text } from "react-native-paper";


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
        const diff = moment(dataFinal).diff(moment(dataInicial), 'minutes');
        duracao = diff;
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
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                        <Button icon="flag-checkered" mode="contained" style={styles.buttom}>
                            Ofensiva Diária
                        </Button>
                    </View>
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
                        <View>
                            {!videoReady && <ActivityIndicator style={styles.load} color="red" />}
                            <Text>
                                {'Tempo para realizar o exercicio:' + duracao}
                            </Text>
                            {isCounting && 
                                <Button onPress={fimExercicio} style={styles.buttom} mode="contained" icon="check">
                                    Finalizar exercicios
                                </Button>}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default Exercicio