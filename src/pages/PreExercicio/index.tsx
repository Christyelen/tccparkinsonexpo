import React from "react";
import { View , Text, TouchableOpacity} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";

const PreExercicio = () => {
    const params = useRoute()
    const navigation = useNavigation<propsStack>()
    let video1 = "";
    let video2 = "";
    let video3 = "";

    const validarNivelExercicio = () => {
    //    if(params.params.nivel == '1'){
    //     console.log("entrou");
    //     video1 = "testeeee";
    //     video2 = "";
    //     video3 = "";
    //    }
    //    else if(params.params.nivel == '2'){
    //     video1 = "";
    //     video2 = "";
    //     video3 = "";
    //    } 
    //    else if(params.params.nivel == '3'){
    //     video1 = "";
    //     video2 = "";
    //     video3 = "";
    //    } 
    //    else if(params.params.nivel == '4'){
    //     video1 = "";
    //     video2 = "";
    //     video3 = "";
    //    }

       console.log()
       navigation.navigate("Exercicio", { idVideo1: video1, idVideo2: video2, idVideo03: video3})
    }
    
    return(
        <View style={styles.container}>
            <Text style={{fontSize:20}}>Pre Exercicio</Text>

            <TouchableOpacity 
            style={styles.buttom}
            onPress={() =>{ validarNivelExercicio()}}>
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