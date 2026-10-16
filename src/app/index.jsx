
import { router } from "expo-router";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={images.splash}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={styles.container}>
        {/* Logo and App Name */}
        <View style={styles.top}>
          <Text style={styles.brand}>Imara</Text>
          <Text style={styles.kids}>Kids</Text>
          <Text style={styles.tagline}>
            Learn • Play • Grow
          </Text>
        </View>

        {/* Flexible space for the background illustration */}
        <View style={styles.spacer} />

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.push("/welcome")}
        >
          <Text style={styles.buttonText}>
            Get Started →
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 12,
  },

  top: {
    alignItems: "center",
    paddingTop: 15,
  },

  brand: {
    fontSize: 48,
    fontWeight: "900",
    color: "#00834C",
    lineHeight: 54,
  },

  kids: {
    fontSize: 38,
    fontWeight: "900",
    color: "#FFB900",
    lineHeight: 42,
  },

  tagline: {
    fontSize: 15,
    fontWeight: "700",
    color: "#075E42",
    marginTop: 5,
  },

  spacer: {
    flex: 1,
  },

  button: {
    width: "100%",
    backgroundColor: "#00834C",
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 4,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});