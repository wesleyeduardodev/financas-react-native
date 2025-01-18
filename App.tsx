import React from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LoginScreen } from "./src/screens/components/LoginScreen";
import { HomeScreen } from "./src/screens/components/HomeScreen";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";
import { FinancialSummaryScreen } from "./src/screens/components/FinancialSummaryScreen";
import { UsuarioScreen } from "./src/screens/components/UsuarioScreen";

// Tipos das rotas
export type StackParamList = {
    LoginScreen: undefined;
    MainApp: undefined; // O Drawer Navigator ficará dentro desta rota
};

export type DrawerParamList = {
    HomeScreen: undefined;
    CategoryScreen: undefined;
    SubCategoriesScreen: undefined;
    FinancialSummaryScreen: undefined;
    UsuarioScreen: undefined;
};

// Configuração dos navegadores
const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: any) {
    const { navigation } = props;

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {/* Adiciona botão de logout no final do menu */}
            <TouchableOpacity
                style={{
                    marginTop: 16,
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}
                onPress={() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "LoginScreen" }],
                        })
                    );
                }}
            >
                <Icon name="logout" size={24} color="#000" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 16, color: "#000" }}>Sair</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

function MainApp() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
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
            <Drawer.Screen
                name="UsuarioScreen"
                component={UsuarioScreen}
                options={{
                    title: "Usuário",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="account" color={color} size={size} /> // Ícone ajustado para "account"
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
