import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button } from "react-native-paper";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";

const Home = () => {
    const navigation = useNavigation<propsStack>();
    const [fichaAnamnese, setFichaAnamnese] = useState([]);
    const [listaOfensivas, setlistaOfensivas] = useState([]);
    const [listaUsuario, setlistaUsuario] = useState([]);
    const [usuarioPossuiPermissao, setusuarioPossuiPermissao] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        buscarFichaAnamnese();
        buscarOfensivas();
        buscarUsuario();
    }, []);

    const buscarFichaAnamnese = () => {
        try {
            const fichaAnamneseRef = collection(FIRESTORE_DB, 'fichaAnamnese');
            const q = query(fichaAnamneseRef, where('usuario', '==', auth.currentUser.uid));
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

    const buscarOfensivas = async () => {
        try {
            const ofensivasRef = collection(FIRESTORE_DB, 'ofensiva');
            const q = query(ofensivasRef, where('idPessoa', '==', '')); //colocar o IdPessoa
            const subscriber = onSnapshot(ofensivasRef, {
                next: (snapshot) => {
                    const ofensivas: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        ofensivas.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    setlistaOfensivas(ofensivas)

                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const buscarUsuario = async () => {
        try {
            const usuariosRef = collection(FIRESTORE_DB, 'usuario');
            const q = query(usuariosRef, where('usuario', '==', auth.currentUser.uid));
            const subscriber = onSnapshot(usuariosRef, {
                next: (snapshot) => {
                    const usuario: any[] = [];
                    snapshot.docs.forEach((doc) => {
                        usuario.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    validarPossuiRegraCoordenador(usuario)
                    setlistaUsuario(usuario)
                }
            });
            return () => subscriber();
        } catch (error) {
            alert(error.message);
        }
    };

    const validarPossuiRegraCoordenador = (usuario) => {
        for (let index = 0; index < usuario.length; index++) {
            console.log(auth.currentUser.uid == usuario[index].usuario)
            if (auth.currentUser.uid == usuario[index].usuario)
                setusuarioPossuiPermissao(usuario[index].coordenador);
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        {usuarioPossuiPermissao && <Button icon="security" mode="outlined" style={styles.buttomAdm}
                            onPress={() => navigation.navigate("CadastroAdm")}>
                            Area do administrador
                        </Button>
                        }
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
                            onPress={() => navigation.navigate("Ofensiva", { ofensiva: listaOfensivas })}>
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