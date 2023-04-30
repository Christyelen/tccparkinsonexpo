import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import { styles } from "./styles";
import { Appbar, Button } from "react-native-paper";

const Blog = () => {
    const navigation = useNavigation<propsStack>()
    return (
        <>
            <Appbar.Header style={styles.appBar} >
                <Appbar.Content title="Blog de Parkinson" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, paddingBottom: 30, backgroundColor: '#f9f3fe', }}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Button
                            style={styles.buttom}
                            mode="outlined"
                            onPress={() => navigation.navigate("Blog")}>
                            <Text>Blog</Text>
                        </Button>

                        <Button
                            style={styles.buttom}
                            onPress={() => navigation.goBack()}>
                            <Text>Voltar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Blog