import React, { useState, useCallback } from "react";
import { View, useWindowDimensions, SafeAreaView, ScrollView } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { SCREEN_SPACE, VIDEO_HEIGHT, styles } from "./styles";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";



const Exercicio = (props) => {

    const navigation = useNavigation<propsStack>();

    const { width } = useWindowDimensions();
    const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);

    const [playing, setPlaying] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(1);
    const [fimExercicios, setfimExercicios] = useState(false);
    const [ofensiva, setOfensiva] = useState('');
    const [dataExercicio, setDataExercicio] = useState('');

    let duracao;

    const inicioExercicio = () => {
        // setDataInicial(new Date());
    };

    const ProximoExercicio = () => {
        setPlaying(false);
        setVideoReady(false);
        setIsCounting(false);
        handleVideoEnd();
    }

    const fimExercicio = () => {
        setVideoReady(false);
        setIsCounting(false);
        setfimExercicios(true);
        setPlaying(false);
        setDataExercicio('05/08/2023') //não setou a data mas passou corretamente no processo
        addOfensiva();
    }

    const addOfensiva = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'ofensiva'), {
            dataExercicioRealizado: dataExercicio,
        });
        setOfensiva('');
        console.log('Passou salvar ofensiva')
    }


    const handleVideoEnd = () => {
        setCurrentVideo((currentVideo + 1) != 4 ? currentVideo + 1 : 4);
    };

    const onChangeState = useCallback((state) => {
        if (state === PLAYER_STATES.ENDED) {
            //video deveria ficar em looping mas so passa 2x
            togglePlaying();
        }
        else if (state === PLAYER_STATES.PLAYING) {
            if (!isCounting) {
                inicioExercicio();
                setIsCounting(true);
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
                        <Button icon="flag-checkered" mode="contained" style={styles.buttom} onPress={() => navigation.navigate('Ofensiva')}>
                            Ofensiva Diária
                        </Button>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.player}>
                            {currentVideo == 1 && <YoutubePlayer
                                height={videoReady ? VIDEO_HEIGHT + 20 : 0}
                                width={VIDEO_WIDTH}
                                play={playing}
                                videoId={props.route.params.idVideo1}
                                onChangeState={onChangeState}
                                onReady={() => setVideoReady(true)}
                                onFullScreenChange={onFullScreenChange}
                            />}
                        </View>
                        <View style={styles.player}>
                            {currentVideo == 2 && <YoutubePlayer
                                height={videoReady ? VIDEO_HEIGHT + 20 : 0}
                                width={VIDEO_WIDTH}
                                play={playing}
                                videoId={props.route.params.idVideo2}
                                onChangeState={onChangeState}
                                onReady={() => setVideoReady(true)}
                                onFullScreenChange={onFullScreenChange}
                            />}
                        </View>
                        <View style={styles.player}>
                            {currentVideo == 3 && <YoutubePlayer
                                height={videoReady ? VIDEO_HEIGHT + 20 : 0}
                                width={VIDEO_WIDTH}
                                play={playing}
                                videoId={props.route.params.idVideo03}
                                onChangeState={onChangeState}
                                onReady={() => setVideoReady(true)}
                                onFullScreenChange={onFullScreenChange}
                            />}
                        </View>
                        <View>
                            {!videoReady && !fimExercicios && <ActivityIndicator style={styles.loadingContainer} />}
                            <Text>
                                {'Tempo para realizar o exercicio:' + duracao}
                            </Text>
                            {isCounting && currentVideo != 3 &&
                                <Button onPress={ProximoExercicio} style={styles.buttom} mode="contained" icon="arrow-right-circle-outline">
                                    Próximo exercicio
                                </Button>}
                            {isCounting && currentVideo == 3 &&
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