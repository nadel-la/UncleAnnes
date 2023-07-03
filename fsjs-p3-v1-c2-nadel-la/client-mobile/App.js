import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import Home from "./components/Home";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import DetailScreen from "./src/views/screens/DetailScreen";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // // <GestureHandlerRootView>
    // <NavigationContainer>
    //   <View style={styles.container}>
    //     <MainStack />
    //     <StatusBar style="auto" />
    //   </View>
    // </NavigationContainer>
    // // </GestureHandlerRootView>
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" /> */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="BoardScreen"
        >
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{ headerShown: true, title: "Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    flex: 1,
    backgroundColor: "green",
  },

  yellowBox: {
    flex: 2,
    backgroundColor: "white",
    padding: 5,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
