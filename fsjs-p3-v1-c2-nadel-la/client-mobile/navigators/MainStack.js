import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Menus from "../components/Menus";
import Details from "../components/Detail";

export default function MainStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#edac1b",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Menus" component={Menus} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </>
  );
}
