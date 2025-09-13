import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert, KeyboardAvoidingView,
  Platform,
  ScrollView, StyleSheet, Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    console.log('Login button pressed'); // Debug log
    console.log('Form data:', formData); // Debug log
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check demo credentials (case-insensitive email)
      const emailLower = formData.email.toLowerCase().trim();
      const password = formData.password.trim();
      
      console.log('Checking credentials:', { emailLower, password }); // Debug log
      
      if (emailLower === 'demo@example.com' && password === '123456') {
        console.log('Demo credentials matched!'); // Debug log
        router.replace('/dashboard');
        Alert.alert(
          'Success!', 
          'Welcome back! You will be redirected to the dashboard.',
          [{ 
            text: 'OK', 
            onPress: () => {
              console.log('Navigating to dashboard...'); // Debug log
              router.replace('/dashboard');
            }
          }]
        );
      } else {
        console.log('Invalid credentials'); // Debug log
        Alert.alert(
          'Login Failed', 
          'Invalid email or password. Please use:\nEmail: demo@example.com\nPassword: 123456'
        );
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password', 
      'For demo purposes:\nEmail: demo@example.com\nPassword: 123456',
      [{ text: 'OK' }]
    );
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert('Social Login', `${platform} login would be implemented here`);
  };

  // Quick login function for demo
  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@example.com',
      password: '123456'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#a0a0a0"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#a0a0a0"
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Signing In...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Demo Credentials */}
            <View style={styles.demoContainer}>
              <Text style={styles.demoText}>
                Demo Credentials: demo@example.com / 123456
              </Text>
              <TouchableOpacity style={styles.fillDemoButton} onPress={fillDemoCredentials}>
                <Text style={styles.fillDemoButtonText}>Fill Demo Credentials</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
              >
                <Text style={styles.socialButtonText}>🌐 Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Text style={styles.socialButtonText}>📘 Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Signup Link */}
            <TouchableOpacity style={styles.signupContainer} onPress={goToSignup}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: -35,
    marginBottom: -5,
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
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2d3436',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2d3436',
  },
  eyeButton: {
    paddingHorizontal: 16,
  },
  eyeText: {
    fontSize: 18,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 14,
    color: '#6c5ce7',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  fillDemoButton: {
    backgroundColor: '#1976d2',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fillDemoButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    fontSize: 14,
    color: '#636e72',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#636e72',
  },
  signupLinkText: {
    color: '#6c5ce7',
    fontWeight: '600',
  },
});