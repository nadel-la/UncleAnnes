import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Menus({ navigation }) {
  const [products, setProducts] = useState([]);

  //   const singleTap = Gesture.Tap()
  //     .maxDuration(250)
  //     .onStart(() => {
  //       Alert.alert("Single tap!");
  //     });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://uncleannes.kasfi.site/uncleAnnes"
        );
        if (!response.ok) {
          throw { message: response.statusText };
        }
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  console.log(products);
  return (
    <>
      <View style={styles.yellowBox}>
        <FlatList
          data={products}
          renderItem={({ item }) => <Card product={item} />}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>

      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Go to Detail"
          onPress={() => navigation.navigate("Details", { id: 1 })}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    justifyContent: "center",
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
