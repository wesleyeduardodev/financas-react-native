import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./src/screens/components/Home";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { FinancialSummary } from "./src/screens/components/FinancialSummary"; // Importando o resumo financeiro
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Expenses"
            screenOptions={{
                tabBarStyle: { backgroundColor: "#1144bd" },
                tabBarActiveTintColor: "#FFF",
                tabBarIndicatorStyle: { backgroundColor: "#FFF" },
                swipeEnabled: false, // Desativando o swipe entre as telas
            }}
        >
            <Tab.Screen
                name="Expenses"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="attach-money" size={20} color={color} />
                    ),
                    tabBarLabel: "Registro Financeiro",
                }}
            />
            <Tab.Screen
                name="Summary"
                component={FinancialSummary}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="bar-chart" size={20} color={color} />
                    ),
                    tabBarLabel: "Resumo Financeiro",
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="category" size={20} color={color} />
                    ),
                    tabBarLabel: "Categorias",
                }}
            />
            <Tab.Screen
                name="Subcategories"
                component={SubCategoriesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="subdirectory-arrow-right" size={20} color={color} />
                    ),
                    tabBarLabel: "SubCategorias",
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: { backgroundColor: "#f4f4f4", width: 240 },
                    headerStyle: { backgroundColor: "#1144bd" },
                    headerTintColor: "#FFF",
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="home" size={20} color={color} />
                        ),
                        title: "Menus",
                    }}
                />
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