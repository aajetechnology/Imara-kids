
import { router } from "expo-router";
import { useState } from "react";
import {
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
import { Ionicons } from "react-native-vector-icons";

export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState(null);

  const student = {
    name: "Tomi",
    className: "Primary 4",
    school: "Imara Learning School",
    points: 320,
    lessons: 24,
    quizzes: 18,
    streak: 7,
  };

  const menuItems = [
    {
      title: "My Learning Progress",
      subtitle: "See your learning achievements",
      icon: "stats-chart-outline",
      color: "#E7F5EA",
      route: "/dashboard",
    },
    {
      title: "My Classes",
      subtitle: "View your lessons and subjects",
      icon: "book-outline",
      color: "#FFF0D9",
      route: "/classes",
    },
    {
      title: "My Calendar",
      subtitle: "Check your upcoming activities",
      icon: "calendar-outline",
      color: "#E9E8FF",
      route: "/calendar",
    },
    {
      title: "My Rewards",
      subtitle: "View your badges and points",
      icon: "trophy-outline",
      color: "#FFE9E0",
      route: "/rewards",
    },
  ];

  const openMenu = (route) => {
    router.push(route);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Profile</Text>
            <Text style={styles.headerSubtitle}>
              Your little learning world
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push("/settings") }
          >
            <Ionicons name="settings-outline" size={23} color="#073B25" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={48} color="#00834C" />
              </View>
            )}

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() =>
                Alert.alert(
                  "Profile photo",
                  "Connect your Expo Image Picker here to change your photo."
                )
              }
            >
              <Ionicons name="camera" size={17} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentClass}>{student.className}</Text>

          <View style={styles.schoolRow}>
            <Ionicons name="school-outline" size={15} color="#64806F" />
            <Text style={styles.schoolText}>{student.school}</Text>
          </View>

          <View style={styles.memberBadge}>
            <Ionicons name="star" size={14} color="#D99B13" />
            <Text style={styles.memberText}>Little Star Learner</Text>
          </View>
        </View>

        {/* Points */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsIcon}>
            <Ionicons name="star" size={27} color="#F5B72D" />
          </View>

          <View style={styles.pointsInfo}>
            <Text style={styles.pointsLabel}>My total points</Text>
            <Text style={styles.pointsValue}>
              {student.points} <Text style={styles.pts}>pts</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.pointsButton}
            onPress={() => router.push("/rewards")}
          >
            <Text style={styles.pointsButtonText}>View rewards</Text>
            <Ionicons name="chevron-forward" size={16} color="#00834C" />
          </TouchableOpacity>
        </View>

        {/* Learning Stats */}
        <Text style={styles.sectionTitle}>My Learning Journey</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E4F5E9" }]}>
              <Ionicons name="book" size={23} color="#00834C" />
            </View>
            <Text style={styles.statValue}>{student.lessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF0D9" }]}>
              <Ionicons name="school" size={23} color="#E5A12C" />
            </View>
            <Text style={styles.statValue}>{student.quizzes}</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FDE8E4" }]}>
              <Ionicons name="flame" size={23} color="#F0784C" />
            </View>
            <Text style={styles.statValue}>{student.streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
        </View>

        {/* Menu */}
        <Text style={styles.sectionTitle}>My Account</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index !== menuItems.length - 1 && styles.menuBorder,
              ]}
              onPress={() => openMenu(item.route)}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#073B25"
                />
              </View>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#9BA99F"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help */}
        <TouchableOpacity
          style={styles.helpCard}
          onPress={() =>
            Alert.alert("Help & Support", "Contact your parent or school support team.")
          }
        >
          <View style={styles.helpIcon}>
            <Ionicons name="help-circle-outline" size={23} color="#00834C" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Need Help?</Text>
            <Text style={styles.menuSubtitle}>
              Ask for help with your learning app
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#9BA99F" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={21} color="#D94C4C" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Imara Kids • Version 1.0.0</Text>
      </ScrollView>

      {/* Bottom Navigation */}
       <View style={styles.bottomNav}>
        {[
          { name: "Home", icon: "home-outline", route: "/dashboard" },
          { name: "Classes", icon: "book-outline", route: "/classes" },
          {
            name: "Calendar",
            icon: "calendar",
            route: "/calendar",
          },
          { name: "Rewards", icon: "star-outline", route: "/rewards" },
          { name: "Profile", icon: "person-outline", route: "/profile" },
        ].map((item) => {
          const active = item.name === "Calendar";

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => {
                if (!active) router.push(item.route);
              }}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={active ? "#00834C" : "#9299A1"}
              />
              <Text
                style={[
                  styles.navText,
                  active && styles.activeNavText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#073B25",
  },
  headerSubtitle: {
    color: "#819084",
    fontSize: 13,
    marginTop: 4,
  },
  settingsButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#A9A092",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 4,
    borderColor: "#E1F2E5",
  },
  avatarPlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 4,
    borderColor: "#E1F2E5",
    backgroundColor: "#F0F8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00834C",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  studentName: {
    fontSize: 21,
    fontWeight: "800",
    color: "#073B25",
    textAlign: "center",
  },
  studentClass: {
    color: "#00834C",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
  schoolRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  schoolText: {
    color: "#819084",
    fontSize: 12,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#FFF5D9",
    marginTop: 13,
  },
  memberText: {
    color: "#A8760A",
    fontSize: 12,
    fontWeight: "700",
  },
  pointsCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#073B25",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  pointsIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsInfo: {
    flex: 1,
    marginLeft: 12,
  },
  pointsLabel: {
    color: "#D6E8DC",
    fontSize: 12,
  },
  pointsValue: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 2,
  },
  pts: {
    fontSize: 12,
    fontWeight: "500",
    color: "#D6E8DC",
  },
  pointsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 2,
  },
  pointsButtonText: {
    color: "#00834C",
    fontSize: 11,
    fontWeight: "800",
  },
  sectionTitle: {
    marginHorizontal: 22,
    marginTop: 24,
    marginBottom: 12,
    color: "#073B25",
    fontSize: 17,
    fontWeight: "800",
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  statIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#073B25",
  },
  statLabel: {
    fontSize: 11,
    color: "#819084",
    marginTop: 3,
  },
  menuCard: {
    marginHorizontal: 20,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2ED",
  },
  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: "#173D29",
    fontSize: 13,
    fontWeight: "700",
  },
  menuSubtitle: {
    color: "#91A095",
    fontSize: 11,
    marginTop: 4,
  },
  helpCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  helpIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#E7F5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 51,
    backgroundColor: "#FFF0EF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
    marginTop: 15,
    marginBottom: 20,
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
  activeNavText: {
    color: "#00834C",
    fontWeight: "800",
  },
});