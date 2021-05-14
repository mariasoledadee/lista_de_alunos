import React, { useState } from  'react';
import { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Text, View, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import firebase from '../config/firebase'

export function DetalhesAlunos(props){

    const estadoInicial = {
            id: '',
            nome: '',
            curso: ''
    }
    const [aluno, setAluno] = useState()

    const [loading, setLoading] = useState(true);

    const alunoPorId = async (id) => {
        const dbRef = firebase.db.collection("alunos").doc(id)
        const doc = await dbRef.get()
        const aluno = doc.data();
        setAluno({
            ...aluno,
            id: doc.id
        });
        setLoading(false)
    }

    useEffect(() => {
        alunoPorId(props.route.params.alunoId)
    }, [])

    const handleChangeText = (nome, value) => {
        setAluno({...aluno, [nome]: value})
    }

    const excluirAluno = async () => {
        const dbRef = firebase.db.collection("alunos").doc(props.route.params.alunoId)
        await dbRef.delete();
        props.navigation.navigate("ListarAlunos")
    }

    const atualizarAluno = async () => {
        const dbRef = firebase.db.collection('alunos').doc(aluno.id)
        await dbRef.set({
            nome: aluno.nome,
            curso: aluno.curso
        })
        setAluno(estadoInicial)
        props.navigation.navigate("ListarAlunos")
    }
    const confirmarExclusao = () => {
        Alert.alert("Excluir aluno", "Tem certeza?", [
            {text: 'Sim', onPress: () => excluirAluno()},
            {text: 'Não', onPress: () => console.log(false)},
        ])
    }

    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"S/>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <View>
                <TextInput 
                placeholder = "Nome"
                value={aluno.nome}
                style={styles.input}
                onChangeText = {(value) => handleChangeText('nome', value)}
                />
            </View>
            <View>
                <TextInput
                placeholder = "Curso"
                value={aluno.curso}
                style={styles.input}
                onChangeText = {(value) => handleChangeText('curso', value)}
                />
            </View>
            <View style={styles.buttonsDetails}>
                <TouchableHighlight style={styles.buttonAtualizar} onPress={() => atualizarAluno()}>
                    <Text style={styles.textButton}>Atualizar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonExcluir} onPress={() => confirmarExclusao()}>
                    <Text style={styles.textButton}>Excluir</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
        backgroundColor: '#623D74',
    },
    input:{
        flex: 1,
        padding: 25,
        width: 300,
        margin: 'auto',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 2,
        elevation: 5
    },
    
    buttonAtualizar:{
        marginHorizontal: 'auto',
        width: 200,
        padding: 10,
        borderRadius: 3,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#20644B',
        marginBottom: 10
    },
    buttonExcluir:{
        marginHorizontal: 'auto',
        width: 200,
        padding: 10,
        borderRadius: 3,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#8F0101',
    },
    textButton:{
        color: '#ccc',
        textAlign: 'center',
        fontSize: 20
    }
})
export default DetalhesAlunos;