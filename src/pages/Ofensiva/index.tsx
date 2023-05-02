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
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                <View style={styles.containerBotoes}>
                        <Button icon="arrow-left-circle" mode="outlined" style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            Voltar
                        </Button>
                    </View>
                    <View style={styles.container}>
                 
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Ofensiva