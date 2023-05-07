import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { ActivityIndicator, Button, List, } from "react-native-paper";

const PreExercicio = (props) => {
    const navigation = useNavigation<propsStack>();
    const [listaExercicio, setlistaExercicio] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        buscarInformacoesNivel(props.route.params.nivel);
    }, []);

    const delay = (milliseconds) => {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    };

    const buscarInformacoesNivel = async (nivel) => 
    {
        //fingir q voltou isso do banco

        setLoading(true);
        try {
            setLoading(true);

            await delay(1000);

            const teste = [
                {
                    id: 1,
                    titulo: 'Exercicio sentar na cadeira',
                    descricao: "Para realizar o exercicio você ira necessitar de uma cadeira",
                    idVideo: 'iee2TATGMyI'
                },
                {
                    id: 2,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'iee2TATGMyI'
                },
                {
                    id: 3,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'k8hz8WIxhAA'
                },
                {
                    id: 4,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'iee2TATGMyI'
                },
                {
                    id: 5,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'k8hz8WIxhAA'
                },
                {
                    id: 6,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'k8hz8WIxhAA'
                },
                {
                    id: 7,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'k8hz8WIxhAA'
                },
                {
                    id: 8,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    idVideo: 'k8hz8WIxhAA'
                },
                {
                    id: 9,
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o extesteeeea",
                    idVideo: 'k8hz8WIxhAA'
                }
            ]

            setlistaExercicio(teste);
        } catch (error) {

        }
        setLoading(false);
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
                            onPress={() => { navigation.navigate("Exercicio", { idVideo1: listaExercicio[0]?.idVideo, idVideo2:  listaExercicio[1]?.idVideo, idVideo03:  listaExercicio[2]?.idVideo }) }}>
                            <Text>Exercicio</Text>
                        </Button>
                    </View>
                    <View style={styles.container}>
                    {loading && <ActivityIndicator style={styles.loadingContainer}  />}
                    {!loading &&  <FlatList
                            data={listaExercicio}
                            renderItem={({ item }) => {
                                return (<List.Item titleStyle={styles.title}
                                    descriptionStyle={styles.description}
                                    title={item.titulo} description={item.descricao}
                                    titleNumberOfLines={3} />)
                            }}
                        />}
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default PreExercicio