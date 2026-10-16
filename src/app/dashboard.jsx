
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const COLORS = {
  green: "#00834C",
  darkGreen: "#073B25",
  cream: "#FFF9F1",
  grey: "#777777",
  lightGreen: "#E4F5E9",
};

const subjects = [
  {
    name: "English Language",
    grade: "Primary 1",
    progress: 65,
    icon: "book",
    color: "#FFF0CF",
    iconColor: "#F4A900",
  },
  {
    name: "Mathematics",
    grade: "Primary 1",
    progress: 40,
    icon: "calculator",
    color: "#FCE0E9",
    iconColor: "#E94F9A",
  },
  {
    name: "Science",
    grade: "Primary 1",
    progress: 20,
    icon: "flask",
    color: "#DDF1FC",
    iconColor: "#159AC8",
  },
];

export default function Dashboard() {
  const studentName = "Tomi";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Image
              source={require("../../assets/images/pr4.png")}
              style={styles.profile}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.greetingText}>Good morning,</Text>
              <Text style={styles.studentName}>
                {studentName} <Text style={styles.wave}>👋</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.notification}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons name="notifications" size={23} color="#102A25" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Learning progress card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Keep Learning!</Text>
              <Text style={styles.heroSubtitle}>
                You are doing great!
              </Text>
            </View>
            <Ionicons name="trophy" size={59} color="#FFB900" />
          </View>

          <View style={styles.levelRow}>
            <View style={styles.levelIcon}>
              <Ionicons name="star" size={23} color="#FFB900" />
            </View>
            <Text style={styles.levelText}>Level 3</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.points}>120 / 200 points</Text>

          <View style={styles.heroDecoration}>
            <Ionicons name="sparkles" size={25} color="#FFFFFF" />
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/classes")}
          >
            <View style={[styles.quickIcon, { backgroundColor: "#DDF5FA" }]}>
              <Ionicons name="book" size={28} color="#159AC8" />
            </View>
            <Text style={styles.quickLabel}>My Classes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/quizzes")}
          >
            <View style={[styles.quickIcon, { backgroundColor: "#F0E3FF" }]}>
              <Ionicons name="game-controller" size={28} color="#9060D8" />
            </View>
            <Text style={styles.quickLabel}>Quizzes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/assignments")}
          >
            <View style={[styles.quickIcon, { backgroundColor: "#FFE8DC" }]}>
              <Ionicons name="clipboard" size={28} color="#ED8A42" />
            </View>
            <Text style={styles.quickLabel}>Assignments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => router.push("/rewards")}
          >
            <View style={[styles.quickIcon, { backgroundColor: "#FFF0D4" }]}>
              <Ionicons name="star" size={28} color="#F4A900" />
            </View>
            <Text style={styles.quickLabel}>Rewards</Text>
          </TouchableOpacity>
        </View>

        {/* Today's class */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Class</Text>
          <TouchableOpacity onPress={() => router.push("/classes")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.todayCard}
          onPress={() => router.push("/classes")}
          activeOpacity={0.85}
        >
          <View style={styles.subjectIcon}>
            <Ionicons name="book" size={25} color="#DB4196" />
          </View>
          <View style={styles.todayDetails}>
            <Text style={styles.todayTitle}>English Language</Text>
            <Text style={styles.todayTime}>10:00 AM · Live Class</Text>
          </View>
          <View style={styles.joinButton}>
            <Text style={styles.joinText}>Join</Text>
          </View>
        </TouchableOpacity>

        {/* Subject progress */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity onPress={() => router.push("/classes")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.name}
            style={styles.subjectCard}
            onPress={() => router.push("/classes")}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.subjectIcon,
                { backgroundColor: subject.color },
              ]}
            >
              <Ionicons
                name={subject.icon}
                size={29}
                color={subject.iconColor}
              />
            </View>

            <View style={styles.subjectInfo}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectGrade}>{subject.grade}</Text>
              <View style={styles.subjectProgressTrack}>
                <View
                  style={[
                    styles.subjectProgressFill,
                    {
                      width: `${subject.progress}%`,
                      backgroundColor: subject.iconColor,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.percent}>{subject.progress}%</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom navigation */}
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
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profile: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#D5ECF9",
  },
  greetingText: {
    fontSize: 13,
    color: "#34443E",
  },
  studentName: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.darkGreen,
    marginTop: 2,
  },
  wave: {
    fontSize: 16,
  },
  notification: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF438C",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  heroCard: {
    backgroundColor: "#9363D7",
    borderRadius: 20,
    padding: 17,
    marginBottom: 17,
    overflow: "hidden",
    elevation: 3,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: "#F7F0FF",
    fontSize: 13,
    marginTop: 3,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 9,
    marginBottom: 8,
  },
  levelIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF30",
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#FFFFFF70",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  points: {
    textAlign: "right",
    color: "#FFFFFF",
    fontSize: 10,
    marginTop: 6,
  },
  heroDecoration: {
    position: "absolute",
    left: 12,
    bottom: 13,
    opacity: 0.16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 23,
    elevation: 2,
  },
  quickItem: {
    flex: 1,
    alignItems: "center",
    gap: 7,
  },
  quickIcon: {
    width: 51,
    height: 51,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    fontSize: 10,
    color: "#23342D",
    fontWeight: "600",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.darkGreen,
  },
  viewAll: {
    fontSize: 13,
    color: COLORS.green,
    fontWeight: "700",
  },
  todayCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#F0EBE5",
    marginBottom: 23,
    elevation: 2,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFE0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  todayDetails: {
    flex: 1,
    marginLeft: 11,
  },
  todayTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#17251F",
  },
  todayTime: {
    fontSize: 11,
    color: "#747474",
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: "#E83E91",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  joinText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#F0EBE5",
    marginBottom: 10,
    elevation: 2,
  },
  subjectInfo: {
    flex: 1,
    marginLeft: 11,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#17251F",
  },
  subjectGrade: {
    fontSize: 11,
    color: "#747474",
    marginTop: 3,
  },
  subjectProgressTrack: {
    height: 6,
    backgroundColor: "#ECECEC",
    borderRadius: 6,
    marginTop: 7,
    overflow: "hidden",
  },
  subjectProgressFill: {
    height: "100%",
    borderRadius: 6,
  },
  percent: {
    fontSize: 11,
    color: "#747474",
    marginLeft: 6,
  },
  bottomSpace: {
    height: 15,
  },
  bottomNav: {
    height: 67,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#EDEAE6",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  navText: {
    fontSize: 10,
    color: "#9299A1",
  },
  activeNavText: {
    color: COLORS.green,
    fontWeight: "800",
  },
});