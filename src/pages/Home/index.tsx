import React from "react";
import { View , Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const Home = () => {
    const navigation = useNavigation<propsStack>()
    return(
        <View style={styles.container}>
            <Text style={{fontSize:20}}>Home</Text>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() => navigation.navigate("Niveis")}>
                <Text>Niveis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity  
            style={styles.buttom}
            onPress={() => navigation.navigate("FichaAnamnese",{name: "Chris"})}>
                <Text>Ficha Anamnese</Text>
            </TouchableOpacity>

            <TouchableOpacity  
            style={styles.buttom}
            onPress={() => navigation.navigate("Ofensiva")}>
                <Text>Ofensiva</Text>
            </TouchableOpacity>

            <TouchableOpacity  
            style={styles.buttom}
            onPress={() => navigation.navigate("Blog")}>
                <Text>Blog</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home