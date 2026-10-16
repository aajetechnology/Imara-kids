
import { router } from "expo-router";
import { useMemo, useState } from "react";
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

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const sampleEvents = [
  {
    day: 5,
    title: "English Language",
    subtitle: "Alphabet and Phonics",
    time: "10:00 AM",
    type: "Live Class",
    icon: "videocam",
    color: "#E5F3FF",
    iconColor: "#3285D6",
  },
  {
    day: 8,
    title: "Mathematics Quiz",
    subtitle: "Addition and Subtraction",
    time: "11:30 AM",
    type: "Quiz",
    icon: "help-circle",
    color: "#F0E6FF",
    iconColor: "#9760D8",
  },
  {
    day: 12,
    title: "Science",
    subtitle: "Introduction to Plants",
    time: "9:00 AM",
    type: "Live Class",
    icon: "flask",
    color: "#E4F5E5",
    iconColor: "#389C57",
  },
  {
    day: 15,
    title: "English Assignment",
    subtitle: "Practice your handwriting",
    time: "2:00 PM",
    type: "Assignment",
    icon: "document-text",
    color: "#FFF0D9",
    iconColor: "#D99520",
  },
  {
    day: 20,
    title: "Creative Arts",
    subtitle: "Drawing and Colours",
    time: "10:30 AM",
    type: "Live Class",
    icon: "color-palette",
    color: "#FFE5F0",
    iconColor: "#D94F91",
  },
  {
    day: 25,
    title: "Mathematics",
    subtitle: "Shapes and Numbers",
    time: "12:00 PM",
    type: "Live Class",
    icon: "calculator",
    color: "#E5F3FF",
    iconColor: "#3285D6",
  },
];

