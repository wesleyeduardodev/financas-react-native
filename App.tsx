import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "./src/screens/components/Home";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";

// Tipos das rotas
export type DrawerParamList = {
    Home: undefined;
    CategoryScreen: undefined;
    SubCategoriesScreen: undefined;
};

// Configuração do Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function App() {
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: { backgroundColor: "#6200EE" },
                        headerTintColor: "#FFF",
                        drawerStyle: { backgroundColor: "#F4F4F4" },
                        drawerLabelStyle: { fontSize: 16 },
                    }}
                >
                    {/* Tela Home */}
                    <Drawer.Screen
                        name="Home"
                        component={Home}
                        options={{ title: "Tela Inicial" }}
                    />
                    {/* Tela de Categorias */}
                    <Drawer.Screen
                        name="CategoryScreen"
                        component={CategoryScreen}
                        options={{ title: "Categorias" }}
                    />
                    {/* Tela de Subcategorias */}
                    <Drawer.Screen
                        name="SubCategoriesScreen"
                        component={SubCategoriesScreen}
                        options={{ title: "Subcategorias" }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    );
}
