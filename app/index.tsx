import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <View>
      <Text>Welcome to the app</Text>
      <Button title="Go to Login" onPress={goToLogin} />
    </View>
  );
};

export default Index; 
