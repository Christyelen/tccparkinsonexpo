import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Button, List, TextInput } from "react-native-paper";

const data = [
    { id: 1, title: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, title: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, title: 'Item 3', description: 'Descrição do item 3' },
    { id: 4, title: 'Item 4', description: 'Descrição do item 4' },
    { id: 5, title: 'Item 5', description: 'Descrição do item 5' },
    { id: 6, title: 'Item 6', description: 'Descrição do item 6' },
];

const CadastroVideo = () => {
    const navigation = useNavigation<propsStack>()
    const [text, setText] = useState('');
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [items, setItems] = useState([
        { id: 1, label: 'Nivel 1' },
        { id: 2, label: 'Nivel 2' },
        { id: 3, label: 'Nivel 3' },
    ]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        console.log('selecionei')
        setText(item.label);
        setExpanded(false);
    };

    const handleTextInputPress = () => {
        setExpanded(!expanded);
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
                        <Button
                            mode="contained"
                            icon={'content-save-outline'}
                            style={styles.buttom}
                            onPress={() => navigation.navigate("Niveis")}>
                            <Text>Salvar</Text>
                        </Button>

                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textGroup}>Cadastrar novos vídeos</Text>

                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="ID vídeo"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Titulo do Exercício"
                        />
                        <TextInput style={styles.campostexto}
                            mode="outlined"
                            label="Descrição do Exercício"
                            multiline
                            numberOfLines={4}
                        />
                        <View style={styles.listagem}>
                            <List.Section title="Selecione um nivel">
                                <List.Accordion
                                    title="Níveis">
                                    {items.map((item) => (
                                        <List.Item
                                            key={item.id}
                                            title={item.label}
                                            onPress={() => handleItemPress(item)}
                                            style={
                                                selectedItem && selectedItem.id === item.id
                                                    ? styles.selectedItem
                                                    : null
                                            }
                                        />
                                    ))}
                                </List.Accordion>
                            </List.Section>
                        </View>

                        <View>
                            <Text> Fazer uma grid c os videos existentes p poder atualizar e excluir</Text>
                            {/* <Grid data={data} /> */}
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CadastroVideo