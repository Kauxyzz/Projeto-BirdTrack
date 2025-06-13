import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';

export default function NovoMonitoramento() {
  const [data] = useState(new Date().toISOString().split('T')[0]);
  const [mortalidade, setMortalidade] = useState('');
  const [mediaPeso, setMediaPeso] = useState('');
  const [status, setStatus] = useState('');
  const [abate, setAbate] = useState('');
  const [observacao, setObservacao] = useState('');

  const router = useRouter();

  const salvarRegistro = async () => {
    if (!mortalidade || !mediaPeso || !status || !abate) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const novoRegistro = {
      data,
      mortalidade: parseInt(mortalidade),
      mediaPeso: parseFloat(mediaPeso),
      status,
      abate,
      observacao,
    };

    try {
      await addDoc(collection(db, 'monitoramento'), novoRegistro);
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      router.replace('/monitoramento');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar registro.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="Data" value={data} editable={false} />
      <TextInput style={styles.input} placeholder="Mortalidade (quantidade)" keyboardType="numeric" value={mortalidade} onChangeText={setMortalidade} />
      <TextInput style={styles.input} placeholder="Média de Peso (kg)" keyboardType="numeric" value={mediaPeso} onChangeText={setMediaPeso} />
      <TextInput style={styles.input} placeholder="Status" value={status} onChangeText={setStatus} />
      <TextInput style={styles.input} placeholder="Abate" value={abate} onChangeText={setAbate} />
      <TextInput style={styles.input} placeholder="Observação" value={observacao} onChangeText={setObservacao} />
      <Button title="Salvar Registro" onPress={salvarRegistro} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
