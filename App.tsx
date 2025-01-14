import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./src/screens/components/Home";
import { CategoryScreen } from "./src/screens/components/CategoryScreen";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "#4CAF50" },
                tabBarActiveTintColor: "#FFF",
                tabBarIndicatorStyle: { backgroundColor: "#FFF" },
                tabBarIconStyle: { size: 20 },
            }}
        >
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
