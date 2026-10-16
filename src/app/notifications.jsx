
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
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const initialNotifications = [
  {
    id: "1",
    type: "class",
    title: "Your live class is starting!",
    message: "Your Mathematics class with your tutor starts in 15 minutes.",
    time: "5 minutes ago",
    date: "Today",
    icon: "videocam",
    color: "#E4F5E9",
    iconColor: "#00834C",
    unread: true,
  },
  {
    id: "2",
    type: "quiz",
    title: "A new quiz is waiting!",
    message: "A new English Language quiz has been added to your class.",
    time: "30 minutes ago",
    date: "Today",
    icon: "help-circle",
    color: "#FFF0D9",
    iconColor: "#E5A12C",
    unread: true,
  },
  {
    id: "3",
    type: "reward",
    title: "You earned a new reward!",
    message: "Congratulations! You have earned 50 learning points.",
    time: "2 hours ago",
    date: "Today",
    icon: "trophy",
    color: "#FFE9E0",
    iconColor: "#EF8454",
    unread: true,
  },
  {
    id: "4",
    type: "assignment",
    title: "Assignment reminder",
    message: "Remember to complete your Basic Science assignment.",
    time: "4 hours ago",
    date: "Today",
    icon: "document-text",
    color: "#E9E8FF",
    iconColor: "#7770D6",
    unread: false,
  },
  {
    id: "5",
    type: "announcement",
    title: "School announcement",
    message: "Your school has shared a new announcement. Check it out!",
    time: "Yesterday",
    date: "Yesterday",
    icon: "megaphone",
    color: "#E4F3FA",
    iconColor: "#3995C4",
    unread: false,
  },
  {
    id: "6",
    type: "class",
    title: "Your lesson is ready",
    message: "Your recorded Mathematics lesson is now available.",
    time: "Yesterday",
    date: "Yesterday",
    icon: "play-circle",
    color: "#E4F5E9",
    iconColor: "#00834C",
    unread: false,
  },
];

const filters = ["All", "Unread", "Read"];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "Unread") return n.unread;
    if (activeFilter === "Read") return !n.unread;
    return true;
  });

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((n) => ({ ...n, unread: false }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const clearAll = () => {
    Alert.alert(
      "Clear notifications",
      "Are you sure you want to remove all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear all",
          style: "destructive",
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const handleNotificationPress = (item) => {
    markAsRead(item.id);

    if (item.type === "reward") {
      router.push("/rewards");
    } else if (item.type === "class") {
      router.push("/classes");
    } else if (item.type === "quiz" || item.type === "assignment") {
      router.push("/classes");
    } else {
      Alert.alert(item.title, item.message);
    }
  };

  const renderNotification = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.notificationCard,
        item.unread && styles.unreadCard,
      ]}
      activeOpacity={0.75}
      onPress={() => handleNotificationPress(item)}
    >
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: item.color },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={23}
          color={item.iconColor}
        />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationTitleRow}>
          <Text style={styles.notificationTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationMessage} numberOfLines={3}>
          {item.message}
        </Text>

        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={17}
        color="#A5B0A8"
      />
    </TouchableOpacity>
  );

  const todayNotifications = filteredNotifications.filter(
    (n) => n.date === "Today"
  );
  const yesterdayNotifications = filteredNotifications.filter(
    (n) => n.date === "Yesterday"
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#073B25" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            Stay updated on your learning
          </Text>
        </View>

        <View style={styles.bellWrapper}>
          <Ionicons name="notifications" size={23} color="#00834C" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>
              Hello, Little Star! 🌟
            </Text>
            <Text style={styles.summarySubtitle}>
              You have {unreadCount} unread{" "}
              {unreadCount === 1 ? "notification" : "notifications"}.
            </Text>
            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.markReadButton}
                onPress={markAllAsRead}
              >
                <Text style={styles.markReadText}>Mark all as read</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.summaryIllustration}>
            <Ionicons name="mail-open" size={43} color="#F5B72D" />
            <View style={styles.sparkle}>
              <Ionicons name="sparkles" size={18} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Filter */}
        <View style={styles.filterHeader}>
          <Text style={styles.sectionTitle}>Your Updates</Text>
          {notifications.length > 0 && (
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

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
                {filter === "Unread" ? ` (${unreadCount})` : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications */}
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="notifications-off-outline"
                size={45}
                color="#00834C"
              />
            </View>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyMessage}>
              You don't have any {activeFilter.toLowerCase()} notifications
              right now. Keep learning and check back later!
            </Text>
          </View>
        ) : (
          <>
            {todayNotifications.length > 0 && (
              <View>
                <Text style={styles.dateHeading}>Today</Text>
                {todayNotifications.map(renderNotification)}
              </View>
            )}

            {yesterdayNotifications.length > 0 && (
              <View>
                <Text style={styles.dateHeading}>Yesterday</Text>
                {yesterdayNotifications.map(renderNotification)}
              </View>
            )}
          </>
        )}

        <View style={styles.bottomSpace} />
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "#073B25",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#87958B",
    fontSize: 12,
    marginTop: 3,
  },
  bellWrapper: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#E6F4E9",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: "#F06A55",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF9F1",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  summaryCard: {
    backgroundColor: "#073B25",
    borderRadius: 23,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  summarySubtitle: {
    color: "#D4E8D9",
    fontSize: 12,
    marginTop: 7,
  },
  markReadButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 11,
    marginTop: 13,
  },
  markReadText: {
    color: "#00834C",
    fontSize: 11,
    fontWeight: "800",
  },
  summaryIllustration: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "#155438",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    position: "relative",
  },
  sparkle: {
    position: "absolute",
    top: 3,
    right: 3,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#073B25",
    fontSize: 18,
    fontWeight: "800",
  },
  clearText: {
    color: "#D66A58",
    fontSize: 12,
    fontWeight: "700",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 18,
  },
  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  activeFilter: {
    backgroundColor: "#00834C",
  },
  filterText: {
    color: "#748278",
    fontSize: 12,
    fontWeight: "700",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  dateHeading: {
    color: "#87958B",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 6,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F1EA",
  },
  unreadCard: {
    backgroundColor: "#FBFFFA",
    borderColor: "#CBE8D2",
  },
  notificationIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  notificationTitle: {
    flex: 1,
    color: "#173D29",
    fontSize: 13,
    fontWeight: "800",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00834C",
  },
  notificationMessage: {
    color: "#829087",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  notificationTime: {
    color: "#A4ADA6",
    fontSize: 10,
    marginTop: 7,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
  },
  emptyIcon: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: "#E7F5EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    color: "#073B25",
    fontWeight: "800",
  },
  emptyMessage: {
    color: "#87958B",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
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