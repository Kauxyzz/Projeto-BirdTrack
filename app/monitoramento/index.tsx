import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';

type Monitoramento = {
  id: string;
  data: string;
  mortalidade: number;
  mediaPeso: number;
  status: string;
  abate: string;
  observacao: string;
};

export default function MonitoramentoIndex() {
  const [registros, setRegistros] = useState<Monitoramento[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarRegistros = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'monitoramento'));
      const dados: Monitoramento[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dados.push({
          id: doc.id,
          data: data.data,
          mortalidade: data.mortalidade,
          mediaPeso: data.mediaPeso,
          status: data.status,
          abate: data.abate,
          observacao: data.observacao || '',
        });
      });

      setRegistros(dados);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.novoBotao} onPress={() => router.push('/monitoramento/novo')}>
        <Text style={styles.novoTexto}>+ Novo Registro</Text>
      </TouchableOpacity>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Data:</Text>
            <Text>{item.data}</Text>
            <Text style={styles.label}>Mortalidade:</Text>
            <Text>{item.mortalidade}</Text>
            <Text style={styles.label}>Média de Peso:</Text>
            <Text>{item.mediaPeso} kg</Text>
            <Text style={styles.label}>Status:</Text>
            <Text>{item.status}</Text>
            <Text style={styles.label}>Abate:</Text>
            <Text>{item.abate}</Text>
            <Text style={styles.label}>Observação:</Text>
            <Text>{item.observacao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  novoBotao: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  novoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
