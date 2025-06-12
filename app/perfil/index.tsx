import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateUserProfile, deleteUserAccount } from '@/services/auth';

export default function PerfilScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ name, email, password });
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (err) {
      Alert.alert('Erro', (err as Error).message);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Confirmação', 'Deseja mesmo excluir sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUserAccount();
            Alert.alert('Conta excluída com sucesso!');
          } catch (err) {
            Alert.alert('Erro', (err as Error).message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Novo nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Novo e-mail" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nova senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Atualizar Perfil" onPress={handleUpdate} />
      <View style={{ height: 10 }} />
      <Button title="Excluir Conta" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
