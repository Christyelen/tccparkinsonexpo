import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { ActivityIndicator, Button } from "react-native-paper";
import CardBlog from "../../componentes/Blog";

const Blog = () => {
    const navigation = useNavigation<propsStack>()
    const [loading, setLoading] = useState(false);
    const [listaMaterias, setlistaMaterias] = useState([]);

    useEffect(() => {
        buscarMaterias();
    }, []);

    const delay = (milliseconds) => {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    };

    const buscarMaterias = async () => {
        setLoading(true);
        try {
            setLoading(true);

            await delay(1000);

            const materias = [
                {
                    titulo: 'Exercicio sentar na cadeira',
                    descricao: "Para realizar o exercicio você ira necessitar de uma cadeira",
                    url: 'https://pictogrammers.com/library/mdi/icon/camera-outline/',
                    imagem: '../../../assets/imagens/LogoApp.png'
                },
                {
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    url: 'https://snack.expo.dev/@ccheever/react-native-youtube-iframe',
                    imagem: '../../../assets/imagens/LogoApp.png'
                },
                {
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    url: 'https://callstack.github.io/react-native-paper/docs/components/List/ListAccordion/',
                    imagem: '../../../assets/imagens/LogoApp.png'
                },
                {
                    titulo: 'Exercicio levantar e abaixar cabo de vassoura',
                    descricao: "Para realizar o exercicio você ira necessitar de um cabo de vassoura",
                    url: 'https://callstack.github.io/react-native-paper/docs/components/List/ListAccordion/',
                    imagem: '../../../assets/imagens/LogoApp.png'
                },
            ]

            setlistaMaterias(materias);
        } catch (error) {

        }
        setLoading(false);
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    {loading && <ActivityIndicator style={styles.loadingContainer} />}

                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                    </View>
                    <Text style={styles.textGroup}>Blog de noticías</Text>
                    <View>
                        {listaMaterias.map((item, index) => (
                            <CardBlog titulo={item.titulo} descricao={item.descricao} url={item.url} imagem={item.imagem} ></CardBlog>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Blog