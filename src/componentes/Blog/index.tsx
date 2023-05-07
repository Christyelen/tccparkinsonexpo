import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { TouchableRipple, Card, Paragraph } from 'react-native-paper';

const CardBlog = ({ titulo, descricao, url, imagem }) => {
    const handlePress = (url) => {
        Linking.openURL(url);
    };

    //ver sobre fazer a imagem tambem vir de parametro
    const setarImagem = (imagem) =>{
        require('../../../assets/imagens/LogoApp.png');
    }

    return (
        <View style={styles.card}>
            <TouchableRipple onPress={() => handlePress(url)} style={{ marginTop: 20 }}>
                <Card style={{ backgroundColor: '#f0dbff' }}>
                    <Card.Title title={titulo}/>
                    <Card.Content>
                        <Paragraph>{descricao}</Paragraph>
                    </Card.Content>
                    <Card.Cover style={{ backgroundColor: '#f0dbff' }} source={require('../../../assets/imagens/LogoApp.png')} />
                </Card>
            </TouchableRipple>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
    },
});

export default CardBlog;
