import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão Avícola</Text>

      <Link href="/documentos" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Documentos</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/mortalidade" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mortalidade</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/perfil" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Alterar Perfil</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
