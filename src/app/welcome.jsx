
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";

export default function WelcomeScreen() {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            A Brighter Future for Your Child
          </Text>

          <Text style={styles.description}>
            Fun, safe and interactive learning for
            Nursery and Primary school.
          </Text>
        </View>

        {/* Welcome illustration */}
        <View style={[styles.imageContainer, { height: height * 0.53 }]}>
          <Image
            source={images.onboarding1}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/student-details")}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Next"
        >
          <Ionicons name="arrow-forward" size={23} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 12,
  },

  content: {
    flex: 1,
  },

  textContainer: {
    paddingTop: 35,
    paddingHorizontal: 8,
  },

  title: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "900",
    color: "#073B25",
    maxWidth: 300,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5E5E66",
    marginTop: 12,
    maxWidth: 290,
  },

  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  image: {
    width: "115%",
    height: "100%",
  },

  footer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  dots: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: "#00834C",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#D7D7D7",
  },

  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#00834C",
    alignItems: "center",
    justifyContent: "center",
  },
});