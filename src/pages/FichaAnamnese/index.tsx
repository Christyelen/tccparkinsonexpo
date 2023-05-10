import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { propsStack } from "../../routes/Stack/Models";
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { styles } from "./styles";
import { addDoc, collection, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const FichaAnamnese = (props) => {

    let teste = props.route.params.name;
    const navigation = useNavigation<propsStack>()
    const [isVisibleSaude, setIsVisibleSaude] = useState(false);
    const [isVisibleRemedio, setIsVisibleRemedio] = useState(false);
    const [isVisibleCuidador, setIsVisibleCuidador] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);

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

    const [fichaAnamnese, setFichaAnamnese] = useState('');

    const atualizarCampos = async () => {
        
        //codigo comentado da erro era a tentativa de buscar o id do documento com query 

        //const db = firestore()
        //console.log(db)
        //const colecaoRef = db.collection('fichaAnamnese')
        // Executar a consulta para encontrar o documento com base em algum critério de pesquisa
        //const querySnapshot = await colecaoRef.where('nome', '==', 'chris').get();
        //console.log(querySnapshot.docs[0].ref);
        // Atualizar o primeiro documento retornado pela consulta
        //if (!querySnapshot.empty) {
        //  const documentoRef = querySnapshot.docs[0].ref;
        const docRef = await doc(FIRESTORE_DB, 'fichaAnamnese', '7zCVJzege5OE65Ecknk8')

        updateDoc(docRef, {
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
            cartaoPlano: cartaoPlano,
            usoRemedios: usoRemedios,
            remediosUtilizados: remediosUtilizados,
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero,
            medicoResponsavel: medicoResponsavel,
            crmMedico: crmMedico,
            possuiCuidador: possuiCuidador,
            nomeCuidador: nomeCuidador,
            cpfCuidador: cpfCuidador
        })
        setFichaAnamnese('');
        console.log('Passou update')
    };

    const addFicha = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'fichaAnamnese'), {
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
            cartaoPlano: cartaoPlano,
            usoRemedios: usoRemedios,
            remediosUtilizados: remediosUtilizados,
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero,
            medicoResponsavel: medicoResponsavel,
            crmMedico: crmMedico,
            possuiCuidador: possuiCuidador,
            nomeCuidador: nomeCuidador,
            cpfCuidador: cpfCuidador
        });
        setFichaAnamnese('');
        console.log('Passou salvar')
    }

    const mostrarCampoSaude = () => {
        setIsVisibleSaude(!isVisibleSaude);
        if (isVisibleSaude) {
            setPossuiPlano(true);
        }
    };
    const mostrarCampoRemedio = () => {
        setIsVisibleRemedio(!isVisibleRemedio);
        if (isVisibleRemedio) {
            setUsoRemedios(true);
        }
    };
    const mostrarCampoCuidador = () => {
        setIsVisibleCuidador(!isVisibleCuidador);
        if (isVisibleCuidador) {
            setPossuiCuidador(true);
        }
    };

    const salvarCampos = () => {
        if (!isReadOnly) {
            if (true) { //fazer validação se ja possui um ID no banco
                atualizarCampos();
            } else {
                addFicha();
            }

        }
        setarCamposReadOnly();
    }

    const setarCamposReadOnly = () => {
        setReadOnly(!isReadOnly);
    };

    const validarJaPossuiInformacoes = () => {
        // ver se os campos estao DOMRectReadOnly, se sim o botao salvar vira editar e vice-versa
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
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
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Sobrenome"
                            onChangeText={(text: string) => setSobrenome(text)}
                            value={sobrenome}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="CPF"
                            onChangeText={(text: string) => setCpf(text)}
                            value={cpf}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="RG"
                            onChangeText={(text: string) => setRg(text)}
                            value={rg}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
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
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Sexo"
                            onChangeText={(text: string) => setSexo(text)}
                            value={sexo}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Peso"
                            onChangeText={(text: string) => setPeso(text)}
                            value={peso}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Altura"
                            onChangeText={(text: string) => setAltura(text)}
                            value={altura}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Telefone"
                            onChangeText={(text: string) => setTelefone(text)}
                            value={telefone}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Email"
                            onChangeText={(text: string) => setEmail(text)}
                            value={email}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Ano que foi diagnosticado"
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
                            onChangeText={(text: string) => setCep(text)}
                            value={cep}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Estado"
                            onChangeText={(text: string) => setEstado(text)}
                            value={estado}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Cidade"
                            onChangeText={(text: string) => setCidade(text)}
                            value={cidade}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Bairro"
                            onChangeText={(text: string) => setBairro(text)}
                            value={bairro}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Rua"
                            onChangeText={(text: string) => setRua(text)}
                            value={rua}
                            editable={!isReadOnly}
                            theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Número"
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
                                    onChangeText={(text: string) => setCpfCuidador(text)}
                                    value={cpfCuidador}
                                    editable={!isReadOnly}
                                    theme={isReadOnly && { colors: { background: '#F2F2F2' } }}

                                />}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default FichaAnamnese