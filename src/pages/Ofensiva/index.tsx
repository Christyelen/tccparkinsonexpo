import React from "react";
import { View , Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const Ofensiva = () => {
    const navigation = useNavigation<propsStack>()
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Ofensiva