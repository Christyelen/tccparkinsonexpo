import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const Niveis = () => {
    const navigation = useNavigation<propsStack>()
    const [listaNiveis, setlistaNiveis] = useState([]);

    useEffect(() => {
        buscarNiveis();
    }, []);

    const buscarNiveis = async () => {
        try {
            const niveisRef = collection(FIRESTORE_DB, 'nivel');
            const subscriber = onSnapshot(niveisRef, {
                next: (snapshot) => {
                    const niveis: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        niveis.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaNiveis(niveis)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
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
                    </View>

                    <View style={styles.containerBotoes}>
                        <View style={styles.container}>
                        {listaNiveis.map(niveis => (
                            <Button
                                style={styles.buttom}
                                onPress={() => navigation.navigate("PreExercicio", { nivel: niveis.nivel })}
                                mode="contained">
                                <Text>{niveis.titulo}</Text>
                            </Button>))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Niveis