export default function CalendarScreen() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const events = useMemo(() => {
    return sampleEvents
      .filter((event) => event.day <= daysInMonth)
      .filter((event) => event.day === selectedDate);
  }, [selectedDate, daysInMonth]);

  const allMonthEvents = sampleEvents.filter(
    (event) => event.day <= daysInMonth
  );

  const changeMonth = (offset) => {
    const nextMonth = new Date(year, month + offset, 1);
    setCurrentMonth(nextMonth);
    setSelectedDate(1);
  };

  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today.getDate());
  };

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#102A25" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Calendar</Text>

        <TouchableOpacity
          style={styles.todayButton}
          onPress={goToToday}
        >
          <Text style={styles.todayButtonText}>Today</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <View>
            <Text style={styles.greetingTitle}>Your Schedule 📅</Text>
            <Text style={styles.greetingSubtitle}>
              Plan your learning adventure!
            </Text>
          </View>
          <View style={styles.greetingIcon}>
            <Ionicons name="calendar" size={29} color="#00834C" />
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity
              style={styles.monthArrow}
              onPress={() => changeMonth(-1)}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color="#102A25"
              />
            </TouchableOpacity>

            <Text style={styles.monthTitle}>{monthName}</Text>

            <TouchableOpacity
              style={styles.monthArrow}
              onPress={() => changeMonth(1)}
            >
              <Ionicons
                name="chevron-forward"
                size={22}
                color="#102A25"
              />
            </TouchableOpacity>
          </View>

          {/* Weekdays */}
          <View style={styles.weekdays}>
            {WEEKDAYS.map((day) => (
              <View key={day} style={styles.weekdayCell}>
                <Text style={styles.weekdayText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar dates */}
          <View style={styles.daysGrid}>
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} style={styles.dayCell} />;
              }

              const isSelected = selectedDate === day;
              const isToday = isCurrentMonth && today.getDate() === day;
              const hasEvent = allMonthEvents.some(
                (event) => event.day === day
              );

              return (
                <TouchableOpacity
                  key={day}
                  style={styles.dayCell}
                  onPress={() => setSelectedDate(day)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.dayCircle,
                      isSelected && styles.selectedDay,
                      isToday && !isSelected && styles.todayDay,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText,
                        isToday && !isSelected && styles.todayDayText,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>

                  {hasEvent && (
                    <View
                      style={[
                        styles.eventDot,
                        isSelected && styles.selectedEventDot,
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>Activities</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.todayLegendDot} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </View>

        {/* Selected day events */}
        <View style={styles.eventsHeader}>
          <View>
            <Text style={styles.eventsTitle}>
              {isCurrentMonth && selectedDate === today.getDate()
                ? "Today's Activities"
                : `Activities for ${new Date(
                    year,
                    month,
                    selectedDate
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}`}
            </Text>
            <Text style={styles.eventsSubtitle}>
              {events.length === 0
                ? "Enjoy your free time!"
                : `${events.length} scheduled ${
                    events.length === 1 ? "activity" : "activities"
                  }`}
            </Text>
          </View>

          <View style={styles.eventCount}>
            <Text style={styles.eventCountText}>{events.length}</Text>
          </View>
        </View>

        {/* Event cards */}
        {events.length > 0 ? (
          events.map((event, index) => (
            <TouchableOpacity
              key={`${event.title}-${index}`}
              style={styles.eventCard}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/class-details",
                  params: { subject: event.title },
                })
              }
            >
              <View
                style={[
                  styles.eventIcon,
                  { backgroundColor: event.color },
                ]}
              >
                <Ionicons
                  name={event.icon}
                  size={25}
                  color={event.iconColor}
                />
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSubtitle}>
                  {event.subtitle}
                </Text>
                <View style={styles.eventMeta}>
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color="#737B76"
                  />
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <View style={styles.metaDivider} />
                  <Text style={styles.eventType}>{event.type}</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="sunny-outline"
                size={34}
                color="#DDAA42"
              />
            </View>
            <Text style={styles.emptyTitle}>No activities planned</Text>
            <Text style={styles.emptySubtitle}>
              There's nothing scheduled for this day. Enjoy your day
              and get ready for more learning!
            </Text>
          </View>
        )}

        {/* Upcoming */}
        <View style={styles.upcomingHeader}>
          <Text style={styles.eventsTitle}>Upcoming Activities</Text>
          <Text style={styles.upcomingHint}>This month</Text>
        </View>

        {allMonthEvents
          .filter((event) => event.day > selectedDate)
          .slice(0, 3)
          .map((event, index) => (
            <TouchableOpacity
              key={`upcoming-${index}`}
              style={styles.upcomingCard}
              onPress={() => setSelectedDate(event.day)}
              activeOpacity={0.8}
            >
              <View style={styles.upcomingDate}>
                <Text style={styles.upcomingDay}>{event.day}</Text>
                <Text style={styles.upcomingMonth}>
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </Text>
              </View>

              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{event.title}</Text>
                <Text style={styles.upcomingTime}>
                  {event.time} · {event.type}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9299A1"
              />
            </TouchableOpacity>
          ))}

        <View style={{ height: 20 }} />
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
  todayButton: {
    backgroundColor: "#E5F3E9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayButtonText: {
    color: "#00834C",
    fontSize: 12,
    fontWeight: "800",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#073B25",
  },
  greetingSubtitle: {
    fontSize: 13,
    color: "#6D756F",
    marginTop: 5,
  },
  greetingIcon: {
    width: 52,
    height: 52,
    backgroundColor: "#E4F5E5",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0ECE6",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  monthArrow: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F5F6F5",
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#102A25",
  },
  weekdays: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayCell: {
    width: "14.2857%",
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: {
    fontSize: 11,
    color: "#92999A",
    fontWeight: "700",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.2857%",
    height: 49,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  dayText: {
    color: "#273B32",
    fontSize: 13,
    fontWeight: "600",
  },
  selectedDay: {
    backgroundColor: "#00834C",
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: "#00834C",
  },
  todayDayText: {
    color: "#00834C",
    fontWeight: "900",
  },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#F2B83D",
    position: "absolute",
    bottom: 1,
  },
  selectedEventDot: {
    backgroundColor: "#00834C",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    marginTop: 13,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F0EC",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#F2B83D",
  },
  todayLegendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#00834C",
  },
  legendText: {
    fontSize: 11,
    color: "#737B76",
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 13,
  },
  eventsTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#102A25",
  },
  eventsSubtitle: {
    color: "#838983",
    fontSize: 12,
    marginTop: 4,
  },
  eventCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E4F5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  eventCountText: {
    color: "#00834C",
    fontWeight: "900",
    fontSize: 12,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#F0ECE6",
    marginBottom: 11,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  eventIcon: {
    width: 53,
    height: 53,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: "#102A25",
    fontWeight: "900",
    fontSize: 13,
  },
  eventSubtitle: {
    color: "#707771",
    fontSize: 11,
    marginTop: 4,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 5,
  },
  eventTime: {
    color: "#737B76",
    fontSize: 10,
  },
  metaDivider: {
    height: 10,
    width: 1,
    backgroundColor: "#D3D6D2",
    marginHorizontal: 3,
  },
  eventType: {
    color: "#00834C",
    fontSize: 10,
    fontWeight: "700",
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    borderWidth: 1,
    borderColor: "#F0ECE6",
  },
  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#FFF5DC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    color: "#102A25",
    fontWeight: "900",
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#777E78",
    textAlign: "center",
    lineHeight: 19,
    marginTop: 7,
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  upcomingHint: {
    fontSize: 11,
    color: "#00834C",
    fontWeight: "700",
  },
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 11,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0ECE6",
  },
  upcomingDate: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#E5F3E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  upcomingDay: {
    fontSize: 17,
    fontWeight: "900",
    color: "#00834C",
  },
  upcomingMonth: {
    fontSize: 10,
    color: "#43815E",
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#102A25",
  },
  upcomingTime: {
    fontSize: 11,
    color: "#737B76",
    marginTop: 5,
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