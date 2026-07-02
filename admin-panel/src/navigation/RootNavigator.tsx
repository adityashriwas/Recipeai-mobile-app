import React from "react";
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import CategoriesStack from "./CategoriesStack";
import UsersScreen from "../screens/UsersScreen";
import OrdersStack from "./OrdersStack";
import Ionicons from "@expo/vector-icons/Ionicons";

type RootTabParamList = {
  CategoriesTab: undefined;
  UsersTab: undefined;
  OrdersTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<
            keyof RootTabParamList,
            {
              focused: keyof typeof Ionicons.glyphMap;
              unfocused: keyof typeof Ionicons.glyphMap;
            }
          > = {
            CategoriesTab: { focused: "list", unfocused: "list-outline" },
            UsersTab: { focused: "people", unfocused: "people-outline" },
            OrdersTab: { focused: "cart", unfocused: "cart-outline" },
          };

          const iconName = focused
            ? icons[route.name].focused
            : icons[route.name].unfocused;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesStack}
        options={{ title: "Categories" }}
      />
      <Tab.Screen
        name="UsersTab"
        component={UsersScreen}
        options={{ title: "Users" }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{ title: "Orders" }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
