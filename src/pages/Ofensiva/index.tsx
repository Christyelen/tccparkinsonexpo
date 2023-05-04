import React, { useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";
import ViewShot from 'react-native-view-shot';

const Ofensiva = () => {
    const navigation = useNavigation<propsStack>()

    const viewShotRef = useRef(null);

    const handleShare = async () => {

        try {
            if (viewShotRef.current) {
                try {
                    const uri = await viewShotRef.current.capture();
                    const result = await Share.share({
                        message: 'Confira minha ofensiva diária!',
                        url: uri,
                    });
                    if (result.action === Share.sharedAction) {
                        console.log('Conteúdo compartilhado com sucesso!');
                    } else if (result.action === Share.dismissedAction) {
                        console.log('O compartilhamento foi cancelado.');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
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
                        <Button onPress={handleShare} style={styles.buttom} mode="outlined"
                            icon={'share-variant'} >Compartilhar
                        </Button>
                    </View>
                    <ViewShot ref={viewShotRef} style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Text style={styles.textGroup}>Você está com uma ofensiva de: 6 dias</Text>
                            <Text style={{ margin: 10 }}>Parabéns bla bla bla</Text>
                            <Text style={{ margin: 10 }}>~Colocar calendáriozinho com os dias que ja foram marcados e um icone de foguinho~</Text>
                        </View>
                    </ViewShot>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

export default Ofensiva