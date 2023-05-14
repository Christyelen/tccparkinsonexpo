import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const Home = () => {
    const navigation = useNavigation<propsStack>();
    const [fichaAnamnese, setFichaAnamnese] = useState([]);

    useEffect(() => {
        buscarFichaAnamnese();
    }, []);
    const buscarFichaAnamnese = () => {
        try {
            const fichaAnamneseRef = collection(FIRESTORE_DB, 'fichaAnamnese');
            const subscriber = onSnapshot(fichaAnamneseRef, {
                next: (snapshot) => {
                    const fichaAnamnese: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        fichaAnamnese.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setFichaAnamnese(fichaAnamnese)
                }
            });

            return () => subscriber();

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="security" mode="outlined" style={styles.buttomAdm}
                            onPress={() => navigation.navigate("Login")}>
                            Area do administrador
                        </Button>
                    </View>
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
                            onPress={() => navigation.navigate("FichaAnamnese", { fichaAnamnese: fichaAnamnese })}>
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