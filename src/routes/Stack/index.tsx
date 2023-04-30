import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./Models";

import Home from "../../pages/Home"
import FichaAnamnese from "../../pages/FichaAnamnese"
import Exercicio from "../../pages/Exercicio"
import Blog from "../../pages/Blog"
import Niveis from "../../pages/Niveis"
import Ofensiva from "../../pages/Ofensiva"
import PreExercicio from "../../pages/PreExercicio"

const {Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function(){
    return(
        <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="FichaAnamnese" component={FichaAnamnese}/>
            <Screen name="Exercicio" component={Exercicio}/>
            <Screen name="Niveis" component={Niveis}/>
            <Screen name="Ofensiva" component={Ofensiva}/>
            <Screen name="PreExercicio" component={PreExercicio}/>
            <Screen name="Blog" component={Blog}/>
        </Navigator>
    )
}