
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const initialAssignments = [
  {
    id: "1",
    title: "Addition and Subtraction",
    subject: "Mathematics",
    description: "Solve the maths problems you learned in class.",
    dueDate: "Today",
    dueTime: "4:00 PM",
    status: "Pending",
    questions: 5,
    icon: "calculator-outline",
    color: "#E4F5E9",
    iconColor: "#00834C",
    points: 20,
  },
  {
    id: "2",
    title: "My Favourite Animal",
    subject: "English Language",
    description: "Write a few sentences about your favourite animal.",
    dueDate: "Tomorrow",
    dueTime: "2:00 PM",
    status: "Pending",
    questions: 1,
    icon: "book-outline",
    color: "#FFF0D9",
    iconColor: "#E5A12C",
    points: 15,
  },
  {
    id: "3",
    title: "Parts of a Plant",
    subject: "Basic Science",
    description: "Name the main parts of a plant and explain their uses.",
    dueDate: "Oct 6",
    dueTime: "3:00 PM",
    status: "Submitted",
    questions: 3,
    icon: "leaf-outline",
    color: "#E7F4DE",
    iconColor: "#5E9D42",
    points: 20,
  },
  {
    id: "4",
    title: "Our Environment",
    subject: "Social Studies",
    description: "Describe three ways to keep your environment clean.",
    dueDate: "Oct 8",
    dueTime: "12:00 PM",
    status: "Pending",
    questions: 3,
    icon: "earth-outline",
    color: "#E9E8FF",
    iconColor: "#7770D6",
    points: 15,
  },
  {
    id: "5",
    title: "Multiplication Practice",
    subject: "Mathematics",
    description: "Complete the multiplication exercises.",
    dueDate: "Sep 29",
    dueTime: "4:00 PM",
    status: "Overdue",
    questions: 10,
    icon: "calculator-outline",
    color: "#FDE8E4",
    iconColor: "#E36D55",
    points: 25,
  },
];

const filters = ["All", "Pending", "Submitted", "Overdue"];

