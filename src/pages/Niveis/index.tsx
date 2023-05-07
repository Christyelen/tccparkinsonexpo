import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";

const Niveis = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                    </View>

                    <View style={styles.containerBotoes}>
                        <View style={styles.container}>
                            <Button
                                style={styles.buttom}
                                onPress={() => navigation.navigate("PreExercicio", { nivel: '1' })}
                                mode="contained">
                                <Text>Nivel 1</Text>
                            </Button>

                            <Button
                                style={styles.buttom}
                                onPress={() => navigation.navigate("PreExercicio", { nivel: '2' })}
                                mode="contained">
                                <Text>Nivel 2</Text>
                            </Button>

                            <Button
                                style={styles.buttom}
                                onPress={() => navigation.navigate("PreExercicio", { nivel: '3' })}
                                mode="contained">
                                <Text>Nivel 3</Text>
                            </Button>

                            <Button
                                style={styles.buttom}
                                onPress={() => navigation.navigate("PreExercicio", { nivel: '4' })}
                                mode="contained">
                                <Text>Nivel 4</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Niveis