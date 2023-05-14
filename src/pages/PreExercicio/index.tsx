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
    const [listaPreExercicioFiltrada, setlistaPreExercicioFiltrada] = useState([]);
    const [listaReady, setListaReady] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        filtrarExercicios(props.route.params.nivel, props.route.params.listaOfensiva);
        definirVideosNivel();
    }, []);
    
    const definirVideosNivel = () =>{
        for (let index = 0; index < listaPreExercicioFiltrada.length; index++) {
            const preExercicio = listaPreExercicioFiltrada[index];
            videos.push(preExercicio.idVideo);
        }
        setVideos(videos);
        console.log(videos);
        console.log(videos[0]);
    }

    const filtrarExercicios = (nivel, listaPreExercicio) => {

        for (let i = 0; i < listaPreExercicio.length; i++) {
            if (listaPreExercicio[i].nivel == nivel) {
                listaPreExercicioFiltrada.push(listaPreExercicio[i]);
            }
        }
        console.log(listaPreExercicioFiltrada);
        setlistaPreExercicioFiltrada(listaPreExercicioFiltrada);
        setListaReady(true);
    }


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
                            onPress={() => { navigation.navigate("Exercicio", { idVideo1: videos[0] ? videos[0]: null, idVideo2: videos[1] ? videos[1]: null, idVideo03: videos[2] ? videos[2]: null }) }}>
                            <Text>Exercicio</Text>
                        </Button>
                    </View>
                    <View style={styles.container}>
                    {!listaReady && <ActivityIndicator style={styles.loadingContainer} />}
                            <FlatList
                                data={listaPreExercicioFiltrada}
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