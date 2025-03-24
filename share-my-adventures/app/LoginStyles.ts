import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  form: { alignItems: 'center', width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  formItem: { width: '100%', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  input: { width: '100%', borderWidth: 1, padding: 15, borderRadius: 10 },
  authButton: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  authButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  linkText: { fontSize: 16 },
});