import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";
import ViewShot from 'react-native-view-shot';
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const Ofensiva = () => {
    const navigation = useNavigation<propsStack>()
    const viewShotRef = useRef(null);
    const [listaOfensivas, setlistaOfensivas] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState('');

    useEffect(() => {
        buscarOfensivas();
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

    const calcularDiasDeOfensiva = () =>{
        setDiasOfensiva('2');
        //fazer controle da quantidade de dias de ofensiva
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
                                <Text style={{ margin: 10 }}>ofensiva: {ofensiva.dataExercicioRealizado}</Text>
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