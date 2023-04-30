import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { propsStack } from "../../routes/Stack/Models";
import { TextInput, Button, Appbar, Checkbox } from 'react-native-paper';
import { styles } from "./styles";

const FichaAnamnese = () => {
    const params = useRoute()
    //let teste= params.params.name;
    //console.log('teste' + ' ' +  params.params.name)
    const navigation = useNavigation<propsStack>()
    console.log(params);
    const [isVisibleSaude, setIsVisibleSaude] = useState(false);
    const [isVisibleRemedio, setIsVisibleRemedio] = useState(false);
    const [isVisibleCuidador, setIsVisibleCuidador] = useState(false);
    const mostrarCampoSaude = () => {
        setIsVisibleSaude(!isVisibleSaude);
    };
    const mostrarCampoRemedio = () => {
        setIsVisibleRemedio(!isVisibleRemedio);
    };
    const mostrarCampoCuidador = () => {
        setIsVisibleCuidador(!isVisibleCuidador);
    };

    return (
        <>
            {/* <Appbar.Header style={styles.appBar} >
                <Appbar.Content title="Ficha Anamnese" />
            </Appbar.Header> */}
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>

                        <Button icon="content-save-outline" mode="contained" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Salvar
                        </Button>
                    </View>

                    <View style={styles.container}>

                        <Text style={styles.textGroup}>Dados do Paciente</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Nome"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Sobrenome"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="CPF"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="RG"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Data de Nascimento"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Sexo"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Peso"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Altura"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Telefone"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Email"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Ano que foi diagnosticado"
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Checkbox.Android
                                status={isVisibleSaude ? 'checked' : 'unchecked'}
                                onPress={mostrarCampoSaude} />
                            {isVisibleSaude && <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Cartão Nacional da Saúde"
                            />}
                            <Text style={{ alignSelf: "center" }}>Possui plano de saúde?</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Checkbox.Android
                                status={isVisibleRemedio ? 'checked' : 'unchecked'}
                                onPress={mostrarCampoRemedio} />
                            {isVisibleRemedio && <TextInput style={styles.campostexto}
                                mode="outlined"
                                label="Remédios utilizados"
                            />}
                            <Text style={{ alignSelf: "center" }}>Você toma remédios?</Text>

                        </View>
                        <Text style={styles.textGroup}>Endereço</Text>

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="CEP"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Estado"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Cidade"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Bairro"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Rua"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Número"
                        />

                        <Text style={styles.textGroup}>Informações Adicionais</Text>

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Médico responsável"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="CRM do médico"
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Checkbox.Android
                                status={isVisibleCuidador ? 'checked' : 'unchecked'}
                                onPress={mostrarCampoCuidador} />

                                {isVisibleCuidador &&
                                    <TextInput style={styles.campostexto}
                                        mode="outlined"
                                        label="Nome do Cuidador"
                                    />}

                                {isVisibleCuidador &&
                                    <TextInput style={styles.campostexto}
                                        mode="outlined"
                                        label="CPF"
                                    />}

                            <Text style={{ alignSelf: "center" }}>Possui cuidador?</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default FichaAnamnese