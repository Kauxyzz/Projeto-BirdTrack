import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    console.log("Tentando registrar usuário:", email);

    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Usuário registrado!');
      router.replace('/auth/login');
    } catch (error: any) {
      console.error("Erro no registro:", error);
      Alert.alert('Erro ao registrar', error.message || 'Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
});