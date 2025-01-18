import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LoginScreen } from "./src/screens/components/LoginScreen";
import { HomeScreen } from "./src/screens/components/HomeScreen";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";
import { FinancialSummaryScreen } from "./src/screens/components/FinancialSummaryScreen";

// Tipos das rotas
export type StackParamList = {
    LoginScreen: undefined;
    HomeScreen: undefined;
    MainApp: undefined; // O Drawer Navigator ficará dentro desta rota
};

export type DrawerParamList = {
    HomeScreen: undefined;
    CategoryScreen: undefined;
    SubCategoriesScreen: undefined;
    FinancialSummaryScreen: undefined;
};

// Configuração dos navegadores
const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function MainApp() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: { backgroundColor: "#6200EE" },
                headerTintColor: "#FFF",
                drawerStyle: { backgroundColor: "#F4F4F4" },
                drawerLabelStyle: { fontSize: 16 },
            }}
        >
            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Início",
                    headerTitle: "Menus",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={color} size={size} />
                    ),
                }}
            />
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
    );
}

export default function App() {
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="MainApp" component={MainApp} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
