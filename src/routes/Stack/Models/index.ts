import{ NativeStackNavigationProp} from "@react-navigation/native-stack"

export type propsNavigationStack = {
    Home: undefined
    FichaAnamnese:{
        name: string
    }
    Video: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>