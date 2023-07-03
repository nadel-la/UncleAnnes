import { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";

export default function Details({ navigation, route }) {
  const { id } = route.params;
  // console.log(id, "<< ID");
  const [product, setProduct] = useState({});
  useEffect(() => {
    async function getProductById() {
      try {
        const response = await fetch(
          `https://uncleannes.kasfi.site/uncleAnnes/${id}`
        );
        if (!response.ok) {
          throw { message: response.statusText };
        }
        const jsonData = await response.json();
        setProduct(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    getProductById();
  }, []);
  // console.log(product, "<<<<");
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: product.imgUrl }}
            style={{ width: 200, height: 200, marginBottom: 30 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {product.name}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            {product.description}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            title="back to home again"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </>
  );
}
