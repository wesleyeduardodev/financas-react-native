import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./src/screens/components/HomeScreen";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";
import { FinancialSummaryScreen } from "./src/screens/components/FinancialSummaryScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Tipos das rotas
export type DrawerParamList = {
    HomeScreen: undefined;
    CategoryScreen: undefined;
    SubCategoriesScreen: undefined;
    FinancialSummaryScreen: undefined;
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
                    initialRouteName="HomeScreen"
                    screenOptions={{
                        headerStyle: { backgroundColor: "#6200EE" },
                        headerTintColor: "#FFF",
                        drawerStyle: { backgroundColor: "#F4F4F4" },
                        drawerLabelStyle: { fontSize: 16 },
                    }}
                >
                    {/* Tela HomeScreen */}
                    <Drawer.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: "Início", // Nome na barra lateral
                            headerTitle: "Menus", // Nome no cabeçalho da tela
                            drawerIcon: ({ color, size }) => (
                                <Icon name="home-outline" color={color} size={size} />
                            ),
                        }}
                    />
                    {/* Tela de Categorias */}
                    <Drawer.Screen
                        name="CategoryScreen"
                        component={CategoryScreen}
                        options={{
                            title: "Categorias",
                            drawerIcon: ({ color, size }) => (
                                <Icon name="shape-outline" color={color} size={size} />
                            ),
                        }}
                    />
                    {/* Tela de Subcategorias */}
                    <Drawer.Screen
                        name="SubCategoriesScreen"
                        component={SubCategoriesScreen}
                        options={{
                            title: "Subcategorias",
                            drawerIcon: ({ color, size }) => (
                                <Icon name="subdirectory-arrow-right" color={color} size={size} />
                            ),
                        }}
                    />
                    {/* Tela de Resumo Financeiro */}
                    <Drawer.Screen
                        name="FinancialSummaryScreen"
                        component={FinancialSummaryScreen}
                        options={{
                            title: "Resumo Financeiro",
                            drawerIcon: ({ color, size }) => (
                                <Icon name="chart-pie" color={color} size={size} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    );
}
