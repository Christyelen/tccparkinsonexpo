import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";

const Niveis = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <>
            <Appbar.Header style={styles.appBar} >
                <Appbar.Content title="Selecione um nivel" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.navigate("PreExercicio", { nivel: '1' })}
                            mode="outlined">
                            <Text>Nivel 1</Text>
                        </Button>

                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.navigate("PreExercicio", { nivel: '2' })}
                            mode="outlined">
                            <Text>Nivel 2</Text>
                        </Button>

                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.navigate("PreExercicio", { nivel: '3' })}
                            mode="outlined">
                            <Text>Nivel 3</Text>
                        </Button>

                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.navigate("PreExercicio", { nivel: '4' })}
                            mode="outlined">
                            <Text>Nivel 4</Text>
                        </Button>

                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.goBack()}
                            mode="outlined">
                            <Text>Voltar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Niveis