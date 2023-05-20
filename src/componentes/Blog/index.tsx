import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { TouchableRipple, Card, Paragraph } from 'react-native-paper';

const CardBlog = ({ titulo, descricao, url, imagem }) => {
    const handlePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.card}>
            <TouchableRipple onPress={() => handlePress(url)} style={{ marginTop: 20 }}>
                <Card style={{ backgroundColor: '#eee6fa' }}>
                    <Card.Title title={titulo} titleStyle={{ fontWeight: "bold", fontSize: 25, paddingTop:8 }} />
                    <Card.Content>
                        <Paragraph style={{ fontSize: 18 }}>{descricao}</Paragraph>
                    </Card.Content>
                    <Card.Cover style={{ backgroundColor: '#eee6fa', borderRadius: 0 , padding:8}} source={{ uri: imagem }} />
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
