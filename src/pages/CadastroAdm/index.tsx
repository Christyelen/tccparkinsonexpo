import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";

const CadastroAdm = () => {
    const navigation = useNavigation<propsStack>()

    const handleSignOut = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(error => alert(error.message))
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>

                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttonCabecalho}
                            onPress={handleSignOut}>
                            Sair
                        </Button>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Área do Administrador</Text>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("CadastroVideo")}>
                            <Text>Cadastrar novos videos</Text>
                        </Button>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("CadastroNiveis")}>
                            <Text>Cadastrar novos niveis</Text>
                        </Button>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("CadastroBlog")}>
                            <Text>Cadastrar registros Blog</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CadastroAdm