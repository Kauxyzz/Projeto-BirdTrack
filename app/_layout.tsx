import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ title: 'Login', presentation: 'modal' }} />
      <Stack.Screen name="auth/register" options={{ title: 'Cadastro', presentation: 'modal' }} />
      <Stack.Screen name="documentos" options={{ title: 'Documentos' }} />
      <Stack.Screen name="monitoramento" options={{ title: 'Monitoramento de Produção' }} />
      <Stack.Screen name="monitoramento/novo" options={{ title: 'Novo Registro' }} />
      <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Stack>
  );
}
