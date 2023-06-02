import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import ViewShot from 'react-native-view-shot';
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";

const Ofensiva = (props) => {
    const navigation = useNavigation<propsStack>()
    const [listaOfensivas, setlistaOfensivas] = useState([]);
    const [listaOfensivasData, setlistaOfensivasData] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState(0);
    const [diaAtualContado, setDiaAtualContado] = useState(false);
    const viewShotRef = useRef(null);
    const auth = getAuth();

    useEffect(() => {
        buscarOfensivas();
    }, []);

    useEffect(() => {
        ordenarListaDatas()
    }, [listaOfensivas]);

    useEffect(() => {
        calcularDiasDeOfensiva()
    }, [listaOfensivas]);


    const buscarOfensivas = async () => {
        try {
            const ofensivasRef = await collection(FIRESTORE_DB, 'ofensiva');
            const subscriber = onSnapshot(ofensivasRef, {
                next: (snapshot) => {
                    const ofensivas: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        ofensivas.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaOfensivas(ofensivas)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const ordenarListaDatas = () => {
        listaOfensivas.filter(ofensiva => ofensiva.usuario == auth.currentUser.uid).map(item => {
            listaOfensivasData.push(item.dataExercicioRealizado)
        });
        listaOfensivasData.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);

            if (dateA < dateB) {
                return 1;
            }

            if (dateA > dateB) {
                return -1;
            }

            return 0;
        });
        setlistaOfensivasData(listaOfensivasData);
    }

    const calcularDiasDeOfensiva = async () => {
        console.log("entrou calcular dias")
        let diaAtualContado = false;
        let contadorDiasConsecutivos = 0;
        let ultimoDocumentoData = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');

        for (let index = 0; index < listaOfensivasData.length; index++) {
            const dataOfensiva = moment(listaOfensivasData[index], 'YYYY-MM-DD');

            if (ultimoDocumentoData.diff(dataOfensiva, 'days') === 1) {
                contadorDiasConsecutivos = contadorDiasConsecutivos + 1;
                ultimoDocumentoData = dataOfensiva;
                diaAtualContado = false;
                continue;
            }

            if (ultimoDocumentoData.diff(dataOfensiva, 'days') === 0 && !diaAtualContado) {
                contadorDiasConsecutivos = contadorDiasConsecutivos + 1;
                console.log(!diaAtualContado)
                diaAtualContado = true;
            }
        }
        setDiasOfensiva(contadorDiasConsecutivos);
    }

    const handleShare = async () => {

        try {
            if (viewShotRef.current) {
                try {
                    const uri = await viewShotRef.current.capture();
                    const result = await Share.share({
                        message: `Estou realizando exercicios diariamente há ${diasOfensiva} dias!`,
                        url: `file://${uri}`, //não funciona whatsapp

                    });
                    if (result.action === Share.sharedAction) {
                        console.log('Conteúdo compartilhado com sucesso!');
                    } else if (result.action === Share.dismissedAction) {
                        console.log('O compartilhamento foi cancelado.');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    let markedDay = {};
    for (let index = 0; index < listaOfensivas.length; index++) {
        if (auth.currentUser.uid == listaOfensivas[index].usuario){
            markedDay[listaOfensivas[index].dataExercicioRealizado] = {
                selected: true,
                marked: true,
                selectedColor: "#54abf7",
            };
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, paddingTop:40, backgroundColor: '#ebf6fa', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" textColor="#54abf7" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                        <Button onPress={handleShare} style={styles.buttom} textColor="#54abf7"  mode="outlined"
                            icon={'share-variant'} >Compartilhar
                        </Button>
                    </View>
                    <ViewShot ref={viewShotRef} style={{ flex: 1, backgroundColor: '#ebf6fa' }}>
                        <View style={styles.container}>
                            <Calendar style={{ borderRadius: 10, elevation: 4, margin: 40 }} onDayPress={date => {
                                console.log(date);
                            }}
                                initialDate={moment().format('YYYY-MM-DD')}
                                minDate={'2020-01-01'}
                                hideExtraDays={true}
                                markedDates={markedDay}
                            />
                            <Text style={styles.textGroup}>Você está há {diasOfensiva} dias realizando exercicios diariamente, parabéns!</Text>
                        </View>
                    </ViewShot>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

export default Ofensiva

