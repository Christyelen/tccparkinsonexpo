import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { propsStack } from "../../routes/Stack/Models";
import { TextInput, Button, Checkbox, HelperText } from 'react-native-paper';
import { styles } from "./styles";
import { addDoc, collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";


const FichaAnamnese = (props) => {
    const navigation = useNavigation<propsStack>()
    const [isVisibleSaude, setIsVisibleSaude] = useState(false);
    const [isVisibleRemedio, setIsVisibleRemedio] = useState(false);
    const [isVisibleCuidador, setIsVisibleCuidador] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const auth = getAuth();

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [sexo, setSexo] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [anoDiagnostico, setAnoDiagnostico] = useState('')
    const [possuiPlano, setPossuiPlano] = useState(false)
    const [cartaoPlano, setCartaoPlano] = useState('')
    const [usoRemedios, setUsoRemedios] = useState(false)
    const [remediosUtilizados, setRemediosUtilizados] = useState('')
    const [cep, setCep] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [medicoResponsavel, setMedicoResponsavel] = useState('')
    const [crmMedico, setCrmMedico] = useState('')
    const [possuiCuidador, setPossuiCuidador] = useState(false)
    const [nomeCuidador, setNomeCuidador] = useState('')
    const [cpfCuidador, setCpfCuidador] = useState('')
    const [idDocumento, setIdDocumento] = useState('');

    //Campos Obrigatórios:

    const [errorNome, setErrorNome] = useState('')
    const [errorSobrenome, setErrorSobrenome] = useState('')
    const [errorCpf, setErrorCpf] = useState('')
    const [errorRg, setErrorRg] = useState('')
    const [errorDataNascimento, setErrorDataNascimento] = useState('')
    const [errorSexo, setErrorSexo] = useState('')
    const [errorTelefone, setErrorTelefone] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorCep, setErrorCep] = useState('')
    const [errorEstado, setErrorEstado] = useState('')
    const [errorCidade, setErrorCidade] = useState('')
    const [errorBairro, setErrorBairro] = useState('')
    const [errorRua, setErrorRua] = useState('')
    const [possuiErro, setPossuiErro] = useState(false);

    useEffect(() => {

        if (props.route.params.fichaAnamnese != null) {
            buscarIdFicha(props.route.params.fichaAnamnese);
            carregarValorCampos(props.route.params.fichaAnamnese);
            setarCamposReadOnly();
        }

    }, []);


    const validarCampos = () => {
        let erros = 0
        if (nome == '') {
            setErrorNome("Campo Nome é obrigatório!");
            erros += 1;
        }
        if (sobrenome == '') {
            setErrorSobrenome("Campo Sobrenome é obrigatório!");
            erros += 1;
        }
        if (cpf == '') {
            setErrorCpf("Campo CPF é obrigatório!");
            erros += 1;
        }
        if (rg == '') {
            setErrorRg("Campo RG é obrigatório!");
            erros += 1;
        }
        if (dataNascimento == '') {
            setErrorDataNascimento("Campo Data de Nascimento é obrigatório!");
            erros += 1;
        }
        if (sexo == '') {
            setErrorSexo("Campo Sexo é obrigatório!");
            erros += 1;
        }
        if (telefone == '') {
            setErrorTelefone("Campo Telefone é obrigatório!");
            erros += 1;
        }
        if (email == '') {
            setErrorEmail("Campo Email é obrigatório!");
            erros += 1;
        }
        if (cep == '') {
            setErrorCep("Campo CEP é obrigatório!");
            erros += 1;
        }
        if (estado == '') {
            setErrorEstado("Campo Estado é obrigatório!");
            erros += 1;
        }
        if (cidade == '') {
            setErrorCidade("Campo Cidade é obrigatório!");
            erros += 1;
        }
        if (bairro == '') {
            setErrorBairro("Campo Bairro é obrigatório!");
            erros += 1;
        }
        if (rua == '') {
            setErrorRua("Campo Rua é obrigatório!");
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

    const carregarValorCampos = (fichaAnamnese) => { // ver aqui p carregar certo

        if (fichaAnamnese != null) {
            for (let index = 0; index < fichaAnamnese.length; index++) {
                if (auth.currentUser.uid == fichaAnamnese[index].usuario)
                    setValor(fichaAnamnese[index]);

            }
        }
    }

    const setValor = (userData) => {
        setNome(userData.nome);
        setSobrenome(userData.sobrenome);
        setCpf(userData.cpf);
        setRg(userData.rg);
        setDataNascimento(userData.dataNascimento);
        setSexo(userData.sexo);
        setPeso(userData.peso);
        setAltura(userData.altura);
        setTelefone(userData.telefone);
        setEmail(userData.email);
        setAnoDiagnostico(userData.anoDiagnostico);
        setPossuiPlano(userData.possuiPlano);
        if (userData.possuiPlano) {
            mostrarCampoSaude();
        }
        setCartaoPlano(userData.cartaoPlano);
        setUsoRemedios(userData.usoRemedios);
        if (userData.usoRemedios) {
            mostrarCampoRemedio();
        }
        setRemediosUtilizados(userData.remediosUtilizados);
        setCep(userData.cep);
        setEstado(userData.estado);
        setCidade(userData.cidade);
        setBairro(userData.bairro);
        setRua(userData.rua);
        setNumero(userData.numero);
        setMedicoResponsavel(userData.medicoResponsavel);
        setCrmMedico(userData.crmMedico);
        setPossuiCuidador(userData.possuiCuidador);
        if (userData.possuiCuidador) {
            mostrarCampoCuidador();
        }
        setNomeCuidador(userData.nomeCuidador);
        setCpfCuidador(userData.cpfCuidador);
    }

    const buscarIdFicha = (fichaAnamnese) => {
        if (fichaAnamnese != null) {
            for (let index = 0; index < fichaAnamnese.length; index++) {
                if (auth.currentUser.uid == fichaAnamnese[index].usuario) {
                    setIdDocumento(fichaAnamnese[index].id);
                }
            }
        }
    }

    const addFicha = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'fichaAnamnese'), dados);
    }

    const dados = {
        usuario: auth.currentUser.uid,
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        rg: rg,
        dataNascimento: dataNascimento,
        sexo: sexo,
        peso: peso,
        altura: altura,
        telefone: telefone,
        email: email,
        anoDiagnostico: anoDiagnostico,
        possuiPlano: possuiPlano,
        cartaoPlano: possuiPlano ? cartaoPlano : '',
        usoRemedios: usoRemedios,
        remediosUtilizados: usoRemedios ? remediosUtilizados : '',
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        medicoResponsavel: medicoResponsavel,
        crmMedico: crmMedico,
        possuiCuidador: possuiCuidador,
        nomeCuidador: possuiCuidador ? nomeCuidador : '',
        cpfCuidador: cpfCuidador
    }

    const atualizarFicha = async (idDocumento) => {
        try {
            const documentRef = doc(FIRESTORE_DB, 'fichaAnamnese', idDocumento);
            await updateDoc(documentRef, dados);
            console.log('Documento atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o documento:', error);
        }
    };

    const mostrarCampoSaude = () => {
        setIsVisibleSaude(!isVisibleSaude);
        setPossuiPlano(!isVisibleSaude);
    };
    const mostrarCampoRemedio = () => {
        setIsVisibleRemedio(!isVisibleRemedio);
        setUsoRemedios(!isVisibleRemedio);
    };
    const mostrarCampoCuidador = () => {
        setIsVisibleCuidador(!isVisibleCuidador);
        setPossuiCuidador(!isVisibleCuidador);
    };
    const salvarCampos = () => {
        if (validarCampos()) {
            if (!isReadOnly) {
                if (idDocumento != null) {
                    atualizarFicha(idDocumento);
                } else {
                    addFicha();
                }
            }
        }
        console.log(possuiErro)
        if (possuiErro) {
            setReadOnly(false);
        } else {
            setarCamposReadOnly();
        }
    }
    const setarCamposReadOnly = () => {
        setReadOnly(!isReadOnly);
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : "height"}
                >
                    <ScrollView style={styles.scroll}>
                        <View style={styles.containerBotoes}>
                            <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                                onPress={() => navigation.goBack()}>
                                Voltar
                            </Button>
                            {!isReadOnly && <Button icon="content-save-outline" mode="contained" style={styles.buttom}
                                onPress={salvarCampos}>
                                Salvar
                            </Button>}

                            {isReadOnly && <Button icon="pencil-outline" mode="contained" style={styles.buttom}
                                onPress={salvarCampos}>
                                Editar
                            </Button>}

                        </View>

                        <View style={styles.container}>
                            <Text style={styles.textGroup}>Dados do Paciente</Text>
                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Nome"
                                onChangeText={(text: string) => setNome(text)}
                                value={nome}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorNome}</HelperText>}
                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Sobrenome"
                                onChangeText={(text: string) => setSobrenome(text)}
                                value={sobrenome}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorSobrenome}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="CPF"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setCpf(text)}
                                value={cpf}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorCpf}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="RG"
                                onChangeText={(text: string) => setRg(text)}
                                value={rg}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorRg}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                keyboardType="numeric"
                                placeholder="dia/ mês/ ano"
                                label="Data de Nascimento"
                                onChangeText={(text: string) => setDataNascimento(text)}
                                value={dataNascimento}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorDataNascimento}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Sexo"
                                onChangeText={(text: string) => setSexo(text)}
                                value={sexo}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorSexo}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Peso"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setPeso(text)}
                                value={peso}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Altura"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setAltura(text)}
                                value={altura}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Telefone"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setTelefone(text)}
                                value={telefone}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorTelefone}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Email"
                                keyboardType="email-address"
                                onChangeText={(text: string) => setEmail(text)}
                                value={email}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorEmail}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Ano que foi diagnosticado"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setAnoDiagnostico(text)}
                                value={anoDiagnostico}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Checkbox.Android
                                    status={isVisibleSaude ? 'checked' : 'unchecked'}
                                    onPress={!isReadOnly && mostrarCampoSaude} />
                                <Text style={{ alignSelf: "center" }}>Possui plano de saúde?</Text>
                            </View>
                            <View>
                                {isVisibleSaude && <TextInput style={styles.campostexto}
                                    mode="outlined"
                                    label="Cartão Nacional da Saúde"
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => setCartaoPlano(text)}
                                    value={cartaoPlano}
                                    editable={!isReadOnly}
                                    theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                                />}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <Checkbox.Android
                                    status={isVisibleRemedio ? 'checked' : 'unchecked'}
                                    onPress={!isReadOnly && mostrarCampoRemedio} />
                                <Text style={{ alignSelf: "center" }}>Você toma remédios?</Text>
                            </View>
                            <View>
                                {isVisibleRemedio && <TextInput style={styles.campostexto}
                                    mode="outlined"
                                    label="Remédios utilizados"
                                    onChangeText={(text: string) => setRemediosUtilizados(text)}
                                    value={remediosUtilizados}
                                    editable={!isReadOnly}
                                    theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                                />}
                            </View>
                            <Text style={styles.textGroup}>Endereço</Text>

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="CEP"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setCep(text)}
                                value={cep}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            {possuiErro && <HelperText type="error">{errorCep}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Estado"
                                onChangeText={(text: string) => setEstado(text)}
                                value={estado}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            {possuiErro && <HelperText type="error">{errorEstado}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Cidade"
                                onChangeText={(text: string) => setCidade(text)}
                                value={cidade}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                            />
                            {possuiErro && <HelperText type="error">{errorCidade}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Bairro"
                                onChangeText={(text: string) => setBairro(text)}
                                value={bairro}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            {possuiErro && <HelperText type="error">{errorBairro}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Rua"
                                onChangeText={(text: string) => setRua(text)}
                                value={rua}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            {possuiErro && <HelperText type="error">{errorRua}</HelperText>}

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Número"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setNumero(text)}
                                value={numero}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />

                            <Text style={styles.textGroup}>Informações Adicionais</Text>

                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Médico responsável"
                                onChangeText={(text: string) => setMedicoResponsavel(text)}
                                value={medicoResponsavel}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="CRM do médico"
                                keyboardType="numeric"
                                onChangeText={(text: string) => setCrmMedico(text)}
                                value={crmMedico}
                                editable={!isReadOnly}
                                theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                            />
                            <View style={{ flexDirection: "row" }}>
                                <Checkbox.Android
                                    status={isVisibleCuidador ? 'checked' : 'unchecked'}
                                    onPress={!isReadOnly && mostrarCampoCuidador}
                                />
                                <Text style={{ alignSelf: "center" }}>Possui cuidador?</Text>
                            </View>
                            <View>
                                {isVisibleCuidador &&
                                    <TextInput style={styles.campostexto}
                                        mode="outlined"
                                        label="Nome do Cuidador"
                                        onChangeText={(text: string) => setNomeCuidador(text)}
                                        value={nomeCuidador}
                                        editable={!isReadOnly}
                                        theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                                    />}
                            </View>
                            <View>
                                {isVisibleCuidador &&
                                    <TextInput style={styles.campostexto}
                                        mode="outlined"
                                        label="CPF"
                                        keyboardType="numeric"
                                        onChangeText={(text: string) => setCpfCuidador(text)}
                                        value={cpfCuidador}
                                        editable={!isReadOnly}
                                        theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                                    />}
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

export default FichaAnamnese