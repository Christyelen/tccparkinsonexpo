import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { Button, Checkbox, HelperText, TextInput } from "react-native-paper";
import { styles } from "../Login/styles";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import validator from 'validator';
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

    //campos obrigatorios

    const [errorEmail, setErrorEmail] = useState('')
    const [errorSenha, setErrorSenha] = useState('')
    const [errorSenhaConfirmacao, setErrorSenhaConfirmacao] = useState('')
    const [errorCPF, setErrorCPF] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    const signUp = () => {
        if (validarCampos()) {
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


    const validarCampos = () => {
        let erros = 0
        
        if (!validator.isEmail(emailValue)) {
            setErrorEmail('Por favor, insira um email válido.');
            erros += 1;
          }
        if (emailValue == '') {
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

        if (confirmPassword == '') {
            setErrorSenhaConfirmacao("Campo Senha é obrigatório!");
            erros += 1;
        }
        else if (confirmPassword.length < 6) {
            setErrorSenhaConfirmacao("Campo senha deve ter mais que 6 digitos");
            erros += 1;
        }
        if (password != confirmPassword) {
            setErrorSenha("Senhas não batem.");
            erros += 1;
        }

        if (coordenador && cpf == '') {
            setErrorCPF("Campo CPF é obrigatório!");
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
                            keyboardType="email-address"
                            value={emailValue}
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

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Confirmar Senha"
                            value={confirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon="eye" onPress={toggleShowPassword} />}
                        />
                        {possuiErro && <HelperText type="error">{errorSenhaConfirmacao}</HelperText>}

                        <View style={{ flexDirection: "row", flex: 1, alignSelf: "flex-start", marginTop: 10 }}>
                            <Checkbox.Android
                                status={isChecked ? 'checked' : 'unchecked'}
                                onPress={handleCheckboxChange} />
                            <Text style={{ alignSelf: "center" }}>Perfil de coordenador?</Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            {isChecked &&
                                <TextInput style={styles.campostexto}
                                    mode="outlined"
                                    label="CPF"
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => {
                                        setCpf(text.replace(/\D/g, '')
                                            .replace(/(\d{3})(\d)/, '$1.$2')
                                            .replace(/(\d{3})(\d)/, '$1.$2')
                                            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                                            .replace(/(-\d{2})\d+?$/, '$1'))
                                    }}
                                    value={cpf}
                                />
                            }
                        </View>
                        {possuiErro && <HelperText type="error">{errorCPF}</HelperText>}

                        <Button
                            mode="contained"
                            style={styles.buttom}
                            labelStyle={styles.textButton}
                            onPress={signUp}>
                            <Text>Criar novo usuário</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default CriarUsuario