import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const handleLogout = () => {
    // Navigate back to index/welcome screen
    router.replace('/');
  };

  const handleExplore = () => {
    // Navigate to explore screen
    router.push('/explore');
  };

  const handleAbout = () => {
    // Navigate to about screen
    router.push('/about');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Dashboard!</Text>
          <Text style={styles.subtitle}>You're successfully logged in</Text>
        </View>

        {/* Dashboard Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎉 Success!</Text>
            <Text style={styles.cardText}>
              You have successfully logged in and reached the dashboard. This is where your main app content would be displayed.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Quick Stats</Text>
            <Text style={styles.cardText}>
              • Login Status: ✅ Active{'\n'}
              • Last Login: Just now{'\n'}
              • Account Type: Demo{'\n'}
              • Features Unlocked: All
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleExplore}>
                <Text style={styles.actionButtonText}>Explore Features</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleAbout}>
                <Text style={styles.actionButtonText}>About App</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});