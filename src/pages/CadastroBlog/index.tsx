import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, Card, DataTable, HelperText, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroBlog = () => {
    const navigation = useNavigation<propsStack>()
    const [urlimage, setURLImage] = useState('');
    const [image, setImage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlMateria, setUrlMateria] = useState('');
    const [materia, setMateria] = useState('')

    const [listaMaterias, setlistaMaterias] = useState([]);

    //Campos Obrigatórios:

    const [errorTitulo, setErrorTitulo] = useState('')
    const [errorDescricao, setErrorDescricao] = useState('')
    const [errorURLMateria, setErrorURLMateria] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);


    useEffect(() => {
        buscarMaterias();
    }, []);

    const validarCampos = () => {
        let erros = 0
        if (titulo == '') {
            setErrorTitulo("Campo Titulo é obrigatório!");
            erros += 1;
        }
        if (descricao == '') {
            setErrorDescricao("Campo Descrição é obrigatório!");
            erros += 1;
        }
        if (urlMateria == '') {
            setErrorURLMateria("Campo URL é obrigatório!");
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

    const buscarMaterias = async () => {
        try {
            const materiasRef = collection(FIRESTORE_DB, 'blog');
            const subscriber = onSnapshot(materiasRef, {
                next: (snapshot) => {
                    const materias: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        materias.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaMaterias(materias)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const addMateria = async () => {
        if (validarCampos()) {
            const doc = await addDoc(collection(FIRESTORE_DB, 'blog'), { titulo: titulo, descricao: descricao, urlImage: urlimage, urlMateria: urlMateria });
            console.log('Passou')
            setMateria('');
        }
    }

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setURLImage('../../../assets/imagens/LogoApp.png');
        }
    };

    const excluirRegistro = (idDocumento) => {
        console.log("Excluir")
        const documentRef = doc(FIRESTORE_DB, 'blog', idDocumento);
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
                const documentRef = doc(FIRESTORE_DB, 'blog', idDocumento);
                await updateDoc(documentRef, {
                    titulo: titulo,
                    descricao: descricao,
                    urlMateria: urlMateria,
                    urlimage: urlimage
                });
                console.log('Documento atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar o documento:', error);
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
                        <Button icon="content-save-outline" mode="contained" style={styles.buttom}
                            onPress={addMateria}>
                            Salvar
                        </Button>

                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Dados da matéria</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo da Matéria"
                            onChangeText={(text: string) => setTitulo(text)}
                            value={titulo}
                        />
                        {possuiErro && <HelperText type="error">{errorTitulo}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Texto da Matéria"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text: string) => setDescricao(text)}
                            value={descricao}
                        />
                        {possuiErro && <HelperText type="error">{errorDescricao}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Url da matéria"
                            onChangeText={(text: string) => setUrlMateria(text)}
                            value={urlMateria}
                        />
                        {possuiErro && <HelperText type="error">{errorURLMateria}</HelperText>}

                        <View style={styles.containerImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <Button mode="outlined" style={styles.buttomImage} icon={'camera-outline'} onPress={handleImageSelect}>
                                    Selecionar imagem para matéria
                                </Button>
                            )}
                        </View>
                    </View>
                    <View style={styles.containerTabela}>
                        <Card>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>ID</DataTable.Title>
                                    <DataTable.Title>Ações</DataTable.Title>
                                </DataTable.Header>
                                {listaMaterias.map(materia => (
                                    <DataTable.Row>
                                        <DataTable.Cell>{materia.id}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <>
                                                <Button icon="pencil-outline" style={styles.buttom}
                                                    onPress={() => editarRegistro(materia.id)}>
                                                </Button>
                                                <Button icon="trash-can-outline" style={styles.buttom}
                                                    onPress={() => excluirRegistro(materia.id)}>
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

export default CadastroBlog