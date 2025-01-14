import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./src/screens/components/Home";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

// Configuração das abas
function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Car" // Define a aba "Car" como inicial
            screenOptions={{
                tabBarStyle: { backgroundColor: "#4CAF50" },
                tabBarActiveTintColor: "#FFF",
                tabBarIndicatorStyle: { backgroundColor: "#FFF" },
            }}
        >
            {/* Aba Car que mostra o componente Home */}
            <Tab.Screen
                name="Car"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="directions-car" size={20} color={color} />
                    ),
                    tabBarLabel: "Carro",
                }}
            />
            {/* Aba Train que mostra o componente CategoryScreen */}
            <Tab.Screen
                name="Train"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="train" size={20} color={color} />
                    ),
                    tabBarLabel: "Trem",
                }}
            />
            {/* Aba Bike - opcional */}
            <Tab.Screen
                name="Bike"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="directions-bike" size={20} color={color} />
                    ),
                    tabBarLabel: "Bicicleta",
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
                    drawerStyle: { backgroundColor: "#f4f4f4", width: 240 },
                    headerStyle: { backgroundColor: "#4CAF50" },
                    headerTintColor: "#FFF",
                }}
            >
                {/* Tela principal que exibe as abas */}
                <Drawer.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="home" size={20} color={color} />
                        ),
                        title: "Início",
                    }}
                />
                {/* Tela de Categorias como uma opção no Drawer */}
                <Drawer.Screen
                    name="Categories"
                    component={CategoryScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="category" size={20} color={color} />
                        ),
                        title: "Categorias",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
