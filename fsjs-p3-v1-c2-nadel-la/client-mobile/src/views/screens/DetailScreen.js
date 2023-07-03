import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { useQuery } from "@apollo/client";
import { GET_ITEMS_BY_ID } from "../../query/food";

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_ITEMS_BY_ID, {
    variables: { itemId: id },
    pollInterval: 500,
  });
  // console.log(data?.item);
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
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image
            source={{ uri: data?.item.imgUrl }}
            style={{ height: 250, width: 250, borderRadius: 30 }}
          />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {data?.item.name}
            </Text>

            <View style={styles.iconContainer}>
              <Icon
                name="favorite-border"
                color={COLORS.primaryYellow}
                size={25}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.grey,
              // flex: 1,
              height: 28,
              maxWidth: 150,
              borderRadius: 15,
              flexDirection: "row",
              backgroundColor: COLORS.primaryBlue,
              alignItems: "center",
              paddingHorizontal: 15,
              marginTop: -10,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "white",
              }}
            >
              {data?.item.Category.name}
            </Text>
          </View>
          <Text style={styles.description}>{data?.item.description}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: 18 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.primaryBlue,
                  marginBottom: 10,
                }}
              >
                Ingredients
              </Text>
              {data?.item.Ingredients.map((ingredient, index) => {
                return (
                  <Text
                    key={index}
                    style={{ fontSize: 16, fontWeight: 500, color: "white" }}
                  >
                    {"\u2022"} {ingredient.name}
                  </Text>
                );
              })}
            </View>
            <View style={{ marginTop: 18, marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.primaryBlue,
                  marginBottom: 10,
                }}
              >
                Posted By
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
                {data?.item.user.email}
              </Text>
            </View>
            <View style={{ marginTop: 18, marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: COLORS.primaryBlue,
                  marginBottom: 10,
                }}
              >
                Additional Image
              </Text>
              {data?.item.AdditionalImages.map((image, index) => {
                return (
                  <Text
                    key={index}
                    style={{ fontSize: 16, fontWeight: 500, color: "white" }}
                  >
                    {"\u2022"} {image.id}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primaryYellow,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  description: {
    marginTop: 20,
    lineHeight: 20,
    fontSize: 15,
    color: "white",
  },
});

//
