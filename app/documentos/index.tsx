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

interface Documento {
  id: string;
  titulo: string;
  vencimento: string;
}

export default function DocumentosIndex() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDocumentos = async () => {
      const querySnapshot = await getDocs(collection(db, "documentos"));
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          titulo: data.nome ?? "Sem título",
          vencimento: data.dataVencimento ?? "Sem data",
        };
      }) as Documento[];
      setDocumentos(docs);
    };

    fetchDocumentos();
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

        <Text style={styles.title}>Documentos</Text>
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardText}>Vence em: {item.vencimento}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/documentos/novo")}
        >
          <Text style={styles.buttonText}>NOVO DOCUMENTO</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
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
