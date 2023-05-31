import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, Card, DataTable, HelperText, TextInput } from "react-native-paper";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const AprovarCoordenador = () => {
    const navigation = useNavigation<propsStack>()

    const [listaAprovacao, setListaAprovacao] = useState([]);

    useEffect(() => {
        buscarListaAprovacao();
    }, []);

    const buscarListaAprovacao = async () => {
        try {
            const listaAprovacaoRef = collection(FIRESTORE_DB, 'usuario');
            const subscriber = onSnapshot(listaAprovacaoRef, {
                next: (snapshot) => {
                    const aprovacao: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        aprovacao.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setListaAprovacao(aprovacao)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const gerenciarCoordenadores = async (idDocumento, acao) => {
        try {
            const documentRef = doc(FIRESTORE_DB, 'usuario', idDocumento);
            if (acao == "aprovar") {
                await updateDoc(documentRef, {
                    solicitacao: false,
                    coordenador: true
                }).then(() => { buscarListaAprovacao() });
            } else if (acao == "remover" || acao == "removerCoordenador") {
                Alert.alert(
                    'Excluir',
                    acao == "remover" ? 'Deseja realmente excluir a solicitação?': 'Deseja realmente excluir este coordenador?',
                    [
                        {
                            text: 'Sim', onPress: async () => {
                                await updateDoc(documentRef, {
                                    solicitacao: false,
                                    coordenador: false
                                }).then(() => { buscarListaAprovacao() });
                            }
                        },
                        {
                            text: 'Não', onPress: () => {
                            }
                        }
                    ]
                );
            }
            console.log('Documento atualizado com sucesso!');
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
                    </View>
                    <View style={styles.containerTabela}>
                        <Text style={styles.textGroup}>Controle de novos coordenadores:</Text>
                        <Card>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>CPF</DataTable.Title>
                                    <DataTable.Title>Ações</DataTable.Title>
                                </DataTable.Header>
                                {listaAprovacao.filter(aprovacao => aprovacao.solicitacao).map(aprovacao => (
                                    <DataTable.Row>
                                        <DataTable.Cell>{aprovacao.cpf}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <>
                                                <Button icon="check-circle-outline" style={styles.buttom}
                                                    onPress={() => gerenciarCoordenadores(aprovacao.id, "aprovar")}>
                                                </Button>
                                                <Button icon="close-circle-outline" style={styles.buttom}
                                                    onPress={() => gerenciarCoordenadores(aprovacao.id, "remover")}>
                                                </Button>
                                            </>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </Card>
                    </View>

                    <View style={styles.containerTabela}>
                        <Text style={styles.textGroup}>Controle de coordenadores cadastrados:</Text>
                        <Card>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>CPF</DataTable.Title>
                                    <DataTable.Title>Ações</DataTable.Title>
                                </DataTable.Header>
                                {listaAprovacao.filter(aprovacao => aprovacao.coordenador).map(aprovacao => (
                                    <DataTable.Row>
                                        <DataTable.Cell>{aprovacao.cpf}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <>
                                                <Button icon="close-circle-outline" style={styles.buttom}
                                                    onPress={() => gerenciarCoordenadores(aprovacao.id, "removerCoordenador")}>
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

export default AprovarCoordenador