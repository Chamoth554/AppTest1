import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const handleGoBack = () => {
    router.back();
  };

  const handleContactUs = () => {
    // You could open email or show contact modal
    console.log('Contact us pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>About My New App</Text>
          <Text style={styles.subtitle}>Version 1.0.0</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📱 About This App</Text>
            <Text style={styles.cardText}>
              This is a demo React Native application built with Expo Router. It showcases modern mobile app development practices including navigation, authentication flows, and responsive design.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🛠️ Technologies Used</Text>
            <Text style={styles.cardText}>
              • React Native{'\n'}
              • Expo Router{'\n'}
              • TypeScript{'\n'}
              • Safe Area Context{'\n'}
              • Modern UI Components
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>✨ Features</Text>
            <Text style={styles.cardText}>
              • User Authentication (Demo){'\n'}
              • Navigation Between Screens{'\n'}
              • Form Validation{'\n'}
              • Responsive Design{'\n'}
              • Cross-Platform Support
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>👤 Developer Info</Text>
            <Text style={styles.cardText}>
              Created as a demonstration of modern mobile app development. This app serves as a starting point for building more complex applications.
            </Text>
            
            <TouchableOpacity style={styles.contactButton} onPress={handleContactUs}>
              <Text style={styles.contactButtonText}>Contact Developer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: '#6c5ce7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#74b9ff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});