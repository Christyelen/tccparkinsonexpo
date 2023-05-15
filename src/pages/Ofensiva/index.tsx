import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import ViewShot from 'react-native-view-shot';
import moment from "moment";
import { Calendar } from "react-native-calendars";

const Ofensiva = (props) => {
    const navigation = useNavigation<propsStack>()
    const viewShotRef = useRef(null);
    const [listaOfensivas, setlistaOfensivas] = useState([]);
    const [listaOfensivasData, setlistaOfensivasData] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState(0);

    useEffect(() => {
        setlistaOfensivas(props.route.params.ofensiva)
        ordenarListagemDatas(props.route.params.ofensiva)
    }, []);

    const ordenarListagemDatas = async (listaOfensivasParametro) => {
        listaOfensivasParametro.forEach(item => {
            if (item.idPessoa == '') // colocar o idPessoa
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

        console.log("Lista ordenada: " + listaOfensivasData);
        calcularDiasDeOfensiva(listaOfensivasParametro)
        setlistaOfensivasData(listaOfensivasData)
    }

    const calcularDiasDeOfensiva = async (listaOfensivasParametro) => {

        let contadorDiasConsecutivos = 0;
        let ultimoDocumentoData = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');

        //  console.log("lista ofensiva inicio" + JSON.stringify(listaOfensivasParametro, null, 2));

        listaOfensivasParametro.forEach((ofensiva) => {
            if (ofensiva.idPessoa == true) { //colocar o idPessoa no lugar do true
                const dataOfensiva = moment(ofensiva.dataExercicioRealizado, 'YYYY-MM-DD');
                if (ultimoDocumentoData.diff(dataOfensiva, 'days') === 1) {
                    contadorDiasConsecutivos = contadorDiasConsecutivos + 1;
                    ultimoDocumentoData = dataOfensiva;
                }
                // else if(ultimoDocumentoData.diff(dataOfensiva, 'days') === 0){
                //     contadorDiasConsecutivos = contadorDiasConsecutivos + 1;
                //     ultimoDocumentoData = //ver como colocar a proxima data
                // }
            }
        });

        setDiasOfensiva(contadorDiasConsecutivos);
    }

    const handleShare = async () => {

        try {
            if (viewShotRef.current) {
                try {
                    const uri = await viewShotRef.current.capture();
                    const result = await Share.share({
                        message: 'Confira minha ofensiva diária!',
                        url: uri,
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
    listaOfensivas.map((item) => {
        markedDay[item.dataExercicioRealizado] = {
            selected: true,
            marked: true,
            selectedColor: "purple",
        };
    });

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                        <Button onPress={handleShare} style={styles.buttom} mode="outlined"
                            icon={'share-variant'} >Compartilhar
                        </Button>
                    </View>
                    <ViewShot ref={viewShotRef} style={{ flex: 1, backgroundColor: '#f9f3fe' }}>
                        <View style={styles.container}>
                            <Calendar style={{ borderRadius: 10, elevation: 4, margin: 40 }} onDayPress={date => {
                                console.log(date);
                            }}
                                initialDate={moment().format('YYYY-MM-DD')}
                                minDate={'2020-01-01'}
                                hideExtraDays={true}
                                markedDates={markedDay}
                            />
                            <Text style={styles.textGroup}>Você está com uma ofensiva de: {diasOfensiva} dias</Text>
                        </View>
                    </ViewShot>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

export default Ofensiva

