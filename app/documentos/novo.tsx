import { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "expo-router";

export default function NovoDocumento() {
  const [nome, setNome] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const router = useRouter();

  const salvarDocumento = async () => {
    if (!nome || !dataVencimento) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await addDoc(collection(db, "documentos"), {
        nome,
        dataVencimento,
      });
      Alert.alert("Sucesso", "Documento adicionado.");
      router.replace("/documentos");
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar documento.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do documento"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de vencimento (AAAA-MM-DD)"
        value={dataVencimento}
        onChangeText={setDataVencimento}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvarDocumento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
});
