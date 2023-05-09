import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, TextInput } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroNives = () => {
    const navigation = useNavigation<propsStack>()
    const [tituloNivel, setTituloNivel] = useState('')
    const [nivel, setNivel] = useState('')

    const addNivel = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'nivel'), { titulo: tituloNivel, nivel: nivel });
        console.log('Passou')
        setNivel('');
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

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Nível"
                            onChangeText={(text: string) => setNivel(text)}
                            value={nivel}
                        />
                    </View>

                    <Text> Fazer uma grid c os niveis existentes p poder atualizar e excluir</Text>
                    {/* <Grid data={data} /> */}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CadastroNives