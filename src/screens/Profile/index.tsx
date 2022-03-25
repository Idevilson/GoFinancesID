import React from 'react';
import { 
    View,
    Text,
    TextInput,
    Button
 } from 'react-native';

 export function Profile(){
     return(
         <View>
            <Text testID="text-title">
                 Perfil
            </Text>

             <TextInput 
                testID="input-name"
                placeholder="Nome"
                autoCorrect={false}
                value="Idevilson"
             />

             <TextInput
                testID="input-surname" 
                placeholder="Sobrenome"
                value="Junior"
             />


             <Button 
                title="Salvar"
                onPress={() => {}} 
            />
         </View>
     )
 }