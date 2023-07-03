import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../../components/Home";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import HomeScreen from "../screens/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12, position: "relative", top: -4.5 },
            headerShown: false,
            style: { height: 55, borderTopWidth: 0, elevation: 0 },
            tabBarShowLabel: false,
            tabBarActiveTintColor: COLORS.primaryYellow,
          }}
        >
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home-filled" color={color} size={28} />
              ),
              tabBarLabel: "Home",
            }}
          />

          <Tab.Screen
            name="LocalMall"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="local-mall" color={color} size={28} />
              ),
              tabBarLabel: "local",
            }}
          />

          <Tab.Screen
            name="Search"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderColor: COLORS.primaryYellow,
                    borderWidth: 2,
                    borderRadius: 30,
                    top: -27,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 1,
                      height: 5,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.8,
                  }}
                >
                  <Icon name="search" color={COLORS.primaryYellow} size={28} />
                </View>
              ),
              tabBarLabel: "search",
            }}
          />

          <Tab.Screen
            name="Favorite"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="favorite" color={color} size={28} />
              ),
              tabBarLabel: "Favorite",
            }}
          />
          <Tab.Screen
            name="Cart"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="shopping-cart" color={color} size={28} />
              ),
              tabBarLabel: "Home",
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}
