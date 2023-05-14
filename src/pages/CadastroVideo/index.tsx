import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, Card, DataTable, HelperText, List, TextInput } from "react-native-paper";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroVideo = () => {
    const navigation = useNavigation<propsStack>()

    const [exercicio, setExercicio] = useState('')
    const [tituloExercicio, setTituloExercicio] = useState('')
    const [descricaoExercicio, setDescricaoExercicio] = useState('')
    const [idVideo, setIdVideo] = useState('')
    const [nivel, setNivel] = useState('')
    const [listaExercicio, setListaExercicios] = useState([]);

    //Campos Obrigatórios:

    const [errorTitulo, setErrorTitulo] = useState('')
    const [errorIdVideo, setErrorIdVideo] = useState('')
    const [errorDescricao, setErrorDescricao] = useState('')
    const [errorNivel, setErrorNivel] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);



    useEffect(() => {
        buscarExercicio();
    }, []);


    const validarCampos = () => {
        let erros = 0
        if (idVideo == '') {
            setErrorIdVideo("Campo ID vídeo é obrigatório!");
            erros += 1;
        }
        if (tituloExercicio == '') {
            setErrorTitulo("Campo Titulo é obrigatório!");
            erros += 1;
        }
        if (descricaoExercicio == '') {
            setErrorDescricao("Campo Descrição é obrigatório!");
            erros += 1;
        }
        if (nivel == '') {
            setErrorNivel("Campo Nivel é obrigatório!");
            erros += 1;
        }

        if (erros > 0) {
            setPossuiErro(true);
            return false;
        }
        else {
            setPossuiErro(false);
            return true;
        }
    }

    const buscarExercicio = async () => {
        try {
            const exercicioRef = collection(FIRESTORE_DB, 'exercicio');
            const subscriber = onSnapshot(exercicioRef, {
                next: (snapshot) => {
                    const exercicio: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        exercicio.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setListaExercicios(exercicio)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const excluirRegistro = (idDocumento) => {
        console.log("Excluir")
        const documentRef = doc(FIRESTORE_DB, 'exercicio', idDocumento);
        // Remove o documento
        deleteDoc(documentRef).then(() => {
            console.log('Documento removido com sucesso!');
        }).catch((error) => {
            console.error('Erro ao remover o documento:', error);
        });
    }

    const editarRegistro = async (idDocumento) => {
        console.log("Editar")
        try {
            if (validarCampos()) {
                const documentRef = doc(FIRESTORE_DB, 'exercicio', idDocumento);
                await updateDoc(documentRef, {
                    idVideo: idVideo,
                    tituloExercicio: tituloExercicio,
                    descricaoExercicio: descricaoExercicio,
                    nivel: nivel
                });
                console.log('Documento atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar o documento:', error);
        }
    }

    const addExercicio = () => {
        if (validarCampos()) {
            const doc = addDoc(collection(FIRESTORE_DB, 'exercicio'), { idVideo: idVideo, tituloExercicio: tituloExercicio, descricaoExercicio: descricaoExercicio, nivel: nivel });
            console.log('Passou')
            setExercicio('');
        }
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                        <Button
                            mode="contained"
                            icon={'content-save-outline'}
                            style={styles.buttom}
                            onPress={addExercicio}>
                            <Text>Salvar</Text>
                        </Button>

                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Cadastrar novos vídeos</Text>

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="ID vídeo"
                            onChangeText={(text: string) => setIdVideo(text)}
                            value={idVideo}
                        />
                        {possuiErro && <HelperText type="error">{errorIdVideo}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo do Exercício"
                            onChangeText={(text: string) => setTituloExercicio(text)}
                            value={tituloExercicio}
                        />
                        {possuiErro && <HelperText type="error">{errorTitulo}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Descrição do Exercício"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text: string) => setDescricaoExercicio(text)}
                            value={descricaoExercicio}
                        />
                        {possuiErro && <HelperText type="error">{errorDescricao}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Nivel"
                            onChangeText={(text: string) => setNivel(text)}
                            value={nivel}
                        />
                        {possuiErro && <HelperText type="error">{errorNivel}</HelperText>}

                    </View>
                    <View style={styles.containerTabela}>
                        <Card>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>ID</DataTable.Title>
                                    <DataTable.Title>Ações</DataTable.Title>
                                </DataTable.Header>
                                {listaExercicio.map(exercicio => (
                                    <DataTable.Row>
                                        <DataTable.Cell>{exercicio.id}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <>
                                                <Button icon="pencil-outline" style={styles.buttom}
                                                    onPress={() => editarRegistro(exercicio.id)}>
                                                </Button>
                                                <Button icon="trash-can-outline" style={styles.buttom}
                                                    onPress={() => excluirRegistro(exercicio.id)}>
                                                </Button>
                                            </>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default CadastroVideo