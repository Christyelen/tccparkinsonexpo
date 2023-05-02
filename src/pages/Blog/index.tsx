import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button, Card, Paragraph, TouchableRipple } from "react-native-paper";

const Blog = () => {
    const navigation = useNavigation<propsStack>()
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
                    <View style={styles.container}>
                        <TouchableRipple onPress={() => console.log('Clicou no Card')} style={{marginTop: 20}}>
                            <Card>
                                <Card.Title title="Materia sobre Parkinson" />
                                <Card.Content>
                                    <Paragraph>O parkinson afeta os movimentos.</Paragraph>
                                </Card.Content>
                                <Card.Cover source={require('../../../assets/imagens/LogoApp.png')} />
                            </Card>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => console.log('Clicou no Card')} style={{marginTop: 20}}>
                            <Card>
                                <Card.Title title="Materia sobre Parkinson" />
                                <Card.Content>
                                    <Paragraph>O parkinson afeta os movimentos.</Paragraph>
                                </Card.Content>
                                <Card.Cover source={require('../../../assets/imagens/LogoApp.png')} />
                            </Card>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Blog