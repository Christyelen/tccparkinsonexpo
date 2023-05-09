import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, List, TextInput } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroVideo = () => {
    const navigation = useNavigation<propsStack>()

    const [exercicio, setExercicio] = useState('')
    const [tituloExercicio, setTituloExercicio] = useState('')
    const [descricaoExercicio, setDescricaoExercicio] = useState('')
    const [idVideo, setIdVideo] = useState('')

    const addExercicio = () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'exercicio'), {idVideo: idVideo, tituloExercicio: tituloExercicio, descricaoExercicio: descricaoExercicio });
        console.log('Passou')
        setExercicio('');
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
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo do Exercício"
                            onChangeText={(text: string) => setTituloExercicio(text)}
                            value={tituloExercicio}
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Descrição do Exercício"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text: string) => setDescricaoExercicio(text)}
                            value={descricaoExercicio}
                        />

                        <View>
                            <Text> Fazer uma grid c os videos existentes p poder atualizar e excluir</Text>
                            {/* <Grid data={data} /> */}
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CadastroVideo