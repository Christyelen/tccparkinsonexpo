import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./Models";

import Home from "../../pages/Home"
import FichaAnamnese from "../../pages/FichaAnamnese"
import Video from "../../pages/Video"
import { Header } from "react-native/Libraries/NewAppScreen";

const {Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function(){
    return(
        <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="FichaAnamnese" component={FichaAnamnese}/>
            <Screen name="Video" component={Video}/>
        </Navigator>
    )
}