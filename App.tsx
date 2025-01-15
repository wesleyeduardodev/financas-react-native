import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./src/screens/components/Home";
import { SubCategoriesScreen } from "./src/screens/components/SubCategoriesScreen";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";
import { FinancialSummary } from "./src/screens/components/FinancialSummary";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

// Log para detectar problemas na navegação de abas
function Tabs() {
    useEffect(() => {
        console.log("Tabs component initialized");
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Expenses"
            screenOptions={{
                tabBarStyle: { backgroundColor: "#1144bd" },
                tabBarActiveTintColor: "#FFF",
                tabBarIndicatorStyle: { backgroundColor: "#FFF" },
                swipeEnabled: false,
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
                listeners={{
                    focus: () => console.log("Navigated to Expenses tab"),
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
                listeners={{
                    focus: () => console.log("Navigated to Summary tab"),
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
                listeners={{
                    focus: () => console.log("Navigated to Categories tab"),
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
                listeners={{
                    focus: () => console.log("Navigated to Subcategories tab"),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    useEffect(() => {
        console.log("App component initialized");
    }, []);

    return (
        <NavigationContainer
            onReady={() => console.log("Navigation container ready")}
            onStateChange={(state) => console.log("Navigation state changed", state)}
        >
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
                    listeners={{
                        focus: () => console.log("Drawer navigated to Home"),
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
                    listeners={{
                        focus: () => console.log("Drawer navigated to Categories"),
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
                    listeners={{
                        focus: () => console.log("Drawer navigated to Subcategories"),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
