import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { updateUserProfile, deleteUserAccount } from '@/services/auth';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ name, email, password });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUserAccount();
            Alert.alert('Conta excluída com sucesso!');
          } catch (error) {
            Alert.alert('Erro', (error as Error).message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão Avícola</Text>

      {/* Navegação */}
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

      {/* Formulário de perfil */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Novo nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Novo e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Atualizar Perfil" onPress={handleUpdate} />
        <View style={{ height: 10 }} />
        <Button title="Excluir Conta" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginBottom: 10, width: 200, alignItems: 'center' },
  buttonText: { color: 'white' },
  form: { marginTop: 30, width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
