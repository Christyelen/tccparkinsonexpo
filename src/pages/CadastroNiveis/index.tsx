import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button, TextInput } from "react-native-paper";

const CadastroNives = () => {
    const navigation = useNavigation<propsStack>()

    const salvarCampos = () => {
        console.log("salvou")
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
                            onPress={salvarCampos}>
                            Salvar
                        </Button>

                     
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Dados do Paciente</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo do Nível"
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