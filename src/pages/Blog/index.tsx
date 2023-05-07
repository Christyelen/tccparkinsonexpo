import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import CardBlog from "../../componentes/Blog";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const Blog = () => {
    const navigation = useNavigation<propsStack>()
    const [loading, setLoading] = useState(false);
    const [listaMaterias, setlistaMaterias] = useState([]);
    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                console.log('UPDATE')   
                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setTodos(todos)
            }
        })
         
        buscarMaterias();

        return () => subscriber();
    }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false });
        console.log('Passou')
        setTodo('');
    }

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
                        <Button mode="outlined" style={styles.buttom}
                            disabled={todo === ''}
                            onPress={addTodo} >
                            adicionar
                        </Button>
                    </View>
                    <Text style={styles.textGroup}>Blog de noticías</Text>
                    <View style={styles.container}>
                        <TextInput style={styles.campostexto} editable={true}
                            mode="outlined"
                            label="Nome"
                            onChangeText={(text: string) => setTodo(text)}
                            value={todo}
                        />
                    </View>
                    <View>
                        {todos.map(todo => (
                            <Text key={todo.id}>{todo.title}</Text>
                        ))}
                    </View>
                    <View>
                        {listaMaterias.map((item, index) => (
                            <CardBlog key={index} titulo={item.titulo} descricao={item.descricao} url={item.url} imagem={item.imagem} ></CardBlog>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Blog