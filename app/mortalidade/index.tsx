import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "expo-router";

export type RegistroMortalidade = {
  id?: string;
  data: string;
  quantidade: number;
  causa: string;
};

export default function MortalidadeScreen() {
  const [registros, setRegistros] = useState<RegistroMortalidade[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const buscarRegistros = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "mortalidade"));
      const dados: RegistroMortalidade[] = [];

      querySnapshot.forEach((docItem) => {
        const { data, quantidade, causa } = docItem.data();
        dados.push({
          id: docItem.id,
          data,
          quantidade,
          causa,
        });
      });

      setRegistros(dados);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar registros.");
    } finally {
      setLoading(false);
    }
  };

  const deletarRegistro = async (id?: string) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, "mortalidade", id));
      setRegistros(registros.filter((r) => r.id !== id));
      Alert.alert("Sucesso", "Registro deletado com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Erro ao deletar registro.");
    }
  };

  useEffect(() => {
    buscarRegistros();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Mortalidade</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onLongPress={() => deletarRegistro(item.id)}
            >
              <Text style={styles.cardTitle}>
                {item.quantidade} aves - {item.causa}
              </Text>
              <Text style={styles.cardText}>Data: {item.data}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Registrar Mortalidade" onPress={() => router.push("/mortalidade/nova")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardText: {
    color: "#333",
  },
});
