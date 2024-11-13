import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.0.118:3000/login', {
                usuario,
                senha,
            });
    
            if (response.data.success) {
                Alert.alert('Login bem-sucedido');
                navigation.navigate('Admin');
            } else {
                Alert.alert('Login falhou', response.data.message || 'Usuário ou senha incorretos');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Usuário'
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry // Esconde o texto digitado
            />
            <Button title='LogIn' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});
