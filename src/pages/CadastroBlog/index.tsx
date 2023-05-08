import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const CadastroBlog = () => {
    const navigation = useNavigation<propsStack>()
    const [urlimage, setURLImage] = useState('');
    const [image, setImage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlMateria, setUrlMateria] = useState('null');
    const [materia, setMateria] = useState('')

    const addMateria = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'blog'), { titulo: titulo, descricao: descricao, urlImage: urlimage, urlMateria: urlMateria});
        console.log('Passou')
        setMateria('');
    }

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
             setURLImage('../../../assets/imagens/LogoApp.png');
        }
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
                        <Button icon="content-save-outline" mode="contained" style={styles.buttom}
                            onPress={addMateria}>
                            Salvar
                        </Button>

                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Dados da matéria</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo da Matéria"
                            onChangeText={(text: string) => setTitulo(text)}
                            value={titulo}
                        />

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Texto da Matéria"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text: string) => setDescricao(text)}
                            value={descricao}
                        />

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Url da matéria"
                            onChangeText={(text: string) => setUrlMateria(text)}
                            value={urlMateria}
                        />

                        <View style={styles.containerImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image}/>
                            ) : (
                                <Button mode="outlined" style={styles.buttomImage} icon={'camera-outline'} onPress={handleImageSelect}>
                                    Selecionar imagem para matéria
                                </Button>
                            )}
                        </View>
                    </View>


                    <View>
                        <Text style={{ marginTop: 10 }}>
                            Fazer uma grid c as materias existentes p poder atualizar e excluir</Text>
                        {/* <Grid data={data} /> */}
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default CadastroBlog