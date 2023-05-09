import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { ActivityIndicator, Button, List, } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const PreExercicio = (props) => {
    const navigation = useNavigation<propsStack>();
    const [listaPreExercicio, setlistaPreExercicio] = useState([]);

    useEffect(() => {
        buscarPreExercicio(props.route.params.nivel);
    }, []);

    const buscarPreExercicio = (nivel) => {
        try {
            const preExercicioRef = collection(FIRESTORE_DB, 'exercicio');
            const subscriber = onSnapshot(preExercicioRef, {
                next: (snapshot) => {
                    const preExercicio: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        preExercicio.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaPreExercicio(preExercicio)
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
                <View >
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>

                        <Button style={styles.buttom}
                            mode="contained"
                            icon="run"
                            onPress={() => { navigation.navigate("Exercicio", { idVideo1: listaPreExercicio[0]?.idVideo, idVideo2: listaPreExercicio[1]?.idVideo, idVideo03: listaPreExercicio[2]?.idVideo }) }}>
                            <Text>Exercicio</Text>
                        </Button>
                    </View>
                    <View style={styles.container}>
                        <FlatList
                            data={listaPreExercicio}
                            renderItem={({ item }) => {
                                return (<List.Item titleStyle={styles.title}
                                    descriptionStyle={styles.description}
                                    key={item.id}
                                    title={item.tituloExercicio} 
                                    description={item.descricaoExercicio}
                                    titleNumberOfLines={3} />)
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default PreExercicio