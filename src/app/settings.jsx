
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [classReminders, setClassReminders] = useState(true);
  const [assignmentReminders, setAssignmentReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const showComingSoon = (feature) => {
    Alert.alert(feature, "This feature will be available soon!");
  };

  const confirmLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out of Imara Kids?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log out",
          style: "destructive",
          onPress: () => {
            // Connect this to your authentication logout flow.
            router.replace("/");
          },
        },
      ]
    );
  };

  const SettingRow = ({
    icon,
    iconColor = "#00834C",
    iconBg = "#E4F5E9",
    title,
    subtitle,
    onPress,
    right,
    showArrow = true,
  }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={21} color={iconColor} />
      </View>

      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      {right ? (
        right
      ) : showArrow ? (
        <Ionicons name="chevron-forward" size={18} color="#A3AEA5" />
      ) : null}
    </TouchableOpacity>
  );

  const ToggleRow = ({
    icon,
    iconColor,
    iconBg,
    title,
    subtitle,
    value,
    onValueChange,
  }) => (
    <SettingRow
      icon={icon}
      iconColor={iconColor}
      iconBg={iconBg}
      title={title}
      subtitle={subtitle}
      showArrow={false}
      right={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#D7DDD7", true: "#A4D9B4" }}
          thumbColor={value ? "#00834C" : "#F5F5F5"}
        />
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF9F1"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#073B25" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Make Imara yours! 🌈
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="settings" size={23} color="#00834C" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => router.push("/profile")}
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={31} color="#00834C" />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>My Account</Text>
            <Text style={styles.profileSubtitle}>
              View and update your profile
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#A3AEA5"
          />
        </TouchableOpacity>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications 🔔</Text>
        <View style={styles.sectionCard}>
          <ToggleRow
            icon="notifications-outline"
            iconColor="#00834C"
            iconBg="#E4F5E9"
            title="Push Notifications"
            subtitle="Receive updates from Imara"
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />

          <View style={styles.separator} />

          <ToggleRow
            icon="videocam-outline"
            iconColor="#7770D6"
            iconBg="#E9E8FF"
            title="Class Reminders"
            subtitle="Get reminders before lessons"
            value={classReminders}
            onValueChange={setClassReminders}
          />

          <View style={styles.separator} />

          <ToggleRow
            icon="document-text-outline"
            iconColor="#E5A12C"
            iconBg="#FFF0D9"
            title="Assignment Reminders"
            subtitle="Never miss a due date"
            value={assignmentReminders}
            onValueChange={setAssignmentReminders}
          />
        </View>

        {/* App preferences */}
        <Text style={styles.sectionTitle}>App Preferences 🎨</Text>
        <View style={styles.sectionCard}>
          <ToggleRow
            icon="volume-high-outline"
            iconColor="#E0784D"
            iconBg="#FFE9E0"
            title="Sound Effects"
            subtitle="Play sounds when using the app"
            value={soundEffects}
            onValueChange={setSoundEffects}
          />

          <View style={styles.separator} />

          <ToggleRow
            icon="moon-outline"
            iconColor="#7770D6"
            iconBg="#E9E8FF"
            title="Dark Mode"
            subtitle="Use a darker appearance"
            value={darkMode}
            onValueChange={setDarkMode}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="language-outline"
            iconColor="#3995C4"
            iconBg="#E4F3FA"
            title="Language"
            subtitle="English"
            onPress={() =>
              showComingSoon("Language Settings")
            }
          />
        </View>

        {/* Account & Privacy */}
        <Text style={styles.sectionTitle}>Account & Privacy 🔐</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            icon="person-circle-outline"
            iconColor="#00834C"
            iconBg="#E4F5E9"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => router.push("/profile")}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="lock-closed-outline"
            iconColor="#7770D6"
            iconBg="#E9E8FF"
            title="Privacy & Safety"
            subtitle="Learn how your information is protected"
            onPress={() => showComingSoon("Privacy & Safety")}
          />

          <View style={styles.separator} />

          <SettingRow
  icon="shield-checkmark-outline"
  iconColor="#3995C4"
  iconBg="#E4F3FA"
  title="Parent Controls"
  subtitle="Link and manage your parent account"
  onPress={() => router.push("/parent-controls")}
/>
        </View>

        {/* Support */}
        <Text style={styles.sectionTitle}>Help & Support 💚</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            icon="help-circle-outline"
            iconColor="#E5A12C"
            iconBg="#FFF0D9"
            title="Help Centre"
            subtitle="Get answers to your questions"
            onPress={() => showComingSoon("Help Centre")}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="chatbubble-ellipses-outline"
            iconColor="#00834C"
            iconBg="#E4F5E9"
            title="Contact Support"
            subtitle="Talk to the Imara support team"
            onPress={() => showComingSoon("Contact Support")}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="information-circle-outline"
            iconColor="#7770D6"
            iconBg="#E9E8FF"
            title="About Imara Kids"
            subtitle="Learn more about the app"
            onPress={() =>
              Alert.alert(
                "About Imara Kids",
                "Imara Kids helps children learn, practise, and grow. Version 1.0.0"
              )
            }
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={21} color="#D94C4C" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Imara Kids • Version 1.0.0
        </Text>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/dashboard")}
        >
          <Ionicons name="home-outline" size={23} color="#8C9A90" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/classes")}
        >
          <Ionicons name="book-outline" size={23} color="#8C9A90" />
          <Text style={styles.navText}>Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/calendar")}
        >
          <Ionicons name="calendar-outline" size={23} color="#8C9A90" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={23} color="#8C9A90" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: "#073B25",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#89958C",
    fontSize: 12,
    marginTop: 3,
  },
  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#E4F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 23,
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 18,
    backgroundColor: "#E4F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#073B25",
    fontSize: 15,
    fontWeight: "800",
  },
  profileSubtitle: {
    color: "#89958C",
    fontSize: 11,
    marginTop: 5,
  },
  sectionTitle: {
    color: "#073B25",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 11,
    marginTop: 3,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    paddingHorizontal: 13,
    marginBottom: 22,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 11,
  },
  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    color: "#173D29",
    fontSize: 13,
    fontWeight: "700",
  },
  settingSubtitle: {
    color: "#89958C",
    fontSize: 10,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F2ED",
    marginLeft: 54,
  },
  logoutButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF0EF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 2,
  },
  logoutText: {
    color: "#D94C4C",
    fontSize: 14,
    fontWeight: "800",
  },
  versionText: {
    textAlign: "center",
    color: "#A5AEA7",
    fontSize: 11,
    marginTop: 16,
  },
  bottomSpace: {
    height: 20,
  },
  bottomNav: {
    height: 67,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F1EC",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: "#8C9A90",
    fontWeight: "600",
  },
});