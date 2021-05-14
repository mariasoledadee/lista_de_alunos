import React from  'react';
import { useState } from 'react';
import {View, TouchableHighlight, TextInput, StyleSheet, Text} from "react-native";

import firebase from "../config/firebase";

export function AdicionarAlunos(props){

    const [alunos, setAlunos] = useState({
        nome: '',
        curso: ''
    })

    const handleChangeText = (nome, value) => {
        setAlunos({...alunos, [nome]: value})
    } //os três pontos é para que o estado atual seja preservado além de atualozar determinado campo com um valor

    const addNovoAluno = async () => {
        if(alunos.nome === ''){
            alert("Por favor, informe um nome")
        }else{
            try {
                await firebase.db.collection('alunos').add({
                    nome: alunos.nome,
                    curso: alunos.curso,
                })
                props.navigation.navigate("ListarAlunos") 
            } catch (error) {
                console.log(error)
            }
        }
    }
    return(
        <View style={styles.container}>
            <View>
                <TextInput 
                placeholder = "Nome" 
                style={styles.input}
                onChangeText = {(value) => handleChangeText('nome', value)}
                />
            </View>
            <View>
                <TextInput
                placeholder = "Curso"
                style={styles.input}
                onChangeText = {(value) => handleChangeText('curso', value)}
                />
            </View>
            <View>
                <TouchableHighlight style={styles.buttonStyle} onPress={() => addNovoAluno()}>
                    <Text style={styles.textButton}>Cadastrar</Text>
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
        padding: 20,
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
    buttonStyle:{
        backgroundColor: '#4E2064',
        margin: 'auto',
        width: 200,
        padding: 15,
        borderRadius: 3,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 2,
        elevation: 5
    },
    textButton:{
        color: '#ccc',
        textAlign: 'center',
        fontSize: 20
    }
})
export default AdicionarAlunos;