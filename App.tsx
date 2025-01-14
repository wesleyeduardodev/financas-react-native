import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Home} from "./src/screens/components/Home";
import {CategoryScreen} from "./src/screens/components/CategoryScreen";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Expenses"
            screenOptions={{
                tabBarStyle: {backgroundColor: "#4CAF50"},
                tabBarActiveTintColor: "#FFF",
                tabBarIndicatorStyle: {backgroundColor: "#FFF"},
            }}
        >
            <Tab.Screen
                name="Expenses"
                component={Home}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon name="attach-money" size={20} color={color}/> // Ícone relacionado a finanças
                    ),
                    tabBarLabel: "Registro Financeiro", // Novo rótulo
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon name="category" size={20} color={color}/> // Ícone de categorias
                    ),
                    tabBarLabel: "Categorias", // Novo rótulo
                }}
            />

            {/* Aba Bike - opcional */}
            <Tab.Screen
                name="Subcategories"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon name="subdirectory-arrow-right" size={20} color={color}/> // Ícone para subcategorias
                    ),
                    tabBarLabel: "Subcategorias", // Novo rótulo
                }}
            />

        </Tab.Navigator>
    );
}

// Configuração do Drawer Navigator
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {backgroundColor: "#f4f4f4", width: 240},
                    headerStyle: {backgroundColor: "#4CAF50"},
                    headerTintColor: "#FFF",
                }}
            >
                {/* Tela principal que exibe as abas */}
                <Drawer.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        drawerIcon: ({color}) => (
                            <Icon name="home" size={20} color={color}/>
                        ),
                        title: "Início",
                    }}
                />
                {/* Tela de Categorias como uma opção no Drawer */}
                <Drawer.Screen
                    name="Categories"
                    component={CategoryScreen}
                    options={{
                        drawerIcon: ({color}) => (
                            <Icon name="category" size={20} color={color}/>
                        ),
                        title: "Categorias",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
