
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const subjects = [
  {
    id: "1",
    title: "English Language",
    className: "Primary 1",
    progress: 65,
    icon: "book",
    color: "#FFE6A3",
    iconColor: "#E9A000",
    status: "Ongoing",
  },
  {
    id: "2",
    title: "Mathematics",
    className: "Primary 1",
    progress: 40,
    icon: "calculator",
    color: "#FAD8E7",
    iconColor: "#E84C9B",
    status: "Ongoing",
  },
  {
    id: "3",
    title: "Science",
    className: "Primary 1",
    progress: 20,
    icon: "flask",
    color: "#D7E9FF",
    iconColor: "#3685D8",
    status: "Ongoing",
  },
  {
    id: "4",
    title: "Creative Arts",
    className: "Primary 1",
    progress: 100,
    icon: "color-palette",
    color: "#FFE2D1",
    iconColor: "#E98235",
    status: "Completed",
  },
  {
    id: "5",
    title: "Basic Science",
    className: "Primary 1",
    progress: 0,
    icon: "leaf",
    color: "#DDF4D8",
    iconColor: "#43A047",
    status: "Upcoming",
  },
];

const filters = ["All", "Ongoing", "Completed"];

export default function ClassesScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSubjects =
    activeFilter === "All"
      ? subjects
      : subjects.filter((subject) => subject.status === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#102A25" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Classes</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={22} color="#102A25" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Class summary */}
        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Your Learning Journey</Text>
            <Text style={styles.summaryTitle}>Keep it up, Tomi! 👋</Text>
            <Text style={styles.summarySubtitle}>
              You are making great progress.
            </Text>
          </View>
          <View style={styles.summaryIcon}>
            <Ionicons name="school" size={32} color="#00834C" />
          </View>
          <View style={styles.summaryProgress}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: "45%" }]} />
            </View>
            <Text style={styles.summaryPercent}>45% overall progress</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subject list */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Subjects</Text>
          <Text style={styles.subjectCount}>
            {filteredSubjects.length} subjects
          </Text>
        </View>

        {filteredSubjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={styles.subjectCard}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/class-details",
                params: {
                  subject: subject.title,
                  className: subject.className,
                },
              })
            }
          >
            <View
              style={[
                styles.subjectIcon,
                { backgroundColor: subject.color },
              ]}
            >
              <Ionicons
                name={subject.icon}
                size={34}
                color={subject.iconColor}
              />
            </View>

            <View style={styles.subjectInfo}>
              <Text style={styles.subjectTitle}>{subject.title}</Text>
              <Text style={styles.subjectClass}>{subject.className}</Text>

              <View style={styles.progressRow}>
                <View style={styles.subjectProgressTrack}>
                  <View
                    style={[
                      styles.subjectProgressFill,
                      { width: `${subject.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {subject.progress}%
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        ))}

        {filteredSubjects.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="book-outline" size={45} color="#B9C5BD" />
            <Text style={styles.emptyText}>No subjects found</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", icon: "home-outline", route: "/dashboard" },
          { name: "Classes", icon: "book", route: "/classes" },
          { name: "Calendar", icon: "calendar-outline", route: "/calendar" },
          { name: "Rewards", icon: "star-outline", route: "/rewards" },
          { name: "Profile", icon: "person-outline", route: "/profile" },
        ].map((item) => {
          const active = item.name === "Classes";
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#102A25",
  },
  searchButton: {
    width: 38,
    height: 38,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 20,
  },
  summary: {
    backgroundColor: "#E6F6E9",
    padding: 18,
    borderRadius: 22,
    marginTop: 8,
    marginBottom: 22,
  },
  summaryLabel: {
    color: "#43815E",
    fontSize: 12,
    fontWeight: "600",
  },
  summaryTitle: {
    color: "#073B25",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 5,
  },
  summarySubtitle: {
    fontSize: 12,
    color: "#5E7065",
    marginTop: 5,
  },
  summaryIcon: {
    position: "absolute",
    right: 18,
    top: 22,
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryProgress: {
    marginTop: 18,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#C8E5D0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00834C",
    borderRadius: 10,
  },
  summaryPercent: {
    fontSize: 11,
    color: "#39714F",
    marginTop: 7,
    fontWeight: "700",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 22,
  },
  filterButton: {
    flex: 1,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F1F2",
  },
  activeFilter: {
    backgroundColor: "#00834C",
  },
  filterText: {
    fontSize: 12,
    color: "#4D535B",
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#102A25",
  },
  subjectCount: {
    fontSize: 12,
    color: "#7C8580",
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0ECE6",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  subjectIcon: {
    width: 66,
    height: 66,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#102A25",
  },
  subjectClass: {
    fontSize: 12,
    color: "#65656B",
    marginTop: 4,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  subjectProgressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#E9E9E9",
    borderRadius: 8,
    overflow: "hidden",
  },
  subjectProgressFill: {
    height: "100%",
    backgroundColor: "#76C98B",
    borderRadius: 8,
  },
  progressText: {
    fontSize: 10,
    color: "#7C8580",
    width: 28,
  },
  empty: {
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    color: "#777",
    marginTop: 10,
  },
  bottomNav: {
    height: 67,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEAE5",
    paddingBottom: 5,
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
    color: "#00834C",
    fontWeight: "800",
  },
});