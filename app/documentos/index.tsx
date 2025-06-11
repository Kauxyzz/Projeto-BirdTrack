import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { api, Documento } from '@/services/api';
import { useRouter } from 'expo-router';

const Documentos = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const buscarDocumentos = async () => {
    try {
      const dados = await api.getDocumentos();
      setDocumentos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar documentos.');
    } finally {
      setLoading(false);
    }
  };

  const deletarDocumento = async (id?: string) => {
    if (!id) return;
    try {
      await api.deleteDocumento(id);
      setDocumentos((prev) => prev.filter((doc) => doc.id !== id));
      Alert.alert('Sucesso', 'Documento deletado com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar documento.');
    }
  };

  useEffect(() => {
    buscarDocumentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documentos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onLongPress={() => deletarDocumento(item.id)}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardText}>Vence em: {item.dataVencimento}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Novo Documento" onPress={() => router.push('/documentos/novo')} />
    </View>
  );
};

export default Documentos;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#f2f2f2', padding: 12, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#555' },
});
