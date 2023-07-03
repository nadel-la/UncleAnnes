import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

export default function Cards({ food }) {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailScreen", { id: food.id, item: food })
        }
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", top: -45 }}>
            <Image
              source={{ uri: food.imgUrl }}
              style={{ height: 120, width: 120, borderRadius: 18 }}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {food.name}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 2, color: COLORS.grey }}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Rp {food.price}
            </Text>
            <View style={styles.addToCard}>
              <Icon name="add" size={20} color={"white"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "dark-grey",
    shadowOffset: {
      width: 1,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  addToCard: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primaryYellow,
    justifyContent: "center",
    alignItems: "center",
  },
});
