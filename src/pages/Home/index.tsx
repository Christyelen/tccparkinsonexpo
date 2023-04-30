import React from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";

const Home = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Image
                            source={require('../../../assets/imagens/LogoApp.png')}
                            style={{ width: 200, height: 200, margin: 10, alignSelf: "center" }} />
                        <Text style={styles.textGroup} > App Parkinson </Text>
                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("Niveis")}>
                            <Text>Níveis</Text>
                        </Button>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("FichaAnamnese", { name: "Chris" })}>
                            <Text>Ficha Anamnese</Text>
                        </Button>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("Ofensiva")}>
                            <Text>Ofensiva</Text>
                        </Button>

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => navigation.navigate("Blog")}>
                            <Text>Blog</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Home