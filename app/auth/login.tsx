import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.registerText}>
          Não tem uma conta? Crie uma agora.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  registerText: {
    marginTop: 15,
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
  },
});
