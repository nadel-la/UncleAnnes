import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Cards from "../components/Cards";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../query/food";

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_ITEMS, {
    pollInterval: 500,
  });

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primaryYellow} />
      </View>
    );
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header}>
          <View>
            {/*  */}
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 28 }}>Hai,</Text>
              <Text
                style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}
              >
                Nadel
              </Text>
            </View>
            <Text style={{ marginTop: 10, fontSize: 20, color: COLORS.grey }}>
              What do you want today?
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/user.png")}
              style={{ width: 56, height: 56, borderRadius: 80 }}
            />
          </View>
        </View>
        <View
          style={{
            // marginTop: 40,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            // backgroundColor: "blue",
          }}
        >
          <View style={styles.inputContainer}>
            <Icon name="search" size={28} />
            <TextInput
              style={{ flex: 1, fontSize: 18, marginLeft: 10 }}
              placeholder="Search Your Pretzel"
            ></TextInput>
          </View>
          <View style={styles.sortBtn}>
            <Icon name="tune" size={25} color={"white"} />
          </View>
        </View>

        <View style={{ flex: 5 }}>
          <FlatList
            data={data?.items}
            renderItem={({ item }) => <Cards food={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            key={2}
          ></FlatList>
          {/* {foods.map((food, index) => {
            console.log(food);
            return <Cards key={index} food={food} />;
          })} */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // backgroundColor: "yellow",
  },
  inputContainer: {
    flex: 2,
    height: 50,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primaryYellow,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
