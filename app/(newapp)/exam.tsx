// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface User {
  name: string;
  progress: number;
  completedLessons: number;
  streak: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

const KoreanPrepApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState<User>({
    name: 'Kavinda',
    progress: 65,
    completedLessons: 12,
    streak: 7
  });
  const [fadeAnim] = useState(new Animated.Value(0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Basic Greetings',
      description: 'Learn essential Korean greetings',
      completed: true,
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'Numbers 1-10',
      description: 'Count from 1 to 10 in Korean',
      completed: true,
      level: 'Beginner'
    },
    {
      id: '3',
      title: 'Family Members',
      description: 'Korean words for family',
      completed: false,
      level: 'Beginner'
    },
    {
      id: '4',
      title: 'Days of the Week',
      description: 'Learn Korean days',
      completed: false,
      level: 'Intermediate'
    }
  ];

  const quizData: Quiz[] = [
    {
      question: 'How do you say "Hello" in Korean?',
      options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'],
      correctAnswer: 0
    },
    {
      question: 'What does "감사합니다" mean?',
      options: ['Goodbye', 'Thank you', 'Sorry', 'Hello'],
      correctAnswer: 1
    },
    {
      question: 'How do you say "1" in Korean?',
      options: ['둘', '하나', '셋', '넷'],
      correctAnswer: 1
    }
  ];

  const vocabulary = [
    { korean: '안녕하세요', english: 'Hello', sinhala: 'ආයුබෝවන්' },
    { korean: '감사합니다', english: 'Thank you', sinhala: 'ස්තූතියි' },
    { korean: '죄송합니다', english: 'Sorry', sinhala: 'සමාවන්න' },
    { korean: '안녕히 가세요', english: 'Goodbye', sinhala: 'ආයුබෝවන්' }
  ];

  useEffect(() => {
    if (currentScreen === 'splash') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      
      setTimeout(() => {
        setCurrentScreen('login');
      }, 3000);
    }
  }, [currentScreen]);

  const handleVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const navigateToScreen = (screen: string) => {
    handleVibration();
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    handleVibration();
    setCurrentScreen('dashboard');
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    handleVibration();
    
    setTimeout(() => {
      if (answerIndex === quizData[currentQuiz].correctAnswer) {
        setQuizScore(quizScore + 1);
      }
      
      if (currentQuiz < quizData.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed
        setCurrentScreen('quiz-results');
      }
    }, 1000);
  };

  const flipCard = () => {
    setCardFlipped(!cardFlipped);
    handleVibration();
  };

  const nextCard = () => {
    if (currentCard < vocabulary.length - 1) {
      setCurrentCard(currentCard + 1);
      setCardFlipped(false);
      handleVibration();
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setCardFlipped(false);
      handleVibration();
    }
  };

  // Splash Screen
  const renderSplashScreen = () => (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.splashContainer}
    >
      <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🇰🇷</Text>
        </View>
        <Text style={styles.appName}>Korean Prep Sri Lanka</Text>
        <Text style={styles.tagline}>Learn Korean for jobs in Korea</Text>
        <View style={styles.koreanFlag}>
          <Text style={styles.flagEmoji}>태극기</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );

  // Login Screen
  const renderLoginScreen = () => (
    <LinearGradient
      colors={['#f8f9ff', '#ffffff']}
      style={styles.loginContainer}
    >
      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Welcome Back!</Text>
        <Text style={styles.loginSubtitle}>Sign in to continue learning</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#db4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={20} color="#4267B2" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  // Dashboard Screen
  const renderDashboardScreen = () => (
    <View style={styles.dashboardContainer}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.dashboardHeader}
      >
        <Text style={styles.greeting}>Hello, {user.name}!</Text>
        <Text style={styles.readyText}>Ready to study?</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress: {user.progress}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${user.progress}%` }]} />
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.dashboardContent}>
        <View style={styles.cardGrid}>
          <TouchableOpacity 
            style={[styles.dashboardCard, { backgroundColor: '#FF6B6B' }]}
            onPress={() => navigateToScreen('lessons')}
          >
            <Ionicons name="book-outline" size={30} color="white" />
            <Text style={styles.cardTitle}>Lessons</Text>
            <Text style={styles.cardSubtitle}>{user.completedLessons} completed</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.dashboardCard, { backgroundColor: '#4ECDC4' }]}
            onPress={() => navigateToScreen('vocabulary')}
          >
            <Ionicons name="library-outline" size={30} color="white" />
            <Text style={styles.cardTitle}>Vocabulary</Text>
            <Text style={styles.cardSubtitle}>Practice words</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.dashboardCard, { backgroundColor: '#45B7D1' }]}
            onPress={() => navigateToScreen('quiz')}
          >
            <Ionicons name="help-circle-outline" size={30} color="white" />
            <Text style={styles.cardTitle}>Quizzes</Text>
            <Text style={styles.cardSubtitle}>Test yourself</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.dashboardCard, { backgroundColor: '#F7DC6F' }]}
            onPress={() => navigateToScreen('mock-exam')}
          >
            <Ionicons name="document-text-outline" size={30} color="white" />
            <Text style={styles.cardTitle}>Mock Exams</Text>
            <Text style={styles.cardSubtitle}>Full practice</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={24} color="#FF6B6B" />
          <Text style={styles.streakText}>Study streak: {user.streak} days</Text>
        </View>
      </ScrollView>
    </View>
  );

  // Lessons List Screen
  const renderLessonsScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lessons</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonInactive]}>
          <Text style={styles.filterButtonTextInactive}>Intermediate</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.lessonsList}>
        {lessons.map((lesson) => (
          <TouchableOpacity 
            key={lesson.id} 
            style={styles.lessonCard}
            onPress={() => navigateToScreen('lesson-detail')}
          >
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              <Text style={styles.lessonLevel}>{lesson.level}</Text>
            </View>
            {lesson.completed && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Lesson Detail Screen
  const renderLessonDetailScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('lessons')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Greetings</Text>
        <TouchableOpacity>
          <Ionicons name="volume-high" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.lessonContent}>
        <View style={styles.vocabularySection}>
          <Text style={styles.sectionTitle}>Vocabulary</Text>
          
          <View style={styles.vocabularyItem}>
            <Text style={styles.koreanText}>안녕하세요</Text>
            <Text style={styles.englishText}>Hello (Formal)</Text>
            <Text style={styles.sinhalaText}>ආයුබෝවන් (ආදරණීය)</Text>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="play" size={16} color="#667eea" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.vocabularyItem}>
            <Text style={styles.koreanText}>안녕</Text>
            <Text style={styles.englishText}>Hi (Informal)</Text>
            <Text style={styles.sinhalaText}>හායි (අවිධිමත්)</Text>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="play" size={16} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.grammarSection}>
          <Text style={styles.sectionTitle}>Grammar Notes</Text>
          <Text style={styles.grammarText}>
            Korean has different levels of politeness. 안녕하세요 is formal and used with strangers or elders.
          </Text>
        </View>
        
        <View style={styles.culturalSection}>
          <Text style={styles.sectionTitle}>Cultural Tips</Text>
          <Text style={styles.culturalText}>
            Always bow slightly when greeting someone older or in a higher position.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.lessonNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={20} color="white" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Next</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Quiz Screen
  const renderQuizScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.timer}>
          <Ionicons name="time" size={20} color="#FF6B6B" />
          <Text style={styles.timerText}>05:00</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill, 
            { width: `${((currentQuiz + 1) / quizData.length) * 100}%` }
          ]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuiz + 1} of {quizData.length}
        </Text>
      </View>
      
      <View style={styles.quizContent}>
        <Text style={styles.questionText}>{quizData[currentQuiz].question}</Text>
        
        <View style={styles.optionsContainer}>
          {quizData[currentQuiz].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption
              ]}
              onPress={() => handleQuizAnswer(index)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  // Quiz Results Screen
  const renderQuizResultsScreen = () => (
    <View style={styles.screenContainer}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.resultsContainer}
      >
        <Text style={styles.resultsTitle}>Quiz Complete!</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{quizScore}</Text>
          <Text style={styles.scoreDivider}>/</Text>
          <Text style={styles.totalText}>{quizData.length}</Text>
        </View>
        <Text style={styles.scorePercentage}>
          {Math.round((quizScore / quizData.length) * 100)}%
        </Text>
        
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setCurrentQuiz(0);
            setQuizScore(0);
            setSelectedAnswer(null);
            navigateToScreen('quiz');
          }}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigateToScreen('dashboard')}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  // Mock Exam Screen
  const renderMockExamScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mock Exam</Text>
        <View style={styles.timer}>
          <Ionicons name="time" size={20} color="#FF6B6B" />
          <Text style={styles.timerText}>45:00</Text>
        </View>
      </View>
      
      <View style={styles.examTabs}>
        <TouchableOpacity style={[styles.examTab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Listening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.examTab}>
          <Text style={styles.tabText}>Reading</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.examContent}>
        <Text style={styles.examInstruction}>
          Listen to the audio and choose the correct answer.
        </Text>
        
        <View style={styles.audioPlayer}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.audioText}>Question 1 Audio</Text>
        </View>
        
        <Text style={styles.examQuestion}>
          What did the speaker say about the weather?
        </Text>
        
        <View style={styles.examOptions}>
          <TouchableOpacity style={styles.examOption}>
            <Text style={styles.examOptionText}>It's sunny today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.examOption}>
            <Text style={styles.examOptionText}>It's raining</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.examOption}>
            <Text style={styles.examOptionText}>It's cloudy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.examOption}>
            <Text style={styles.examOptionText}>It's snowing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Exam</Text>
      </TouchableOpacity>
    </View>
  );

  // Vocabulary/Flashcards Screen
  const renderVocabularyScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vocabulary</Text>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.flashcardContainer}>
        <TouchableOpacity style={styles.flashcard} onPress={flipCard}>
          {!cardFlipped ? (
            <View style={styles.cardFront}>
              <Text style={styles.cardKorean}>{vocabulary[currentCard].korean}</Text>
              <Text style={styles.cardHint}>Tap to see meaning</Text>
            </View>
          ) : (
            <View style={styles.cardBack}>
              <Text style={styles.cardEnglish}>{vocabulary[currentCard].english}</Text>
              <Text style={styles.cardSinhala}>{vocabulary[currentCard].sinhala}</Text>
              <TouchableOpacity style={styles.audioButton}>
                <Ionicons name="volume-high" size={24} color="#667eea" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.cardNavigation}>
          <TouchableOpacity 
            style={[styles.cardNavButton, currentCard === 0 && styles.disabledButton]}
            onPress={prevCard}
            disabled={currentCard === 0}
          >
            <Ionicons name="chevron-back" size={24} color={currentCard === 0 ? "#ccc" : "#667eea"} />
          </TouchableOpacity>
          
          <Text style={styles.cardCounter}>
            {currentCard + 1} / {vocabulary.length}
          </Text>
          
          <TouchableOpacity 
            style={[styles.cardNavButton, currentCard === vocabulary.length - 1 && styles.disabledButton]}
            onPress={nextCard}
            disabled={currentCard === vocabulary.length - 1}
          >
            <Ionicons name="chevron-forward" size={24} color={currentCard === vocabulary.length - 1 ? "#ccc" : "#667eea"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="checkmark" size={20} color="#4CAF50" />
            <Text style={styles.actionText}>Learned</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.actionText}>Favorite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Progress/Profile Screen
  const renderProgressScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Progress</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>kavinda@email.com</Text>
      </View>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.completedLessons}</Text>
          <Text style={styles.statLabel}>Lessons Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Quiz Average</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Mock Exams</Text>
        </View>
      </View>
      
      <View style={styles.progressChart}>
        <Text style={styles.chartTitle}>Weekly Progress</Text>
        <View style={styles.chartContainer}>
          {[40, 60, 80, 45, 90, 75, 65].map((height, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={[styles.chartBarFill, { height: `${height}%` }]} />
            </View>
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.upgradeButton}>
        <Ionicons name="star" size={20} color="#FFD700" />
        <Text style={styles.upgradeText}>Upgrade to Premium</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // Settings Screen
  const renderSettingsScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('dashboard')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Language</Text>
          <TouchableOpacity style={styles.settingValue}>
            <Text style={styles.settingValueText}>English</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Daily Notifications</Text>
          <TouchableOpacity style={styles.toggleSwitch}>
            <View style={styles.toggleSwitchActive}>
              <View style={styles.toggleSwitchThumb} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Theme</Text>
          <TouchableOpacity style={styles.settingValue}>
            <Ionicons name="sunny" size={20} color="#FFD700" />
            <Text style={styles.settingValueText}>Light</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle-outline" size={20} color="#666" />
          <Text style={styles.settingLabel}>FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <Text style={styles.settingLabel}>Contact Us</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Screen Router
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return renderSplashScreen();
      case 'login':
        return renderLoginScreen();
      case 'dashboard':
        return renderDashboardScreen();
      case 'lessons':
        return renderLessonsScreen();
      case 'lesson-detail':
        return renderLessonDetailScreen();
      case 'quiz':
        return renderQuizScreen();
      case 'quiz-results':
        return renderQuizResultsScreen();
      case 'mock-exam':
        return renderMockExamScreen();
      case 'vocabulary':
        return renderVocabularyScreen();
      case 'progress':
        return renderProgressScreen();
      case 'settings':
        return renderSettingsScreen();
      default:
        return renderSplashScreen();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Screen Navigation Pills (for demo purposes) */}
      {currentScreen !== 'splash' && (
        <View style={styles.navigationPills}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { id: 'login', name: '🔐', title: 'Login' },
              { id: 'dashboard', name: '🏠', title: 'Home' },
              { id: 'lessons', name: '📚', title: 'Lessons' },
              { id: 'lesson-detail', name: '📖', title: 'Detail' },
              { id: 'quiz', name: '❓', title: 'Quiz' },
              { id: 'mock-exam', name: '📝', title: 'Exam' },
              { id: 'vocabulary', name: '💭', title: 'Cards' },
              { id: 'progress', name: '📊', title: 'Progress' },
              { id: 'settings', name: '⚙️', title: 'Settings' }
            ].map((screen) => (
              <TouchableOpacity
                key={screen.id}
                style={[
                  styles.navPill,
                  currentScreen === screen.id && styles.navPillActive
                ]}
                onPress={() => navigateToScreen(screen.id)}
              >
                <Text style={styles.navPillEmoji}>{screen.name}</Text>
                <Text style={[
                  styles.navPillText,
                  currentScreen === screen.id && styles.navPillTextActive
                ]}>{screen.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {renderCurrentScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Navigation Pills
  navigationPills: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  navPill: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    minWidth: 60,
  },
  navPillActive: {
    backgroundColor: '#667eea',
  },
  navPillEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  navPillText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  navPillTextActive: {
    color: '#ffffff',
  },

  // Splash Screen
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoEmoji: {
    fontSize: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  koreanFlag: {
    position: 'absolute',
    top: -100,
    right: -50,
    opacity: 0.3,
  },
  flagEmoji: {
    fontSize: 40,
    color: 'white',
  },

  // Login Screen
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  loginContent: {
    flex: 1,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  signupButtonText: {
    color: '#667eea',
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Dashboard Screen
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  dashboardHeader: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  readyText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  dashboardContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dashboardCard: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  streakText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  // Common Screen Styles
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },

  // Lessons Screen
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#667eea',
  },
  filterButtonInactive: {
    backgroundColor: '#f0f0f0',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextInactive: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  lessonsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  lessonLevel: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },

  // Lesson Detail Screen
  lessonContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  vocabularySection: {
    marginBottom: 30,
  },
  vocabularyItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },
  koreanText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  englishText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  sinhalaText: {
    fontSize: 14,
    color: '#999',
  },
  audioButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  grammarSection: {
    marginBottom: 30,
  },
  grammarText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  culturalSection: {
    marginBottom: 30,
  },
  culturalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lessonNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 5,
  },

  // Quiz Screen
  quizContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    elevation: 1,
  },
  selectedOption: {
    borderColor: '#667eea',
    backgroundColor: '#f8f9ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#667eea',
    fontWeight: '600',
  },

  // Quiz Results Screen
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreDivider: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 10,
  },
  totalText: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.7)',
  },
  scorePercentage: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
  },
  retryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  retryButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },

  // Mock Exam Screen
  examTabs: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  examTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  examContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  examInstruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  audioText: {
    fontSize: 14,
    color: '#666',
  },
  examQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  examOptions: {
    gap: 12,
  },
  examOption: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  examOptionText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Flashcards Screen
  flashcardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  flashcard: {
    width: width - 60,
    height: 250,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 40,
  },
  cardFront: {
    flex: 1,
    backgroundColor: '#667eea',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  cardBack: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  cardKorean: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  cardHint: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  cardEnglish: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardSinhala: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  cardNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  cardNavButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  cardCounter: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 30,
  },
  actionButton: {
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },

  // Progress Screen
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    width: (width - 55) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  progressChart: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'end',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    gap: 8,
  },
  chartBar: {
    flex: 1,
    height: '100%',
    justifyContent: 'end',
  },
  chartBarFill: {
    backgroundColor: '#667eea',
    borderRadius: 2,
    minHeight: 4,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // Settings Screen
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingValueText: {
    fontSize: 14,
    color: '#666',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    padding: 2,
  },
  toggleSwitchActive: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    paddingRight: 4,
  },
  toggleSwitchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
});

export default KoreanPrepApp;