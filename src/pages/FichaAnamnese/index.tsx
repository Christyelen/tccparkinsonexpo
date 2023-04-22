import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { propsStack } from "../../routes/Stack/Models";

const FichaAnamnese = () => {
    const params = useRoute()
    const navigation = useNavigation<propsStack>()
    console.log(params);

    return (
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text style={{ fontSize: 20 }}>FichaAnamnese</Text>

            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.navigate("Exercicio")}>
                <Text>Exerciciooooo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.navigate("FichaAnamnese", { name: "Chris" })}>
                <Text>Ficha Anamnese</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FichaAnamnese