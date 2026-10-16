
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
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
import { images } from "../constants/images";

export default function StudentDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow gallery access to select a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    router.push({
      pathname: "/select-class",
      params: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        profilePic: profilePic || "",
      },
    });
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

          <View style={styles.progress}>
            <View style={styles.activeProgress} />
            <View style={styles.inactiveProgress} />
            <View style={styles.inactiveProgress} />
            <View style={styles.inactiveProgress} />
          </View>

          <Text style={styles.title}>
            Create Your{"\n"}Child's Account
          </Text>

          <Text style={styles.subtitle}>
            Let's set up a fun learning profile!
          </Text>

          {/* Selectable profile picture */}
          <TouchableOpacity
            style={styles.avatar}
            onPress={pickImage}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Choose a profile picture"
          >
            <Image
              source={
                profilePic
                  ? { uri: profilePic }
                  : images.primary4
              }
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={19} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.avatarHint}>
            Tap to add a profile picture
          </Text>

          {/* Registration form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#747B7B" />
              <TextInput
                style={styles.input}
                placeholder="Child's Full Name"
                placeholderTextColor="#777777"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#747B7B" />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#777777"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#747B7B" />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#777777"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#747B7B" />
              <TextInput
                style={styles.input}
                placeholder="Create a Password"
                placeholderTextColor="#777777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/select-class")}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.login}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => router.push("/login")}
            >
              Login
            </Text>
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
    paddingBottom: 20,
  },
  back: {
    marginTop: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  progress: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 25,
  },
  activeProgress: {
    width: 35,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#00834C",
  },
  inactiveProgress: {
    width: 8,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#D8D8D8",
  },
  title: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "900",
    color: "#073B25",
  },
  subtitle: {
    fontSize: 15,
    color: "#65656B",
    marginTop: 7,
  },
  avatar: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D5ECF9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 5,
    position: "relative",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#00834C",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarHint: {
    textAlign: "center",
    color: "#777777",
    fontSize: 12,
    marginBottom: 16,
  },
  form: {
    gap: 11,
  },
  inputContainer: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E1DB",
    borderRadius: 16,
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#102A25",
  },
  button: {
    height: 54,
    borderRadius: 30,
    backgroundColor: "#00834C",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  login: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: "#243A34",
  },
  loginLink: {
    color: "#00834C",
    fontWeight: "bold",
  },
});