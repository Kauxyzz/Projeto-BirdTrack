import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';

export default function NovaMortalidade() {
  const [quantidade, setQuantidade] = useState('');
  const [causa, setCausa] = useState('');
  const router = useRouter();

  const salvarRegistro = async () => {
    if (!quantidade || !causa) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novoRegistro = {
      data: new Date().toISOString().split('T')[0],
      quantidade: parseInt(quantidade),
      causa,
    };

    try {
      await addDoc(collection(db, 'mortalidade'), novoRegistro);
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      router.replace('/mortalidade');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar registro.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Quantidade de aves"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Causa"
        value={causa}
        onChangeText={setCausa}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvarRegistro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});
