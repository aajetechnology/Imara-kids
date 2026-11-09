import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";
import { useRegistration } from "../context/RegisterationContext";
import { getClasses, registerStudent, uploadStudentProfileImage } from "../services/api";


// Match backend class names to your existing local images.
const classImages = {
  "Nursery 1": images.nursery1,
  "Nursery 2": images.nursery2,
  "Primary 1": images.primary1,
  "Primary 2": images.primary2,
  "Primary 3": images.primary3,
  "Primary 4": images.primary4,
  "Primary 5": images.primary5,
};

export default function SelectClassScreen() {
  const { registration } = useRegistration();
  const submissionLock = useRef(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Load classes from the backend.
  const loadClasses = async () => {
    try {
      setIsLoading(true);
      setLoadError("");

      const response = await getClasses();

      if (!Array.isArray(response)) {
        throw new Error("Invalid class list received from the server.");
      }

      const formattedClasses = response.map((item) => ({
        id: String(item.id),
        name: item.name,
        image: classImages[item.name],
        group: item.section?.toUpperCase() || "",
      }));

      setClasses(formattedClasses);

      // Keep a previously selected class if it still exists.
      const previousClassId = Array.isArray(params.classId)
        ? params.classId[0]
        : params.classId;

      if (
        previousClassId &&
        formattedClasses.some((item) => item.id === String(previousClassId))
      ) {
        setSelectedClass(String(previousClassId));
      }
    } catch (error) {
      console.error("Class loading error:", error);
      setLoadError(error.message || "Unable to load classes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  // Continue after selecting a class.
 const handleContinue = async () => {
  if (submissionLock.current) return;

  if (!selectedClass) return;

  const chosenClass = classes.find(
    (item) => item.id === selectedClass
  );

  if (!chosenClass) return;

  if (!registration) {
    Alert.alert(
      "Registration error",
      "Student details are missing. Please go back and try again."
    );
    return;
  }

  submissionLock.current = true;
  setIsSubmitting(true);

  try {
    const response = await registerStudent({
      email: registration.email,
      password: registration.password,
      confirm_password: registration.password,
      first_name: registration.firstName,
      last_name: registration.lastName,
      phone: registration.phone,
      class_id: Number(chosenClass.id),
    });

    await SecureStore.setItemAsync(
      "access_token",
      response.access_token
    );

    let imageUploadFailed = false;
    if(registration.profilePic){
      try{
        await uploadStudentProfileImage(
          registration.profilePic,
          response.access_token
        );
        console.log("Profile profile uploaded successfully.");

      }catch(imageError){
        console.error("profile picture upload failed:", imageError);
        imageUploadFailed = true
      }
    }

    const navigateToDashboard = () => {
  router.replace({
    pathname: "/dashboard",
    params: {
      ...params,
      classId: chosenClass.id,
      className: chosenClass.name,
    },
  });
};

if (imageUploadFailed) {
  Alert.alert(
    "Account created successfully",
    "Your account is ready, but your profile picture could not be uploaded. You can try again from your profile.",
    [
      {
        text: "Continue",
        onPress: navigateToDashboard,
      },
    ],
    { cancelable: false }
  );
} else {
  navigateToDashboard();
}

  } catch (error) {
    Alert.alert("Registration failed", error.message);

  } finally {
    submissionLock.current = false;
    setIsSubmitting(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={21} color="#073B25" />
        </TouchableOpacity>

        <View style={styles.stepWrapper}>
          <Text style={styles.stepText}>STEP 2 OF 3</Text>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.eyebrow}>YOUR LEARNING JOURNEY</Text>

            <Text style={styles.title}>
              Select Your{"\n"}
              <Text style={styles.titleAccent}>Class</Text>
            </Text>

            <Text style={styles.subtitle}>
              Which class are you in? Choose one to get started.
            </Text>
          </View>

          <View style={styles.decorContainer}>
            <Text style={styles.star}>✦</Text>
            <Text style={styles.decorBear}>🌟</Text>
            <View style={styles.decorDot} />
          </View>
        </View>

        {/* Selection helper */}
        <View style={styles.helperCard}>
          <View style={styles.helperIcon}>
            <Ionicons name="school-outline" size={20} color="#00834C" />
          </View>

          <Text style={styles.helperText}>
            Pick the class you are currently attending.
          </Text>
        </View>

        {/* Class options */}
        <View style={styles.classList}>
          <Text style={styles.sectionTitle}>Nursery & Primary</Text>

          {/* Loading state */}
          {isLoading && (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#00834C" />
              <Text style={styles.stateText}>
                Loading available classes...
              </Text>
            </View>
          )}

          {/* Error state */}
          {!isLoading && loadError !== "" && (
            <View style={styles.stateContainer}>
              <Ionicons
                name="cloud-offline-outline"
                size={35}
                color="#D97757"
              />

              <Text style={styles.errorText}>{loadError}</Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={loadClasses}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={16} color="#FFFFFF" />
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Empty state */}
          {!isLoading && !loadError && classes.length === 0 && (
            <View style={styles.stateContainer}>
              <Ionicons
                name="school-outline"
                size={35}
                color="#829087"
              />
              <Text style={styles.stateText}>
                No classes are currently available.
              </Text>
            </View>
          )}

          {/* Dynamic classes from backend */}
          {!isLoading &&
            !loadError &&
            classes.map((item) => {
              const isSelected = selectedClass === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.82}
                  onPress={() => setSelectedClass(item.id)}
                  style={[
                    styles.classItem,
                    isSelected && styles.selectedClassItem,
                  ]}
                >
                  <View
                    style={[
                      styles.animalContainer,
                      isSelected && styles.selectedAnimalContainer,
                    ]}
                  >
                    {item.image ? (
                      <Image
                        source={item.image}
                        style={styles.animal}
                        resizeMode="contain"
                      />
                    ) : (
                      <Ionicons
                        name="school-outline"
                        size={30}
                        color="#00834C"
                      />
                    )}
                  </View>

                  <View style={styles.classInfo}>
                    <Text
                      style={[
                        styles.className,
                        isSelected && styles.selectedClassName,
                      ]}
                    >
                      {item.name}
                    </Text>

                    <Text style={styles.classDescription}>
                      {item.group === "NURSERY"
                        ? "Let's learn and play"
                        : "Ready to explore and grow"}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.radioSelected,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color="#FFFFFF"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        {selectedClass ? (
          <Text style={styles.selectedHint}>
            Selected:{" "}
            {classes.find((item) => item.id === selectedClass)?.name}
          </Text>
        ) : (
          <Text style={styles.selectedHint}>
            {isLoading
              ? "Loading classes..."
              : "Please select your current class"}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedClass || isLoading || loadError) &&
              styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedClass || isLoading || !!loadError || isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />

          ) : (
            <Text style={styles.continueText}>Cotinue</Text>
          )}

          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={17} color="#00834C" />
          </View>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          You can ask your parent or teacher if you need help.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },

  header: {
    height: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0EAE1",
    alignItems: "center",
    justifyContent: "center",
  },

  stepWrapper: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    gap: 6,
  },

  stepText: {
    fontSize: 9,
    color: "#829087",
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  progressTrack: {
    height: 5,
    width: 105,
    backgroundColor: "#E7EAE4",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "66%",
    height: "100%",
    backgroundColor: "#00834C",
    borderRadius: 10,
  },

  headerSpacer: {
    width: 42,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 14,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  titleContainer: {
    flex: 1,
  },

  eyebrow: {
    color: "#00834C",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 9,
  },

  title: {
    fontSize: 32,
    lineHeight: 37,
    fontWeight: "900",
    color: "#073B25",
    letterSpacing: -1,
  },

  titleAccent: {
    color: "#00834C",
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#7A847D",
    marginTop: 9,
    maxWidth: 260,
  },

  decorContainer: {
    width: 76,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  decorBear: {
    fontSize: 43,
  },

  star: {
    position: "absolute",
    color: "#F4B544",
    fontSize: 24,
    top: 0,
    right: 3,
  },

  decorDot: {
    position: "absolute",
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#F4B544",
    bottom: 3,
    left: 4,
  },

  helperCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF5EB",
    borderRadius: 15,
    padding: 12,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "#DCEEDF",
  },

  helperIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  helperText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#37644A",
    lineHeight: 18,
  },

  classList: {
    gap: 10,
  },

  sectionTitle: {
    color: "#073B25",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 3,
  },

  classItem: {
    minHeight: 72,
    borderRadius: 17,
    borderWidth: 1.2,
    borderColor: "#EEE8DF",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  selectedClassItem: {
    borderColor: "#00834C",
    backgroundColor: "#F0F9F1",
    borderWidth: 1.8,
  },

  animalContainer: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFF3E3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    overflow: "hidden",
  },

  selectedAnimalContainer: {
    backgroundColor: "#DFF1E3",
  },

  animal: {
    width: 46,
    height: 46,
  },

  classInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },

  className: {
    fontSize: 14,
    fontWeight: "800",
    color: "#183C2B",
  },

  selectedClassName: {
    color: "#00834C",
  },

  classDescription: {
    fontSize: 10,
    color: "#929B94",
    fontWeight: "500",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: "#C9D0C9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginLeft: 8,
  },

  radioSelected: {
    backgroundColor: "#00834C",
    borderColor: "#00834C",
  },

  stateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
    paddingHorizontal: 15,
    gap: 12,
  },

  stateText: {
    fontSize: 12,
    color: "#829087",
    textAlign: "center",
  },

  errorText: {
    fontSize: 12,
    color: "#B4533C",
    textAlign: "center",
    lineHeight: 19,
  },

  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#00834C",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 20,
  },

  bottomBar: {
    paddingHorizontal: 22,
    paddingTop: 11,
    paddingBottom: 10,
    backgroundColor: "#FFF9F2",
    borderTopWidth: 1,
    borderTopColor: "#F0EAE1",
  },

  selectedHint: {
    fontSize: 11,
    color: "#78847B",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 9,
  },

  continueButton: {
    minHeight: 54,
    backgroundColor: "#00834C",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    paddingHorizontal: 20,
  },

  disabledButton: {
    backgroundColor: "#AABDB0",
  },

  continueText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 11,
  },

  footerText: {
    color: "#9AA29B",
    fontSize: 10,
    textAlign: "center",
    marginTop: 9,
  },
});