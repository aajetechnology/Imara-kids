
import { router } from "expo-router";
import { useEffect, useState } from "react";
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



const questions = [
  {
    id: 1,
    question: "What is 5 + 3?",
    subject: "Mathematics",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    id: 2,
    question: "Which of these is a vowel?",
    subject: "English Language",
    options: ["B", "C", "A", "D"],
    answer: "A",
  },
  {
    id: 3,
    question: "Which planet do we live on?",
    subject: "Basic Science",
    options: ["Mars", "Earth", "Jupiter", "Venus"],
    answer: "Earth",
  },
  {
    id: 4,
    question: "How many days are in a week?",
    subject: "General Knowledge",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    id: 5,
    question: "Which animal is known as the king of the jungle?",
    subject: "Basic Science",
    options: ["Elephant", "Lion", "Tiger", "Giraffe"],
    answer: "Lion",
  },
];

const optionLetters = ["A", "B", "C", "D"];

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex + 1) / totalQuestions;

  useEffect(() => {
    if (submitted) return;

    if (secondsLeft <= 0) {
      finishQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, submitted]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const chooseAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const nextQuestion = () => {
    if (!selectedAnswer) {
      Alert.alert("Choose an answer", "Please select an answer to continue.");
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(answers[questions[nextIndex].id] || null);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      setSelectedAnswer(answers[questions[previousIndex].id] || null);
    }
  };

  const finishQuiz = () => {
    setSubmitted(true);

    const correctCount = questions.filter(
      (question) => answers[question.id] === question.answer
    ).length;

    const score = Math.round((correctCount / totalQuestions) * 100);

    Alert.alert(
      "Quiz Completed! 🎉",
      `You got ${correctCount} out of ${totalQuestions} correct.\nYour score: ${score}%`,
      [
        {
          text: "Back to Classes",
          onPress: () => router.replace("/classes"),
        },
      ],
      { cancelable: false }
    );
  };

  const optionColors = (option) => {
    if (selectedAnswer === option) {
      return {
        backgroundColor: "#E4F5E9",
        borderColor: "#00834C",
      };
    }
    return {
      backgroundColor: "#FFFFFF",
      borderColor: "#F0F0E9",
    };
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completedContainer}>
          <View style={styles.completedIcon}>
            <Ionicons name="trophy" size={60} color="#F5B72D" />
          </View>
          <Text style={styles.completedTitle}>Great Job! 🌟</Text>
          <Text style={styles.completedSubtitle}>
            You have completed your quiz.
          </Text>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => router.replace("/classes")}
          >
            <Text style={styles.finishButtonText}>Back to Classes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F1" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            Alert.alert(
              "Leave quiz?",
              "Your current answers may be lost. Are you sure?",
              [
                { text: "Stay", style: "cancel" },
                {
                  text: "Leave",
                  style: "destructive",
                  onPress: () => router.back(),
                },
              ]
            )
          }
        >
          <Ionicons name="close" size={23} color="#073B25" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Quiz Time!</Text>
          <Text style={styles.headerSubtitle}>You can do it!</Text>
        </View>

        <View style={styles.timer}>
          <Ionicons
            name="time-outline"
            size={17}
            color={secondsLeft <= 30 ? "#D94C4C" : "#00834C"}
          />
          <Text
            style={[
              styles.timerText,
              secondsLeft <= 30 && { color: "#D94C4C" },
            ]}
          >
            {formatTime(secondsLeft)}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quiz info */}
        <View style={styles.quizInfoCard}>
          <View style={styles.subjectIcon}>
            <Ionicons
              name="calculator-outline"
              size={28}
              color="#00834C"
            />
          </View>
          <View style={styles.quizInfoText}>
            <Text style={styles.subjectName}>
              {currentQuestion.subject}
            </Text>
            <Text style={styles.quizDescription}>
              Test what you have learned
            </Text>
          </View>
          <View style={styles.questionCount}>
            <Text style={styles.questionCountText}>
              {currentIndex + 1}/{totalQuestions}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressLabel}>Your progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Ionicons name="help-circle" size={17} color="#E4A52B" />
            <Text style={styles.questionBadgeText}>
              Question {currentIndex + 1}
            </Text>
          </View>

          <Text style={styles.questionText}>
            {currentQuestion.question}
          </Text>

          <Text style={styles.chooseHint}>
            Choose the correct answer below
          </Text>

          {/* Answers */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const selected = selectedAnswer === option;

              return (
                <TouchableOpacity
                  key={`${currentQuestion.id}-${option}`}
                  style={[
                    styles.optionCard,
                    optionColors(option),
                  ]}
                  onPress={() => chooseAnswer(option)}
                  activeOpacity={0.75}
                >
                  <View
                    style={[
                      styles.optionLetter,
                      selected && styles.selectedOptionLetter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetterText,
                        selected && styles.selectedOptionLetterText,
                      ]}
                    >
                      {optionLetters[index]}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>

                  <View style={styles.radioOuter}>
                    {selected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragementCard}>
          <Ionicons name="bulb-outline" size={22} color="#D99B13" />
          <Text style={styles.encouragementText}>
            Take your time and think carefully. You are doing great!
          </Text>
        </View>

        {/* Navigation */}
        <View style={styles.navigationButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={previousQuestion}
            >
              <Ionicons name="arrow-back" size={18} color="#00834C" />
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              currentIndex === 0 && { flex: 1 },
            ]}
            onPress={nextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === totalQuestions - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Text>
            <Ionicons
              name={
                currentIndex === totalQuestions - 1
                  ? "checkmark-circle-outline"
                  : "arrow-forward"
              }
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 21,
    color: "#073B25",
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#89958C",
    fontSize: 12,
    marginTop: 3,
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 13,
  },
  timerText: {
    color: "#00834C",
    fontSize: 13,
    fontWeight: "800",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  quizInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 14,
    gap: 12,
  },
  subjectIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: "#E4F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  quizInfoText: {
    flex: 1,
  },
  subjectName: {
    color: "#073B25",
    fontSize: 14,
    fontWeight: "800",
  },
  quizDescription: {
    color: "#89958C",
    fontSize: 11,
    marginTop: 4,
  },
  questionCount: {
    backgroundColor: "#FFF0D9",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
  },
  questionCountText: {
    color: "#B17C12",
    fontWeight: "800",
    fontSize: 12,
  },
  progressSection: {
    marginTop: 21,
    marginBottom: 20,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  progressLabel: {
    color: "#66766B",
    fontSize: 12,
    fontWeight: "700",
  },
  progressPercent: {
    color: "#00834C",
    fontSize: 12,
    fontWeight: "800",
  },
  progressTrack: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#E8EAE2",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00834C",
    borderRadius: 5,
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    padding: 19,
    elevation: 2,
    shadowColor: "#A9A092",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  questionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF5DC",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 5,
  },
  questionBadgeText: {
    color: "#A8760A",
    fontSize: 11,
    fontWeight: "800",
  },
  questionText: {
    color: "#073B25",
    fontSize: 22,
    lineHeight: 31,
    fontWeight: "800",
    marginTop: 19,
  },
  chooseHint: {
    color: "#89958C",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 18,
  },
  optionsContainer: {
    gap: 11,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1.5,
    minHeight: 58,
    gap: 12,
  },
  optionLetter: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#F3F4EE",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOptionLetter: {
    backgroundColor: "#00834C",
  },
  optionLetterText: {
    color: "#647269",
    fontSize: 13,
    fontWeight: "800",
  },
  selectedOptionLetterText: {
    color: "#FFFFFF",
  },
  optionText: {
    flex: 1,
    color: "#304638",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedOptionText: {
    color: "#00834C",
    fontWeight: "800",
  },
  radioOuter: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.7,
    borderColor: "#C6CEC8",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#00834C",
  },
  encouragementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF4D8",
    padding: 13,
    borderRadius: 15,
    gap: 10,
    marginTop: 16,
  },
  encouragementText: {
    flex: 1,
    color: "#947021",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  previousButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 15,
    height: 53,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9E9DD",
  },
  previousButtonText: {
    color: "#00834C",
    fontSize: 12,
    fontWeight: "800",
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    height: 53,
    backgroundColor: "#00834C",
    borderRadius: 16,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  completedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  completedIcon: {
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: "#FFF0D9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  completedTitle: {
    color: "#073B25",
    fontSize: 27,
    fontWeight: "800",
  },
  completedSubtitle: {
    color: "#819084",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  finishButton: {
    backgroundColor: "#00834C",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 16,
    marginTop: 25,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});