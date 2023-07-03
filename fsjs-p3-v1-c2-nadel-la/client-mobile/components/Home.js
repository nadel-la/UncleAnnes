import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { Image } from "expo-image";

export default function Home({ navigation }) {
  return (
    <>
      <View style={styles.banner}>
        <Image
          style={styles.image}
          source={
            "https://www.auntieannes.com/-/media/auntie-annes/campaigns/dragonfruit-2023/0101_1050806890_c2_dragonfruitmango_desktop-1440x470.jpg?v=1&d=20230420T121947Z"
          }
          contentFit="cover"
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Go to Menus"
          onPress={() => navigation.navigate("Menus")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    flex: 1,
    backgroundColor: "green",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
