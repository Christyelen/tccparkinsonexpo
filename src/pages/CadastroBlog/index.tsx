import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const CadastroBlog = () => {
    const navigation = useNavigation<propsStack>()
    const [image, setImage] = useState(null);

    const salvarCampos = () => {
        console.log("salvou")
    }

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImage(result.uri);
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
                            onPress={salvarCampos}>
                            Salvar
                        </Button>

                    </View>

                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Dados da matéria</Text>
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo da Matéria"
                        />

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Texto da Matéria"
                            multiline
                            numberOfLines={4}
                        />

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Url da matéria"
                        />

                        <View style={styles.containerImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
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