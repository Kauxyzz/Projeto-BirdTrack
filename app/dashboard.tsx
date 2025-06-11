import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão Avícola</Text>
      <Link href="/documentos" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Documentos</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/mortalidade" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mortalidade</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Dashboard; 

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: 'white' },
});
