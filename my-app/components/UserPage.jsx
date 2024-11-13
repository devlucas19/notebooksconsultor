import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios'; // Importando axios

export default function UserPage({ navigation }) {

  const [os, setOs] = useState('');
  const [codigo, setCodigo] = useState('');

  // Função que será chamada quando o botão Buscar for pressionado
  const buscarEquipamento = async () => {
    try {
      // Fazendo a requisição ao backend com POST, enviando os dados no corpo da requisição
      const response = await axios.post('http://10.0.0.118:3000/equipamento', {
        os,    // Dados que serão enviados no corpo da requisição
        codigo,
      });

      // Verifica se a resposta contém dados e exibe no Alert
      if (response.data) {
        const equipamento = response.data; // Supondo que a resposta seja um único equipamento
        Alert.alert(
          'Informações da OS',
          `OS: ${equipamento.os}\nCódigo: ${equipamento.codigo}\nSituação: ${equipamento.situacao}`,
        );
      } else {
        Alert.alert('Equipamento não encontrado');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao buscar equipamento', 'Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Equipamento</Text>
      
      <TextInput
        style={styles.input}
        placeholder='OS'
        value={os}  // Atribui o valor do estado 'os' ao campo
        onChangeText={(novoTexto) => setOs(novoTexto)} // Atualiza o estado 'os'
      />
      
      <TextInput
        style={styles.input}
        placeholder='Código'
        value={codigo}  // Atribui o valor do estado 'codigo' ao campo
        onChangeText={(novoTexto) => setCodigo(novoTexto)} // Atualiza o estado 'codigo'
      />
      
      <Text style={styles.button} onPress={buscarEquipamento}>
        Buscar
      </Text>

      {/* Link para a página de login */}
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Entrar como administrador
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 10,
    fontSize: 16,
  },
});
