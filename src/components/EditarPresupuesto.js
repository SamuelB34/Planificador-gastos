import React, { useState, useEffect } from 'react'
import {View, Text, Pressable, SafeAreaView, StyleSheet, TextInput, Image} from 'react-native'

const EditarPresupuesto = ({setNewModal, presupuesto, setPresupuesto, handleNuevoPresupuesto, disponible}) => {


  return (
    <SafeAreaView style={styles.saview}>
        <View>
            <Pressable
                onPress={()=> {
                    setNewModal(false)
                }}>
              <Image source={require('../img/Close.png')} style={ styles.closeBtn }/>
            </Pressable>

            <Text style={styles.defPresupuesto}>Editar Presupuesto</Text>

            <TextInput 
                style={styles.input}
                keyboardType='numeric'
                placeholder = '$0.00'
                placeholderTextColor={'#d1d1d1'}
                value = {presupuesto.toString()}
                onChangeText = { setPresupuesto }
            />

            <Pressable
                onLongPress={() =>{ 
                    handleNuevoPresupuesto(presupuesto) 
                    {setNewModal(false)}
                }}
            >
                <Text style={styles.addPresupuesto}>Agregar Presupuesto</Text>
            </Pressable>


        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    closeBtn:{  
        marginTop: 20,
        marginRight: 20,
        alignSelf: 'flex-end',
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
      saview:{
          backgroundColor:'#436141',
          flex:1
      },
      addPresupuesto:{
        backgroundColor: '#269443',
        color:'#FFF',
        fontSize:18,
        textAlign:'center',
        paddingVertical:7,
        marginHorizontal:35,
        padding:15,
        marginBottom: 15,
        borderRadius: 10

    },
    input:{
        backgroundColor:'#999999',
        paddingVertical:4,
        marginBottom: 15,
        borderRadius: 10,
        marginHorizontal:35,
        textAlign: 'center',
        fontWeight:'600',
        color:'#fff'
    },
    defPresupuesto:{
        marginTop:50,
        paddingVertical:30,
        color: '#FFF',
        textAlign:'center',
        fontSize:22,

    },
})

export default EditarPresupuesto
