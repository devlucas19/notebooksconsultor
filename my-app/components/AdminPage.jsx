import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [os, setOs] = useState('');
  const [codigo, setCodigo] = useState('');
  const [situacao, setSituacao] = useState('');
  const [equipamentos, setEquipamentos] = useState([]);
  const [editingId, setEditingId] = useState(null); // Para controlar o equipamento sendo editado

  const adicionarEquipamento = async () => {
    try {
      const dados = { os, codigo, situacao };
      const response = await axios.post('http://10.0.0.118:3000/adicionar', dados);
      console.log(response.data);
      fetchEquipamentos();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get('http://10.0.0.118:3000/equipamentos');
      setEquipamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarEquipamento = async () => {
    try {
      const dados = { os, codigo, situacao };
      const response = await axios.put(`http://10.0.0.118:3000/equipamentos/${editingId}`, dados);
      console.log(response.data);
      fetchEquipamentos();
      setEditingId(null); // Limpar a edição
      setOs('');
      setCodigo('');
      setSituacao('');
    } catch (error) {
      console.log(error);
    }
  };

  const excluirEquipamento = async (id) => {
    try {
      const response = await axios.delete(`http://10.0.0.118:3000/equipamentos/${id}`);
      console.log(response.data);
      fetchEquipamentos();
      Alert.alert('Equipamento excluído', 'Equipamento excluído com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível excluir o equipamento');
    }
  };

  const iniciarEdicao = (item) => {
    setEditingId(item._id); // Marca o equipamento que está sendo editado
    setOs(item.os);
    setCodigo(item.codigo);
    setSituacao(item.situacao);
  };

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='OS'
          value={os}
          onChangeText={setOs}
        />
        <TextInput
          style={styles.input}
          placeholder='Código'
          value={codigo}
          onChangeText={setCodigo}
        />
        <TextInput
          style={styles.input}
          placeholder='Situação'
          value={situacao}
          onChangeText={setSituacao}
        />
        <Button
          title={editingId ? 'Atualizar' : 'Adicionar'}
          onPress={() => {
            if (editingId) {
              editarEquipamento();
            } else {
              Alert.alert('Equipamento adicionado');
              adicionarEquipamento();
            }
          }}
        />
      </View>

      <FlatList
        data={equipamentos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.equipamentoItem}>
            <Text>OS: {item.os}</Text>
            <Text>Código: {item.codigo}</Text>
            <Text>Situação: {item.situacao}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.editButton, styles.actionButton]}
                onPress={() => iniciarEdicao(item)}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, styles.actionButton]}
                onPress={() => excluirEquipamento(item._id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: '100%',
  },
  equipamentoItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 120, // Tamanho fixo para que o conteúdo caiba sem precisar de quebra de linha
    justifyContent: 'space-between', // Para distribuir o conteúdo de maneira equilibrada
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Botões colados à esquerda
    marginTop: 10,
  },
  actionButton: {
    marginRight: 5, // Adiciona um pequeno espaço entre os botões
  },
  editButton: {
    padding: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
