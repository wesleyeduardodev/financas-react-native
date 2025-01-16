import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/screens/components/Home";
import { CategoryScreen } from "./src/screens/components/CategoryScreen"; // Certifique-se de criar/importar esta tela

// Tipos das rotas
export type RootStackParamList = {
    Home: undefined;
    CategoryScreen: undefined;
};

// Configuração do Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    {/* Tela inicial */}
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: "Gastos", headerShown: false }}
                    />
                    {/* Tela de Categorias */}
                    <Stack.Screen
                        name="CategoryScreen"
                        component={CategoryScreen}
                        options={{ title: "Categorias" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}