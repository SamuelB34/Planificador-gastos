import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Picker  } from '@react-native-picker/picker'

const Filtro = ({ setFiltro, filtro, gastos, setGastosFiltrados }) => {

    useEffect(() => {
        if( filtro === ''){
            setGastosFiltrados([])
        }else{
            const gastosFiltrados = gastos.filter( gasto => gasto.tipo === filtro )

            setGastosFiltrados( gastosFiltrados )
        }

    },[ filtro ]) // Cada que cambie [filtro], se va a ejecutar el useEffect

  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}> Filtrar gastos </Text>
        <Picker 
            style={styles.picker}
            selectedValue={filtro}
            onValueChange={(valor) => //al momento de recibir un cambio, se va a enviar a "valor"
                setFiltro(valor)
            }
        >
                    <Picker.Item label='--Seleccionar--' value=""/>
                    <Picker.Item label="Comida" value="comida"/>
                    <Picker.Item label="Suscripciones" value="suscripciones"/>
                    <Picker.Item label="Salida" value="salida"/>
                    <Picker.Item label="Snacks" value="snacks"/>
                    <Picker.Item label="Otro" value="otro"/>

        </Picker>

    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#353535',
        marginHorizontal: 35,
        borderRadius: 15,
        padding: 12,
        marginTop: 30,
    },
    label:{
        textAlign:'center',
        color:'#636363',
        fontWeight:'700'
    },
    picker:{
        borderRadius:10,
        paddingLeft:15,
        color: '#636363',
        textAlign:'center'
      },

})

export default Filtro