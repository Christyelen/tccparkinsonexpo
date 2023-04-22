import{ NativeStackNavigationProp} from "@react-navigation/native-stack"
import { Double } from "react-native/Libraries/Types/CodegenTypes"

export type propsNavigationStack = {
    Home: undefined
    FichaAnamnese:{
        name: string
    }
    Exercicio: {
        idVideo1: string,
        idVideo2: string,
        idVideo03: string
    }
    Blog: undefined
    PreExercicio: {
        nivel: string,
    }
    Ofensiva: undefined
    Niveis: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>