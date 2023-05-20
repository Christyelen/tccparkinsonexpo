import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, Card, DataTable, HelperText, TextInput } from "react-native-paper";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroNives = () => {
    const navigation = useNavigation<propsStack>()
    const [tituloNivel, setTituloNivel] = useState('')
    const [nivel, setNivel] = useState('')
    const [listaNiveis, setListaNiveis] = useState([]);

    //Campos Obrigatórios:

    const [errorTitulo, setErrorTitulo] = useState('')
    const [errorNivel, setErrorNivel] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);



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
                    setListaNiveis(niveis)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const addNivel = async () => {
        if (validarCampos()) {
            const doc = await addDoc(collection(FIRESTORE_DB, 'nivel'), { label: tituloNivel, value: nivel });
            console.log('Passou')
            setNivel('');
        }
    }

    const excluirRegistro = (idDocumento) => {
        console.log("Excluir")
        const documentRef = doc(FIRESTORE_DB, 'nivel', idDocumento);
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

                const documentRef = doc(FIRESTORE_DB, 'nivel', idDocumento);
                await updateDoc(documentRef, {
                    titulo: tituloNivel,
                    nivel: nivel
                });
                console.log('Documento atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar o documento:', error);
        }
    }

    const validarCampos = () => {
        let erros = 0
        if (tituloNivel == '') {
            setErrorTitulo("Campo Titulo é obrigatório!");
            erros += 1;
        }
        if (nivel == '') {
            setErrorNivel("Campo Nivel é obrigatório!");
            erros += 1;
        }
        listaNiveis.map((item) => {
            if (item.nivel == nivel) {
                setErrorNivel("Não é possivel adicionar um nivel com mesmo valor.");
                erros += 1;
            }
        })

        if (erros > 0) {
            setPossuiErro(true);
            return false;
        }
        else {
            setPossuiErro(false);
            return true;
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
                            onPress={addNivel}>
                            Salvar
                        </Button>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Dados do Paciente</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo do Nível"
                            onChangeText={(text: string) => setTituloNivel(text)}
                            value={tituloNivel}
                        />
                        {possuiErro && <HelperText type="error">{errorTitulo}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Nível"
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
                                {listaNiveis.map(nivel => (
                                    <DataTable.Row>
                                        <DataTable.Cell>{nivel.id}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <>
                                                <Button icon="pencil-outline" style={styles.buttom}
                                                    onPress={() => editarRegistro(nivel.id)}>
                                                </Button>
                                                <Button icon="trash-can-outline" style={styles.buttom}
                                                    onPress={() => excluirRegistro(nivel.id)}>
                                                </Button>
                                            </>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CadastroNives