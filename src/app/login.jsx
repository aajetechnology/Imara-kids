
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    // Connect your authentication API here.
    Alert.alert("Login", "Connect your backend authentication endpoint here.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={25} color="#102A25" />
          </TouchableOpacity>

          {/* Branding */}
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>Imara</Text>
            <Text style={styles.kids}>Kids</Text>
            <Text style={styles.tagline}>Learn • Play • Grow</Text>
          </View>

          {/* Welcome text */}
          <View style={styles.heading}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Ready for another day of learning and fun?
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Ionicons name="school" size={64} color="#00834C" />
            </View>
            <View style={styles.starOne}>
              <Ionicons name="star" size={25} color="#FFBD21" />
            </View>
            <View style={styles.starTwo}>
              <Ionicons name="star" size={19} color="#B58AE8" />
            </View>
          </View>

          {/* Login form */}
          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#747B7B"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#747B7B"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color="#747B7B"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => router.push("/forgot-password")}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}
            onPress={() => router.push("/dashboard")}
            >Login</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Registration link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?{" "}
            </Text>
            <Text
              style={styles.registerLink}
              onPress={() => router.push("/student-details")}
            >
              Sign Up
            </Text>
          </View>

          <Text style={styles.footer}>
            Learn • Play • Grow with Imara Kids
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  back: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginTop: 5,
  },
  brandContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  brand: {
    fontSize: 42,
    lineHeight: 47,
    fontWeight: "900",
    color: "#00834C",
  },
  kids: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
    color: "#FFB900",
  },
  tagline: {
    fontSize: 14,
    fontWeight: "700",
    color: "#075E42",
    marginTop: 3,
  },
  heading: {
    marginTop: 27,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "900",
    color: "#073B25",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#65656B",
    marginTop: 7,
  },
  illustrationContainer: {
    height: 155,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  illustrationCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#DDF2E6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 3,
  },
  starOne: {
    position: "absolute",
    top: 20,
    right: "20%",
  },
  starTwo: {
    position: "absolute",
    bottom: 18,
    left: "20%",
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#173B2D",
    marginTop: 5,
  },
  inputContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderWidth: 1,
    borderColor: "#E5E1DB",
    borderRadius: 16,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#102A25",
  },
  forgotContainer: {
    alignSelf: "flex-end",
    paddingVertical: 6,
  },
  forgot: {
    color: "#00834C",
    fontSize: 13,
    fontWeight: "700",
  },
  button: {
    height: 55,
    borderRadius: 30,
    backgroundColor: "#00834C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 23,
  },
  registerText: {
    color: "#243A34",
    fontSize: 13,
  },
  registerLink: {
    color: "#00834C",
    fontWeight: "bold",
    fontSize: 13,
  },
  footer: {
    textAlign: "center",
    color: "#92928D",
    fontSize: 11,
    marginTop: 25,
  },
});