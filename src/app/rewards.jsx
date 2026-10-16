
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

const COLORS = {
  green: "#00834C",
  darkGreen: "#073B25",
  cream: "#FFF9F1",
};

const rewards = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "footsteps",
    color: "#FFE6A3",
    iconColor: "#D99A00",
    unlocked: true,
    category: "Learning",
  },
  {
    id: "2",
    title: "Quiz Star",
    description: "Pass 5 quizzes",
    icon: "school",
    color: "#E8D9FF",
    iconColor: "#9562D5",
    unlocked: true,
    category: "Learning",
  },
  {
    id: "3",
    title: "Perfect Score",
    description: "Get 100% in a quiz",
    icon: "trophy",
    color: "#D7F1E2",
    iconColor: "#00834C",
    unlocked: false,
    category: "Learning",
  },
  {
    id: "4",
    title: "Book Worm",
    description: "Complete 10 lessons",
    icon: "book",
    color: "#DCEEFF",
    iconColor: "#3988D6",
    unlocked: false,
    category: "Learning",
  },
  {
    id: "5",
    title: "Super Learner",
    description: "Earn 500 points",
    icon: "flash",
    color: "#FFE1EC",
    iconColor: "#E64E91",
    unlocked: false,
    category: "Milestones",
  },
  {
    id: "6",
    title: "Consistency Star",
    description: "Learn for 7 days in a row",
    icon: "calendar",
    color: "#FFE8D8",
    iconColor: "#E68B42",
    unlocked: false,
    category: "Milestones",
  },
];

const filters = ["All", "Unlocked", "Locked"];

