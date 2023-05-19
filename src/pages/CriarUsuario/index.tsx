import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { styles } from "../Login/styles";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
//import * from 'react-native-mail-composer';


const CriarUsuario = () => {
    const navigation = useNavigation<propsStack>()
    const [emailValue, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [coordenador, setCoordenador] = useState(false);
    const [cpf, setCpf] = useState('');
    const EMAIL_ADM = "christyelenkra@gmail.com";
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    const signUp = () => {
        const after = createUserWithEmailAndPassword(auth, emailValue, password).then(userCredentials => {
            const user = userCredentials.user;
            if (coordenador) {
                addUsuario(user.uid, cpf);
            }
            else {
                addUsuario(user.uid, "");
            }
        }).catch(error => alert(error.message));
    }

    const addUsuario = async (usuario, cpf) => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'usuario'), { usuario: usuario, cpf: cpf, coordenador: false, solicitacao: coordenador });
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setCoordenador(!isChecked);
    };
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttonCabecalho}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Inscreva-se</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Email"
                            value={emailValue}
                            onChangeText={(text: string) => setEmail(text)}
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Senha"
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon="eye" onPress={toggleShowPassword} />}
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Confirmar Senha"
                            value={confirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon="eye" onPress={toggleShowPassword} />}
                        />
                        <View style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 10 }}>
                            <Checkbox.Android
                                status={isChecked ? 'checked' : 'unchecked'}
                                onPress={handleCheckboxChange} />
                            <Text style={{ alignSelf: "center" }}>Perfil de coordenador?</Text>
                            {handleCheckboxChange &&
                                <TextInput style={styles.campostexto}
                                    mode="outlined"
                                    label="CPF"
                                    value={cpf}
                                    onChangeText={(text: string) => setCpf(text)}
                                />}
                        </View>
                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={signUp}>
                            <Text>Criar novo usuário</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CriarUsuario