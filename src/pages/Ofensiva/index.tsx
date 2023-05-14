import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";
import ViewShot from 'react-native-view-shot';
import { addDoc, collection, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import moment from "moment";

const Ofensiva = () => {
    const navigation = useNavigation<propsStack>()
    const viewShotRef = useRef(null);
    const [listaOfensivas, setlistaOfensivas] = useState([]);
    const [listaDiasConsecutivos , setlistaDiasConsecutivos] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState(0);
    const [contadorDias, setContadorDias] = useState(0);
    const [idContadorDias, setIDContadorDias] = useState(0);

    useEffect(() => {
        buscarOfensivas();
        buscarDiasConsecutivos();
        calcularDiasDeOfensiva();
    }, []);

    const buscarOfensivas = async () => {
        try {
            const ofensivasRef = collection(FIRESTORE_DB, 'ofensiva');
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

    const buscarDiasConsecutivos = async () => {
        try {
            const diasConsecutivosRef = collection(FIRESTORE_DB, 'diasConsecutivos');
            const subscriber = onSnapshot(diasConsecutivosRef, {
                next: (snapshot) => {
                    const diasConsecutivos: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        diasConsecutivos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaDiasConsecutivos(diasConsecutivos);
                    console.log("dias consecutivos" + listaDiasConsecutivos);
                }
            });
            
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const calcularDiasDeOfensiva = () => {

        let contadorDiasConsecutivos = 0;
        let ultimoDocumentoData = null;
        
        listaOfensivas.forEach((ofensiva) => {
            listaDiasConsecutivos.forEach(diasConsecutivos => {
                setIDContadorDias(diasConsecutivos.id);
            });

          const dataOfensiva = ofensiva.dataExercicioRealizado;
        
          if (ultimoDocumentoData && dataOfensiva.diff(ultimoDocumentoData, 'days') === 1) {
            // Documento atual é consecutivo ao último documento
            addDiasConsecutivos(idContadorDias);
          } else {
            // Documento atual não é consecutivo, reinicie o contador
            addDiasConsecutivos(idContadorDias);
            contadorDiasConsecutivos = 1;
          }
        
          ultimoDocumentoData = dataOfensiva;
        });

        console.log("teste" + contadorDias);
        setDiasOfensiva(contadorDias);
    }

    const addDiasConsecutivos = async (id) => {
        if(id != ""){
            const docRef = await doc(FIRESTORE_DB, 'diasConsecutivos', id)
            console.log(docRef);
            updateDoc(docRef, {
                diasConsecutivos: +1
            });
            console.log('Passou valor dias consecutivos')
        }
        else{
            addDoc(collection(FIRESTORE_DB, 'diasConsecutivos'), {diasConsecutivos: 1});
        }
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
                    <ViewShot ref={viewShotRef} style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Text style={styles.textGroup}>Você está com uma ofensiva de: {diasOfensiva} dias</Text>
                            {listaOfensivas.map(ofensiva => (
                                <Text key={ofensiva.key} style={{ margin: 10 }}>ofensiva: {ofensiva.dataExercicioRealizado}</Text>
                            ))}
                            <Text style={{ margin: 10 }}>~Colocar calendáriozinho com os dias que ja foram marcados e um icone de foguinho~</Text>
                        </View>
                    </ViewShot>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

export default Ofensiva