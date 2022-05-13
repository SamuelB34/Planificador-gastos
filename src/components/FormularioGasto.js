import React, { useState, useEffect } from 'react'
import {View,Text,Pressable, SafeAreaView, StyleSheet, TextInput, Image} from 'react-native'
import {Picker} from '@react-native-picker/picker';

    const FormularioGasto = ({setModal, handleGasto, gasto, setGasto, eliminarGasto}) => {
    const [ nombre, setNombre] = useState ('')
    const [ monto, setMonto] = useState ('')
    const [ tipo, setTipo] = useState ('')
    const [ id, setId] = useState('')
    const [ fecha, setFecha ] = useState('')

    useEffect(()=>{
        if(gasto?.nombre){
            setNombre(gasto.nombre)
            setMonto(gasto.monto)
            setTipo(gasto.tipo)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }
    }, [gasto])

  return (
    <SafeAreaView style={styles.saview}>
        <View>
            <Pressable
                onPress={()=> {
                    setModal(false)
                    setGasto({})
                }}>
              <Image source={require('../img/Close.png')} style={ styles.closeBtn }/>
            </Pressable>


        </View>

        <View>
            <Text style={styles.textPrincipal}>
                {gasto?.nombre ? 'Editar' 
                : 'Nuevo'} <Text style={styles.textBold}>Gasto</Text>
            </Text>

            <View>
                <Text style={styles.text}> Nombre del gasto</Text>
                <TextInput
                    placeholder='Nombre del gasto. Ej. Comida'
                    placeholderTextColor={'#b0b0b0'}
                    style={styles.inputs}
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            <View>
                <Text style={styles.text}> Monto del gasto</Text>
                <TextInput
                    placeholder='$0.00'
                    placeholderTextColor={'#b0b0b0'}
                    keyboardType='numeric'
                    style={styles.inputs}
                    value={monto}
                    onChangeText={setMonto}
                />
            </View>

            <View>
                <Text style={styles.text}> Tipo de gasto</Text>
                <Picker 
                    style={styles.picker}
                    selectedValue= {tipo}
                    onValueChange= {(itemValue)=>{setTipo (itemValue)}}
                >
                    <Picker.Item label='--Seleccionar--' value=""/>
                    <Picker.Item label="Comida" value="comida"/>
                    <Picker.Item label="Suscripciones" value="suscripciones"/>
                    <Picker.Item label="Salida" value="salida"/>
                    <Picker.Item label="Snacks" value="snacks"/>
                    <Picker.Item label="Otro" value="otro"/>

                </Picker>
            </View>

            <Pressable
                onPress={()=> handleGasto({nombre,monto,tipo, id, fecha})}
            >
                <Text style={styles.agregarGasto}> 
                {gasto?.nombre ? 'Editar Gasto' 
                : 'Agregar Gasto'} </Text>
            </Pressable>
            { !!id && (
                <Pressable
                    onLongPress={()=> eliminarGasto(id)}
                >
                <Image source={require('../img/Eliminar.png')} style={ styles.deleteBtn }/>
                </Pressable>
            ) }

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
    deleteBtn:{  
        alignSelf: 'center',
        width: 290,
        height: 120,
        resizeMode: 'contain',
    },
    textBold:{
        fontWeight:'800'
    },
    textPrincipal:{
        color:'#fff',
        fontSize:28,
        textAlign:'center',
        marginTop:30,
        fontWeight:'400'
    },
    text:{
        color:'#fff',
        fontSize:18,
        marginTop:30,
        marginLeft:20,
        marginBottom: 10
    },
    inputs:{
        marginHorizontal:17,
        backgroundColor:'#ebebeb',
        borderRadius:10,
        padding:8,
        paddingLeft:15,
        color:'#404040'
    },
      saview:{
          backgroundColor:'#436141',
          flex:1
      },
      picker:{
        marginHorizontal:20,
        backgroundColor:'#ebebeb',
        borderRadius:10,
        paddingLeft:15,
        color: '#404040'
      },
      agregarGasto:{
        marginTop:80,
        backgroundColor: '#269443',
        color:'#FFF',
        fontSize:18,
        textAlign:'center',
        // paddingVertical:7,
        marginHorizontal:32,
        padding:15,
        // marginBottom: 15,
        borderRadius: 10
      }
})

export default FormularioGasto
