import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./src/screens/components/Home";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen"; // Importando a tela de subcategorias

const Drawer = createDrawerNavigator();

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
                    component={Home}
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
                {/* Tela de Subcategorias como uma nova opção no Drawer */}
                <Drawer.Screen
                    name="Subcategories"
                    component={SubCategoriesScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="subdirectory-arrow-right" size={20} color={color} />
                        ),
                        title: "Subcategorias",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