export default function RewardsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const totalPoints = 320;
  const nextRewardPoints = 500;
  const progress = totalPoints / nextRewardPoints;

  const filteredRewards = rewards.filter((reward) => {
    if (activeFilter === "Unlocked") return reward.unlocked;
    if (activeFilter === "Locked") return !reward.unlocked;
    return true;
  });

  const unlockedCount = rewards.filter((reward) => reward.unlocked).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#102A25" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rewards</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <View>
            <Text style={styles.greetingTitle}>You're Amazing! 🌟</Text>
            <Text style={styles.greetingSubtitle}>
              Keep learning and collecting rewards!
            </Text>
          </View>
          <View style={styles.greetingIcon}>
            <Ionicons name="gift" size={29} color="#EAA91B" />
          </View>
        </View>

        {/* Points card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsTop}>
            <View>
              <Text style={styles.pointsLabel}>Your Total Points</Text>
              <View style={styles.pointsRow}>
                <Ionicons name="star" size={29} color="#FFD34E" />
                <Text style={styles.pointsNumber}>{totalPoints}</Text>
              </View>
              <Text style={styles.pointsCaption}>
                You're doing a fantastic job!
              </Text>
            </View>
            <View style={styles.trophyCircle}>
              <Ionicons name="trophy" size={48} color="#FFD34E" />
            </View>
          </View>

          <View style={styles.pointsDivider} />

          <View style={styles.nextRewardRow}>
            <Text style={styles.nextRewardText}>Next milestone</Text>
            <Text style={styles.nextRewardValue}>
              {nextRewardPoints} points
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progress * 100, 100)}%` },
              ]}
            />
          </View>

          <Text style={styles.pointsRemaining}>
            {nextRewardPoints - totalPoints} more points to your next milestone!
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF0D0" }]}>
              <Ionicons name="ribbon" size={24} color="#E6A21A" />
            </View>
            <Text style={styles.statNumber}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>Badges Earned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E2F3E7" }]}>
              <Ionicons name="star" size={24} color="#00834C" />
            </View>
            <Text style={styles.statNumber}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#F0E4FF" }]}>
              <Ionicons name="medal" size={24} color="#9562D5" />
            </View>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Badge collection */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>My Badges 🏅</Text>
            <Text style={styles.sectionSubtitle}>
              Collect them all as you learn!
            </Text>
          </View>
          <Text style={styles.badgeCount}>
            {unlockedCount}/{rewards.length}
          </Text>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(filter)}
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

        {/* Reward cards */}
        <View style={styles.rewardsGrid}>
          {filteredRewards.map((reward) => (
            <View
              key={reward.id}
              style={[
                styles.rewardCard,
                !reward.unlocked && styles.lockedCard,
              ]}
            >
              <View
                style={[
                  styles.badgeCircle,
                  { backgroundColor: reward.color },
                  !reward.unlocked && styles.lockedBadge,
                ]}
              >
                <Ionicons
                  name={reward.unlocked ? reward.icon : "lock-closed"}
                  size={34}
                  color={reward.unlocked ? reward.iconColor : "#A8AAA8"}
                />
              </View>

              {reward.unlocked && (
                <View style={styles.unlockedMark}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
              )}

              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardDescription}>
                {reward.description}
              </Text>

              <View
                style={[
                  styles.statusPill,
                  reward.unlocked
                    ? styles.unlockedPill
                    : styles.lockedPill,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    reward.unlocked
                      ? styles.unlockedText
                      : styles.lockedText,
                  ]}
                >
                  {reward.unlocked ? "Unlocked" : "Locked"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {filteredRewards.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="ribbon-outline" size={45} color="#B8C2BA" />
            <Text style={styles.emptyTitle}>No badges here yet!</Text>
            <Text style={styles.emptyDescription}>
              Keep learning to unlock more badges.
            </Text>
          </View>
        )}

        {/* Motivation card */}
        <View style={styles.motivationCard}>
          <View style={styles.motivationIcon}>
            <Ionicons name="sparkles" size={28} color="#F4B82D" />
          </View>
          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>Keep Shining!</Text>
            <Text style={styles.motivationText}>
              Every lesson you complete brings you closer to a new
              achievement. You're doing great!
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", icon: "home-outline", route: "/dashboard" },
          { name: "Classes", icon: "book-outline", route: "/classes" },
          { name: "Calendar", icon: "calendar-outline", route: "/calendar" },
          { name: "Rewards", icon: "star", route: "/rewards" },
          { name: "Profile", icon: "person-outline", route: "/profile" },
        ].map((item) => {
          const active = item.name === "Rewards";

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
                color={active ? COLORS.green : "#9299A1"}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#102A25",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greeting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 19,
  },
  greetingTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.darkGreen,
  },
  greetingSubtitle: {
    fontSize: 12,
    color: "#737B76",
    marginTop: 5,
  },
  greetingIcon: {
    width: 51,
    height: 51,
    borderRadius: 17,
    backgroundColor: "#FFF0D0",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsCard: {
    backgroundColor: "#00834C",
    borderRadius: 22,
    padding: 18,
    marginBottom: 17,
    overflow: "hidden",
    elevation: 3,
  },
  pointsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsLabel: {
    color: "#E4F6E9",
    fontSize: 13,
    fontWeight: "600",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 5,
  },
  pointsNumber: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
  },
  pointsCaption: {
    color: "#D8F1E0",
    fontSize: 11,
    marginTop: 3,
  },
  trophyCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF25",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsDivider: {
    height: 1,
    backgroundColor: "#FFFFFF50",
    marginVertical: 15,
  },
  nextRewardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  nextRewardText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  nextRewardValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  progressTrack: {
    height: 9,
    backgroundColor: "#FFFFFF55",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFD34E",
    borderRadius: 10,
  },
  pointsRemaining: {
    color: "#E7F5EA",
    fontSize: 10,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0ECE6",
    elevation: 1,
  },
  statIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },
  statNumber: {
    color: "#102A25",
    fontSize: 19,
    fontWeight: "900",
  },
  statLabel: {
    color: "#7C8580",
    fontSize: 10,
    marginTop: 3,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.darkGreen,
    fontSize: 18,
    fontWeight: "900",
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#7C8580",
    marginTop: 4,
  },
  badgeCount: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "900",
    backgroundColor: "#E4F5E5",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#F0F1F0",
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  activeFilter: {
    backgroundColor: COLORS.green,
  },
  filterText: {
    color: "#626B65",
    fontSize: 12,
    fontWeight: "700",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  rewardCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F0ECE6",
    padding: 13,
    alignItems: "center",
    minHeight: 190,
    position: "relative",
    elevation: 2,
  },
  lockedCard: {
    backgroundColor: "#FCFBF9",
  },
  badgeCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  lockedBadge: {
    backgroundColor: "#F0F0F0",
    borderColor: "#F7F7F7",
  },
  unlockedMark: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardTitle: {
    color: "#102A25",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  rewardDescription: {
    color: "#818781",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 15,
    marginTop: 5,
    minHeight: 30,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 8,
  },
  unlockedPill: {
    backgroundColor: "#E4F5E9",
  },
  lockedPill: {
    backgroundColor: "#F0F0F0",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },
  unlockedText: {
    color: "#00834C",
  },
  lockedText: {
    color: "#858585",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#102A25",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  emptyDescription: {
    fontSize: 12,
    color: "#818781",
    textAlign: "center",
    marginTop: 5,
  },
  motivationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0D0",
    borderRadius: 18,
    padding: 15,
    marginTop: 22,
    gap: 12,
  },
  motivationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  motivationContent: {
    flex: 1,
  },
  motivationTitle: {
    color: "#805719",
    fontSize: 14,
    fontWeight: "900",
  },
  motivationText: {
    color: "#856D49",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
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
    color: COLORS.green,
    fontWeight: "800",
  },
});