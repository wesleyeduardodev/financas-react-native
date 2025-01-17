import React, { useEffect } from "react";
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
    useEffect(() => {
        console.log("Log 1: Initializing Tabs Component"); // Log 1
    }, []);

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
                    tabBarIcon: ({ color }) => {
                        console.log("Log 2: Rendering Expenses Tab Icon"); // Log 2
                        return <Icon name="attach-money" size={20} color={color} />;
                    },
                    tabBarLabel: "Registro Financeiro",
                }}
            />
            <Tab.Screen
                name="Summary"
                component={FinancialSummary}
                options={{
                    tabBarIcon: ({ color }) => {
                        console.log("Log 3: Rendering Summary Tab Icon"); // Log 3
                        return <Icon name="bar-chart" size={20} color={color} />;
                    },
                    tabBarLabel: "Resumo Financeiro",
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => {
                        console.log("Log 4: Rendering Categories Tab Icon"); // Log 4
                        return <Icon name="category" size={20} color={color} />;
                    },
                    tabBarLabel: "Categorias",
                }}
            />
            <Tab.Screen
                name="Subcategories"
                component={SubCategoriesScreen}
                options={{
                    tabBarIcon: ({ color }) => {
                        console.log("Log 5: Rendering Subcategories Tab Icon"); // Log 5
                        return <Icon name="subdirectory-arrow-right" size={20} color={color} />;
                    },
                    tabBarLabel: "SubCategorias",
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    useEffect(() => {
        console.log("Log 6: Initializing App Component"); // Log 6
    }, []);

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
                        drawerIcon: ({ color }) => {
                            console.log("Log 7: Rendering Home Drawer Icon"); // Log 7
                            return <Icon name="home" size={20} color={color} />;
                        },
                        title: "Menus",
                    }}
                />
                <Drawer.Screen
                    name="Categories"
                    component={CategoryScreen}
                    options={{
                        drawerIcon: ({ color }) => {
                            console.log("Log 8: Rendering Categories Drawer Icon"); // Log 8
                            return <Icon name="category" size={20} color={color} />;
                        },
                        title: "Categorias",
                    }}
                />
                <Drawer.Screen
                    name="Subcategories"
                    component={SubCategoriesScreen}
                    options={{
                        drawerIcon: ({ color }) => {
                            console.log("Log 9: Rendering Subcategories Drawer Icon"); // Log 9
                            return <Icon name="subdirectory-arrow-right" size={20} color={color} />;
                        },
                        title: "Subcategorias",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
