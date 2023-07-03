import React from "react";
import { Text, StyleSheet, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import PrimaryButton from "../../components/Button";

export default function OnBoardScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 400 }}>
        <Image
          style={{
            width: "90%",
            alignSelf: "center",
            resizeMode: "contain",
            top: -150,
          }}
          source={require("../../assets/onboard2.png")}
        />
      </View>
      <View>
        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Uncle Anne's
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 15,
              color: COLORS.grey,
              marginTop: 20,
            }}
          >
            Always fresh out of the oven, our pretzels raise the standard of
            snacking. Whatever mood you're in, there's a pretzel for you.
          </Text>
        </View>

        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator}></View>
          <View style={styles.indicator}></View>
          <View style={styles.indicator}></View>
        </View>

        <PrimaryButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          title="Get Started"
        />
      </View>
    </SafeAreaView>

    // <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    //   <View style={{ height: 400 }}>
    //     <Image
    //       style={{
    //         width: "100%",
    //         resizeMode: "contain",
    //         top: -150,
    //       }}
    //       // source={require("../../assets/onboardImage.png")}
    //     />
    //   </View>
    //   <View style={style.textContainer}>
    //     <View>
    //       <Text
    //         style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}
    //       >
    //         Delicious Food
    //       </Text>
    //       <Text
    //         style={{
    //           marginTop: 20,
    //           fontSize: 18,
    //           textAlign: "center",
    //           color: COLORS.grey,
    //         }}
    //       >
    //         We help you to find best and delicious food
    //       </Text>
    //     </View>
    //     <View style={style.indicatorContainer}>
    //       <View style={style.currentIndicator} />
    //       <View style={style.indicator} />
    //       <View style={style.indicator} />
    //     </View>
    //     {/* <PrimaryButton
    //       onPress={() => navigation.navigate("Home")}
    //       title="Get Started"
    //     /> */}
    //   </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primaryYellow,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});
