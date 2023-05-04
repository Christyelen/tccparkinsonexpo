import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button, Card, Paragraph, TouchableRipple } from "react-native-paper";

const Blog = () => {
    const navigation = useNavigation<propsStack>()

    const handlePress = () => {
        const url = 'https://pictogrammers.com/library/mdi/icon/camera-outline/';
        Linking.openURL(url);
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
                    </View>
                    <Text style={styles.textGroup}>Blog de noticías</Text>

                    <View style={styles.container}>
                        <TouchableRipple onPress={handlePress} style={{ marginTop: 20 }}>
                            <Card style={{ backgroundColor: '#f0dbff' }}>
                                <Card.Title title="Materia sobre Parkinson" />
                                <Card.Content>
                                    <Paragraph>O parkinson afeta os movimentos.</Paragraph>
                                </Card.Content>
                                <Card.Cover style={{ backgroundColor: '#f0dbff' }} source={require('../../../assets/imagens/LogoApp.png')} />
                            </Card>
                        </TouchableRipple>
                        <TouchableRipple onPress={handlePress} style={{ marginTop: 20 }}>
                            <Card style={{ backgroundColor: '#f0dbff' }}>
                                <Card.Title title="Materia sobre Parkinson" />
                                <Card.Content>
                                    <Paragraph>O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.</Paragraph>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>
                        <TouchableRipple onPress={handlePress} style={{ marginTop: 20 }}>
                            <Card style={{ backgroundColor: '#f0dbff' }}>
                                <Card.Title title="Materia sobre Parkinson" />
                                <Card.Content>
                                    <Paragraph>O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.O parkinson afeta os movimentos.</Paragraph>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Blog