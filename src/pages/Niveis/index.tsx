import React from "react";
import { View , Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const Niveis = () => {
    const navigation = useNavigation<propsStack>()
    return(
        <View style={styles.container}>
            <Text style={{fontSize:20}}>Niveis</Text>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() => navigation.navigate("PreExercicio",{nivel: '1'})}>
                <Text>Nivel 1</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() => navigation.navigate("PreExercicio",{nivel: '2'})}>
                <Text>Nivel 2</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() => navigation.navigate("PreExercicio",{nivel: '3'})}>
                <Text>Nivel 3</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() => navigation.navigate("PreExercicio",{nivel: '4'})}>
                <Text>Nivel 4</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={{ marginTop: 12, padding: 8, backgroundColor: "#BDBDBD" }}
                onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Niveis