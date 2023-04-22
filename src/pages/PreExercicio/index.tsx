import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const PreExercicio = () => {
    const params = useRoute()
    const navigation = useNavigation<propsStack>()
    let video1 = "";
    let video2 = "";
    let video3 = "";

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Pre Exercicio</Text>

            <TouchableOpacity
                style={styles.buttom}
                onPress={() => {navigation.navigate("Exercicio", { idVideo1: video1, idVideo2: video2, idVideo03: video3 }) }}>
                <Text>Exercicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttom}
                onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PreExercicio