export default function AssignmentScreen() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredAssignments = assignments.filter((item) => {
    return activeFilter === "All" || item.status === activeFilter;
  });

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  const openAssignment = (item) => {
    setSelectedAssignment(item);
    setAnswer("");
    setModalVisible(true);
  };

  const closeAssignment = () => {
    setModalVisible(false);
    setSelectedAssignment(null);
    setAnswer("");
  };

  const submitAssignment = () => {
    if (!answer.trim()) {
      Alert.alert("Empty answer", "Please write your answer before submitting.");
      return;
    }

    Alert.alert(
      "Submit assignment?",
      "Are you sure you want to submit your work?",
      [
        { text: "Continue editing", style: "cancel" },
        {
          text: "Submit",
          onPress: () => {
            setAssignments((current) =>
              current.map((item) =>
                item.id === selectedAssignment.id
                  ? { ...item, status: "Submitted" }
                  : item
              )
            );
            closeAssignment();
            Alert.alert(
              "Assignment submitted! 🎉",
              "Well done! Your teacher can now review your work."
            );
          },
        },
      ]
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Submitted":
        return {
          backgroundColor: "#E4F5E9",
          color: "#00834C",
        };
      case "Overdue":
        return {
          backgroundColor: "#FDE8E4",
          color: "#D94C4C",
        };
      default:
        return {
          backgroundColor: "#FFF0D9",
          color: "#B17C12",
        };
    }
  };

  const renderAssignment = (item) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.assignmentCard}
        activeOpacity={0.75}
        onPress={() => openAssignment(item)}
      >
        <View style={styles.assignmentTop}>
          <View
            style={[
              styles.assignmentIcon,
              { backgroundColor: item.color },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={25}
              color={item.iconColor}
            />
          </View>

          <View style={styles.assignmentInfo}>
            <Text style={styles.subjectName}>{item.subject}</Text>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={19}
            color="#A5B0A8"
          />
        </View>

        <Text style={styles.assignmentDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.assignmentDivider} />

        <View style={styles.assignmentBottom}>
          <View style={styles.dueDate}>
            <Ionicons
              name="calendar-outline"
              size={15}
              color={item.status === "Overdue" ? "#D94C4C" : "#849188"}
            />
            <Text
              style={[
                styles.dueDateText,
                item.status === "Overdue" && { color: "#D94C4C" },
              ]}
            >
              {item.dueDate} · {item.dueTime}
            </Text>
          </View>

          <View style={styles.statusAndPoints}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusStyle.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: statusStyle.color },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.pointsRow}>
          <Ionicons name="star" size={14} color="#E5A12C" />
          <Text style={styles.pointsText}>
            Earn up to {item.points} points
          </Text>
          <Text style={styles.questionCount}>
            {item.questions} {item.questions === 1 ? "task" : "tasks"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>My Assignments</Text>
          <Text style={styles.headerSubtitle}>
            Learn, practise, and shine! 🌟
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="document-text" size={23} color="#00834C" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Banner */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>You can do it! 🚀</Text>
            <Text style={styles.welcomeSubtitle}>
              Keep completing your assignments and earn more stars.
            </Text>
          </View>
          <View style={styles.welcomeIllustration}>
            <Ionicons name="school" size={43} color="#F5B72D" />
            <Ionicons
              name="sparkles"
              size={19}
              color="#FFFFFF"
              style={styles.welcomeSparkle}
            />
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#FFF0D9" }]}>
              <Ionicons name="time-outline" size={22} color="#E5A12C" />
            </View>
            <Text style={styles.summaryValue}>{pendingCount}</Text>
            <Text style={styles.summaryLabel}>To do</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#E4F5E9" }]}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#00834C"
              />
            </View>
            <Text style={styles.summaryValue}>{submittedCount}</Text>
            <Text style={styles.summaryLabel}>Submitted</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#E9E8FF" }]}>
              <Ionicons name="book-outline" size={22} color="#7770D6" />
            </View>
            <Text style={styles.summaryValue}>{assignments.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Assignments</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
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
        </ScrollView>

        {/* Assignment List */}
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(renderAssignment)
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={48}
                color="#00834C"
              />
            </View>
            <Text style={styles.emptyTitle}>Nothing here yet!</Text>
            <Text style={styles.emptySubtitle}>
              There are no {activeFilter.toLowerCase()} assignments to show.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Assignment Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeAssignment}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Assignment Details</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={closeAssignment}
              >
                <Ionicons name="close" size={22} color="#073B25" />
              </TouchableOpacity>
            </View>

            {selectedAssignment && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalSubjectRow}>
                  <View
                    style={[
                      styles.assignmentIcon,
                      { backgroundColor: selectedAssignment.color },
                    ]}
                  >
                    <Ionicons
                      name={selectedAssignment.icon}
                      size={25}
                      color={selectedAssignment.iconColor}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subjectName}>
                      {selectedAssignment.subject}
                    </Text>
                    <Text style={styles.modalAssignmentTitle}>
                      {selectedAssignment.title}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalLabel}>Instructions</Text>
                <Text style={styles.modalDescription}>
                  {selectedAssignment.description}
                </Text>

                <View style={styles.modalDueCard}>
                  <Ionicons
                    name="calendar-outline"
                    size={19}
                    color="#00834C"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalDueLabel}>Due date</Text>
                    <Text style={styles.modalDueText}>
                      {selectedAssignment.dueDate} at{" "}
                      {selectedAssignment.dueTime}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: getStatusStyle(
                          selectedAssignment.status
                        ).backgroundColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: getStatusStyle(
                            selectedAssignment.status
                          ).color,
                        },
                      ]}
                    >
                      {selectedAssignment.status}
                    </Text>
                  </View>
                </View>

                {selectedAssignment.status !== "Submitted" ? (
                  <>
                    <Text style={styles.modalLabel}>Your Answer</Text>
                    <TextInput
                      style={styles.answerInput}
                      value={answer}
                      onChangeText={setAnswer}
                      placeholder="Write your answer here..."
                      placeholderTextColor="#A2ADA5"
                      multiline
                      textAlignVertical="top"
                    />

                    <Text style={styles.answerHint}>
                      Make sure you have checked your answer before submitting.
                    </Text>

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={submitAssignment}
                    >
                      <Ionicons
                        name="cloud-upload-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                      <Text style={styles.submitButtonText}>
                        Submit Assignment
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.submittedMessage}>
                    <Ionicons
                      name="checkmark-circle"
                      size={25}
                      color="#00834C"
                    />
                    <Text style={styles.submittedText}>
                      Your assignment has been submitted. Your teacher can
                      review your work.
                    </Text>
                  </View>
                )}

                <View style={{ height: 20 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
    fontSize: 21,
    fontWeight: "800",
    color: "#073B25",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#89958C",
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
    paddingTop: 7,
  },
  welcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#073B25",
    borderRadius: 23,
    padding: 18,
    marginBottom: 17,
  },
  welcomeContent: {
    flex: 1,
    paddingRight: 8,
  },
  welcomeTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: "#D4E8D9",
    lineHeight: 18,
    marginTop: 7,
  },
  welcomeIllustration: {
    width: 75,
    height: 75,
    borderRadius: 24,
    backgroundColor: "#155438",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  welcomeSparkle: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 23,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    alignItems: "center",
    paddingVertical: 13,
  },
  summaryIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },
  summaryValue: {
    color: "#073B25",
    fontSize: 20,
    fontWeight: "800",
  },
  summaryLabel: {
    color: "#87958B",
    fontSize: 10,
    marginTop: 3,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#073B25",
  },
  filterContainer: {
    gap: 9,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
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
  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#F0F1EA",
  },
  assignmentTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  assignmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  assignmentInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 11,
    color: "#00834C",
    fontWeight: "700",
  },
  assignmentTitle: {
    fontSize: 14,
    color: "#173D29",
    fontWeight: "800",
    marginTop: 4,
  },
  assignmentDescription: {
    color: "#87958B",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
  },
  assignmentDivider: {
    height: 1,
    backgroundColor: "#F0F1EA",
    marginVertical: 12,
  },
  assignmentBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  dueDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  dueDateText: {
    fontSize: 10,
    color: "#849188",
    fontWeight: "600",
  },
  statusAndPoints: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 11,
  },
  pointsText: {
    fontSize: 10,
    color: "#A47B21",
    fontWeight: "700",
    flex: 1,
  },
  questionCount: {
    color: "#9AA49D",
    fontSize: 10,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 45,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  emptyIcon: {
    width: 83,
    height: 83,
    borderRadius: 28,
    backgroundColor: "#E4F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    color: "#073B25",
    fontSize: 17,
    fontWeight: "800",
  },
  emptySubtitle: {
    color: "#87958B",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 7,
  },
  bottomSpace: {
    height: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF9F1",
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 15,
    maxHeight: "88%",
  },
  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#D9DFD8",
    alignSelf: "center",
    marginBottom: 17,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  modalHeading: {
    fontSize: 19,
    color: "#073B25",
    fontWeight: "800",
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  modalAssignmentTitle: {
    color: "#073B25",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
  modalLabel: {
    color: "#073B25",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 9,
    marginTop: 10,
  },
  modalDescription: {
    color: "#718076",
    fontSize: 13,
    lineHeight: 20,
  },
  modalDueCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    marginTop: 18,
    marginBottom: 10,
  },
  modalDueLabel: {
    color: "#87958B",
    fontSize: 10,
  },
  modalDueText: {
    color: "#173D29",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  answerInput: {
    minHeight: 145,
    maxHeight: 220,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE8DE",
    borderRadius: 15,
    padding: 14,
    fontSize: 13,
    color: "#173D29",
    lineHeight: 20,
  },
  answerHint: {
    color: "#87958B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 8,
  },
  submitButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#00834C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 18,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  submittedMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#E4F5E9",
    padding: 14,
    borderRadius: 15,
    marginTop: 20,
  },
  submittedText: {
    flex: 1,
    color: "#287344",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
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