import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListarAlunos from './Listar';
import AdicionarAlunos from './Cadastrar';
import DetalhesAlunos from './Detalhes';

const Stack = createStackNavigator();

function MyStack(){
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name = "ListarAlunos"
            component = {ListarAlunos}
            options = {{
                title: "Lista de alunos"
            }}
            />
            <Stack.Screen
            name = "AdicionarAlunos"
            component = {AdicionarAlunos}
            options = {{
                title: "Cadastre um novo aluno"
            }}
            />
            <Stack.Screen
            name = "DetalhesAlunos"
            component = {DetalhesAlunos}
            options = {{
                title: "Detalhes sobre o aluno"
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack;