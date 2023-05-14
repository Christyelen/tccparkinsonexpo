import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, ScrollView, View, useWindowDimensions } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { SCREEN_SPACE, VIDEO_HEIGHT, styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import * as ScreenOrientation from 'expo-screen-orientation';
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import moment from 'moment';

const Exercicio = (props) => {

    const { width } = useWindowDimensions();
    const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);
    const navigation = useNavigation<propsStack>();

    const [videoReady, setVideoReady] = useState(false);
    const [videoAtual, setVideoAtual] = useState(1);
    const [idVideo, setIdVideo] = useState(''); //fazer o metodo p trocar o id do video e nao ficar renderizando novos youtube players
    const [isPlaying, setIsPlaying] = useState(false);
    const [contemErro, setContemErro] = useState(false);
    const [iniciouExercicio, setIniciouExercicio] = useState(false);
    const [fimExercicio, setFimExercicio] = useState(false);
    const [dataHoraInicial, setDataHoraInicial] = useState(new Date);

    useEffect(() => {
        definirVideo();
        validarCadastro();
    }, []);

    const addOfensiva = () => {
        const dataExercicioRealizado = moment();
        addDoc(collection(FIRESTORE_DB, 'ofensiva'), { dataExercicioRealizado: dataExercicioRealizado.format('DD/MM/YYYY') });
        console.log('Passou valor Ofensiva')
    }

    const realizarContagemTempo = () => {
        //regra p contabilizar o tempo do exercicio\
    }

    const validarCadastro = () => {
        if (props.route.params.idVideo1 == null ||
            props.route.params.idVideo2 == null ||
            props.route.params.idVideo03 == null){
                setContemErro(true);
            }
    }

    const definirVideo = () => {
        console.log("Definir video: " + videoAtual)
        switch (videoAtual) {
            case 1:
                if (props.route.params.idVideo1 != null) {
                    setIdVideo(props.route.params.idVideo1);
                    setVideoAtual(videoAtual + 1);

                }
                else {
                    console.log('nao tem');
                    setIdVideo('');
                }
                break;
            case 2:
                if (props.route.params.idVideo2 != null) {
                    setIdVideo(props.route.params.idVideo2);
                    setVideoAtual(videoAtual + 1);

                }
                else {
                    setIdVideo('');
                    console.log('nao tem');
                }
                break;
            case 3:
                if (props.route.params.idVideo03 != null) {
                    setIdVideo(props.route.params.idVideo03);
                    setVideoAtual(videoAtual + 1);
                }
                else {
                    setIdVideo('');
                    console.log('nao tem');
                }
                break;
            default:
                break;
        }
        console.log("Soma do video: " + videoAtual)
        console.log("id video: " + idVideo)
    }

    const proximoExercicio = () => {
        console.log("proximo exercicio");
        setIdVideo('');
        setTimeout(() => {
            definirVideo();
        }, 500);
    }

    const finalizarExercicio = () => {
        console.log("fim exercicio");
        setIsPlaying(false);
        setFimExercicio(true);
        realizarContagemTempo();
        addOfensiva();
    }

    const onChangeState = useCallback((state) => {
        if (state === PLAYER_STATES.ENDED) {
            //video deveria ficar em looping mas so passa 2x
        }
        else if (state === PLAYER_STATES.PLAYING) {
            setDataHoraInicial(new Date);
            setIniciouExercicio(true);
            console.log("Passou no playing")
        }
        else if (state === PLAYER_STATES.PAUSED) {
            console.log("Passou no pause")
        }
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
                        <Button icon="flag-checkered" mode="contained" style={styles.buttom} onPress={() => navigation.navigate('Ofensiva')}>
                            Ofensiva Diária
                        </Button>
                    </View>
                    <View style={styles.container}>
                        {!fimExercicio && !contemErro && <View style={styles.player}>
                            <YoutubePlayer
                                height={videoReady ? VIDEO_HEIGHT + 20 : 0}
                                width={VIDEO_WIDTH}
                                play={isPlaying}
                                videoId={idVideo}
                                onChangeState={onChangeState}
                                onReady={() => setVideoReady(true)}
                                onFullScreenChange={onFullScreenChange}
                            />
                        </View>}
                        <View>
                        {contemErro && <Text>Alerta: Exercicio não cadastrado corretamente. contate o administrador do sistema</Text>}
                            {!videoReady && !fimExercicio && !contemErro && <ActivityIndicator style={styles.loadingContainer} />}
                            {!fimExercicio && videoAtual <= 3 && !contemErro &&
                                <Button onPress={proximoExercicio} style={styles.buttom} mode="contained" icon="arrow-right-circle-outline">
                                    Próximo exercicio
                                </Button>}
                            {!fimExercicio && videoAtual > 3 && !contemErro &&
                                <Button onPress={finalizarExercicio} style={styles.buttom} mode="contained" icon="check">
                                    Finalizar exercicios
                                </Button>}

                            {fimExercicio && !contemErro &&
                                <Text>
                                    Você finalizou seus exercicios diários! Parabéns! Veja sua evolução na página de ofensiva diária.
                                </Text>}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default Exercicio;