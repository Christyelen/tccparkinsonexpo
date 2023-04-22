import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const Blog = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Home</Text>

            <TouchableOpacity
                style={styles.buttom}
                onPress={() => navigation.navigate("Blog")}>
                <Text>Blog</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Blog