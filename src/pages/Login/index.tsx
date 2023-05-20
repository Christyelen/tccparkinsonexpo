import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { Button, HelperText, TextInput } from "react-native-paper";
import { styles } from "../Login/styles";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, ActionCodeSettings } from "firebase/auth";
import validator from 'validator';

const Login = () => {
    const navigation = useNavigation<propsStack>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth();


    //campos obrigatorios

    const [errorEmail, setErrorEmail] = useState('')
    const [errorSenha, setErrorSenha] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])


    const resetPassword = () => {
        console.log('E-mail de redefinição de senha enviado com sucesso.');

        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('E-mail de redefinição de senha enviado com sucesso.');
                // Você pode exibir uma mensagem de sucesso ou redirecionar o usuário para outra tela.
            })
            .catch((error) => {
                console.log('Erro ao enviar o e-mail de redefinição de senha:', error);
                // Trate o erro de acordo com sua lógica de usuário.
            });
    };

    const signIn = () => {
        if (validarCampos()) {
            const user = signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
                const user = userCredentials.user;
            }).catch(error => alert(error.message));
        }
    }


    const validarCampos = () => {
        let erros = 0

        if (!validator.isEmail(email)) {
            setErrorEmail('Por favor, insira um email válido.');
            erros += 1;
        }
        if (email == '') {
            setErrorEmail("Campo Email é obrigatório!");
            erros += 1;
        }
        if (password == '') {
            setErrorSenha("Campo Senha é obrigatório!");
            erros += 1;
        }
        else if (password.length < 6) {
            setErrorSenha("Campo senha deve ter mais que 6 digitos");
            erros += 1;
        }
        if (erros > 0) {
            setPossuiErro(true);
            return false;
        }
        else {
            setPossuiErro(false);
            return true;
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Entre ou inscreva-se</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Email"
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                        />
                        {possuiErro && <HelperText type="error">{errorEmail}</HelperText>}

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Senha"
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon="eye" onPress={toggleShowPassword} />}
                        />
                        {possuiErro && <HelperText type="error">{errorSenha}</HelperText>}

                        <View style={{ flexDirection: "row", padding: 10 }}>

                            <Text style={{ marginRight: 5 }}>Esqueceu sua senha?</Text>
                            <TouchableOpacity onPress={resetPassword}>
                                <Text style={{ color: '#663399' }}>Clique aqui!</Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={() => { navigation.navigate("CriarUsuario") }}>
                            <Text>Criar novo usuário</Text>
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={signIn}>
                            <Text>Entrar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Login