
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const COLORS = {
  background: "#FFF9F2",
  green: "#00834C",
  darkGreen: "#073B25",
  text: "#183B2B",
  muted: "#819087",
  white: "#FFFFFF",
  lightGreen: "#E7F5EC",
  border: "#E8EEE8",
  orange: "#FFF1D9",
  blue: "#E8F4FB",
};

export default function ParentControlsScreen() {
  const [qrValue, setQrValue] = useState("");
  const [isParentLinked, setIsParentLinked] = useState(false);
  const [parentName, setParentName] = useState("");

  // UI prototype only:
  // Replace this with a backend request that creates a secure,
  // single-use, short-lived parent-link token.
  const generateQRCode = () => {
    const demoToken = `imara://parent-link/demo-${Date.now()}`;
    setQrValue(demoToken);
  };

  const unlinkParent = () => {
    Alert.alert(
      "Unlink parent?",
      "Your parent will no longer be able to view your learning progress through this connection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unlink",
          style: "destructive",
          onPress: () => {
            setIsParentLinked(false);
            setParentName("");
            setQrValue("");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.darkGreen} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Parent Controls</Text>

        <View style={styles.headerRight}>
          <Ionicons name="shield-checkmark" size={23} color={COLORS.green} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <View style={styles.heroIllustration}>
            <View style={styles.heroCircle}>
              <Ionicons name="people" size={49} color={COLORS.green} />
            </View>
            <View style={styles.heartBubble}>
              <Ionicons name="heart" size={18} color="#F27C73" />
            </View>
            <View style={styles.starBubble}>
              <Ionicons name="star" size={17} color="#E6A72E" />
            </View>
          </View>

          <Text style={styles.heroTitle}>Stay connected!</Text>
          <Text style={styles.heroDescription}>
            Connect your parent’s account so they can follow your learning
            journey, celebrate your achievements, and support you.
          </Text>
        </View>

        {isParentLinked ? (
          <View style={styles.linkedCard}>
            <View style={styles.linkedIcon}>
              <Ionicons
                name="checkmark-circle"
                size={30}
                color={COLORS.green}
              />
            </View>

            <Text style={styles.linkedTitle}>Parent connected</Text>
            <Text style={styles.linkedDescription}>
              Your parent’s account is linked to your Imara Kids account.
            </Text>

            <View style={styles.parentInfo}>
              <View style={styles.parentAvatar}>
                <Ionicons
                  name="person"
                  size={25}
                  color={COLORS.green}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.parentLabel}>Linked parent</Text>
                <Text style={styles.parentName}>{parentName || "Parent"}</Text>
              </View>
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.green}
              />
            </View>

            <TouchableOpacity
              style={styles.unlinkButton}
              onPress={unlinkParent}
            >
              <Ionicons
                name="link-outline"
                size={18}
                color="#D64B4B"
              />
              <Text style={styles.unlinkText}>Unlink parent</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.qrCard}>
              <View style={styles.cardHeading}>
                <View style={styles.headingIcon}>
                  <Ionicons
                    name="qr-code-outline"
                    size={22}
                    color={COLORS.green}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Link your parent</Text>
                  <Text style={styles.cardSubtitle}>
                    Let your parent scan your QR code
                  </Text>
                </View>
              </View>

              <View style={styles.qrContainer}>
                {qrValue ? (
                  <View style={styles.qrFrame}>
                    <QRCode
                      value={qrValue}
                      size={190}
                      color={COLORS.darkGreen}
                      backgroundColor="#FFFFFF"
                    />
                  </View>
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Ionicons
                      name="qr-code-outline"
                      size={78}
                      color="#A9BBAF"
                    />
                    <Text style={styles.qrPlaceholderText}>
                      Your QR code will appear here
                    </Text>
                  </View>
                )}
              </View>

              {qrValue ? (
                <View style={styles.expiryNotice}>
                  <Ionicons
                    name="information-circle-outline"
                    size={17}
                    color="#A66A12"
                  />
                  <Text style={styles.expiryText}>
                    Demo QR code only. Real codes should expire after a short
                    time and be validated by the server.
                  </Text>
                </View>
              ) : (
                <Text style={styles.qrHint}>
                  Generate a QR code and ask your parent to scan it using
                  the Imara Parent App.
                </Text>
              )}

              <TouchableOpacity
                style={styles.generateButton}
                onPress={generateQRCode}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={qrValue ? "refresh-outline" : "qr-code"}
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.generateButtonText}>
                  {qrValue ? "Generate new QR code" : "Generate QR code"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.stepsCard}>
              <Text style={styles.stepsTitle}>How to connect</Text>

              <View style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepTextWrap}>
                  <Text style={styles.stepTitle}>
                    Open the Imara Parent App
                  </Text>
                  <Text style={styles.stepDescription}>
                    Ask your parent to sign in to their account.
                  </Text>
                </View>
                <Ionicons
                  name="phone-portrait-outline"
                  size={23}
                  color="#7AA18A"
                />
              </View>

              <View style={styles.stepDivider} />

              <View style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepTextWrap}>
                  <Text style={styles.stepTitle}>Scan your QR code</Text>
                  <Text style={styles.stepDescription}>
                    Your parent selects “Link a Child” and scans this code.
                  </Text>
                </View>
                <Ionicons
                  name="scan-outline"
                  size={23}
                  color="#7AA18A"
                />
              </View>

              <View style={styles.stepDivider} />

              <View style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepTextWrap}>
                  <Text style={styles.stepTitle}>Confirm the connection</Text>
                  <Text style={styles.stepDescription}>
                    Follow the confirmation steps in the Parent App.
                  </Text>
                </View>
                <Ionicons
                  name="checkmark-done-outline"
                  size={23}
                  color="#7AA18A"
                />
              </View>
            </View>
          </>
        )}

        <View style={styles.privacyNote}>
          <Ionicons
            name="lock-closed-outline"
            size={19}
            color={COLORS.green}
          />
          <Text style={styles.privacyText}>
            Your account is protected. Only approved parent accounts should
            be able to access your learning information.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.darkGreen,
  },
  headerRight: {
    width: 42,
    alignItems: "flex-end",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
  },
  hero: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 22,
  },
  heroIllustration: {
    width: 126,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heroCircle: {
    width: 91,
    height: 91,
    borderRadius: 46,
    backgroundColor: "#DDF2E4",
    alignItems: "center",
    justifyContent: "center",
  },
  heartBubble: {
    position: "absolute",
    right: 4,
    top: 11,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFE9E5",
    alignItems: "center",
    justifyContent: "center",
  },
  starBubble: {
    position: "absolute",
    left: 1,
    bottom: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF0D0",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.darkGreen,
    marginTop: 5,
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  qrCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  cardHeading: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
  },
  headingIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },
  qrContainer: {
    width: 224,
    height: 224,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F6FAF6",
    borderWidth: 1,
    borderColor: "#E4EEE6",
  },
  qrFrame: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
  },
  qrPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  qrPlaceholderText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 9,
    textAlign: "center",
  },
  qrHint: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 5,
  },
  expiryNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.orange,
    padding: 11,
    borderRadius: 12,
    marginTop: 14,
    gap: 7,
  },
  expiryText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: "#885B18",
  },
  generateButton: {
    width: "100%",
    height: 53,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    gap: 9,
  },
  generateButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.white,
  },
  stepsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    marginTop: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 17,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.green,
  },
  stepTextWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },
  stepDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 4,
  },
  stepDivider: {
    height: 1,
    backgroundColor: "#EDF1ED",
    marginVertical: 14,
    marginLeft: 46,
  },
  linkedCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  linkedIcon: {
    width: 65,
    height: 65,
    borderRadius: 23,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  linkedTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.darkGreen,
    marginTop: 14,
  },
  linkedDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 7,
  },
  parentInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6FAF6",
    borderRadius: 16,
    padding: 13,
    marginTop: 22,
    gap: 12,
  },
  parentAvatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#DDF2E4",
    alignItems: "center",
    justifyContent: "center",
  },
  parentLabel: {
    fontSize: 11,
    color: COLORS.muted,
  },
  parentName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 3,
  },
  unlinkButton: {
    height: 48,
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#FFF1F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    gap: 8,
  },
  unlinkText: {
    color: "#D64B4B",
    fontWeight: "800",
    fontSize: 14,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 5,
    marginTop: 19,
  },
  privacyText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.muted,
  },
});