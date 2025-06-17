import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Registro {
  id: string;
  data: string;
  mortalidade: number;
  mediaPeso: string;
  status: string;
  abate: string;
  observacao: string;
}

export default function MonitoramentoIndex() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRegistros = async () => {
      const querySnapshot = await getDocs(collection(db, "monitoramento"));
      const lista: Registro[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({
          id: doc.id,
          data: data.data ?? "",
          mortalidade: data.mortalidade ?? 0,
          mediaPeso: data.mediaPeso ?? "",
          status: data.status ?? "",
          abate: data.abate ?? "",
          observacao: data.observacao ?? "",
        });
      });

      setRegistros(lista);
    };

    fetchRegistros();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/FundoLogin.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/dashboard")}> 
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <FlatList
          data={registros}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Data:</Text>
              <Text>{item.data}</Text>
              <Text style={styles.label}>Mortalidade:</Text>
              <Text>{item.mortalidade}</Text>
              <Text style={styles.label}>Média de Peso:</Text>
              <Text>{item.mediaPeso}</Text>
              <Text style={styles.label}>Status:</Text>
              <Text>{item.status}</Text>
              <Text style={styles.label}>Abate:</Text>
              <Text>{item.abate}</Text>
              <Text style={styles.label}>Observação:</Text>
              <Text>{item.observacao}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/monitoramento/novo")}
        >
          <Text style={styles.buttonText}>+ Novo Registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginBottom: 10,
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
