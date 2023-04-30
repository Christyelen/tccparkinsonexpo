import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";

const Ofensiva = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <>
            <Appbar.Header style={styles.appBar} >
                <Appbar.Content title="Ofensiva Diária" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Button
                            style={styles.buttom}
                            mode="outlined"
                            onPress={() => navigation.goBack()}>
                            <Text>Voltar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Ofensiva