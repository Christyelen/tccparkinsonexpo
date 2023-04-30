import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";

const PreExercicio = () => {
    const params = useRoute()
    const navigation = useNavigation<propsStack>()
    let video1 = "";
    let video2 = "";
    let video3 = "";

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>

                        <Button style={styles.buttom}
                            mode="outlined"
                            onPress={() => { navigation.navigate("Exercicio", { idVideo1: video1, idVideo2: video2, idVideo03: video3 }) }}>
                            <Text>Exercicio</Text>
                        </Button>
                    </View>

                    <View style={styles.container}>
                        <Text style={{ fontSize: 20 }}>Pre Exercicio</Text>

                        <Text style={{ fontSize: 15 }}>Descrição: blá blá blá</Text>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default PreExercicio