import React from 'react'
import { Text,View , StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setModal, setGasto, filtro, gastosFiltrados}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Gastos:</Text>

        { filtro ? gastosFiltrados.map( gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGasto={setGasto}
                    />
            )) : gastos.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setModal={setModal}
                    setGasto={setGasto}
                />
            )) }

            { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro) )  &&  (
                <Text style={styles.noGasto}>No Hay Gastos Registrados</Text>
            )}
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        marginTop:10
    },
    titulo:{
        fontSize: 23,
        color: '#fff',
        textAlign:'center',
        marginVertical:20
    },
    noGasto:{
        marginTop: 20,
        textAlign:'center',
        fontSize:20,
        color:'#737373',
        marginBottom: 100
    }
})

export default ListadoGastos