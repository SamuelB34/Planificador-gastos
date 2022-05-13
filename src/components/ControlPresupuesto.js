import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import {formatearCantidad} from '../helpers/index';
import CircularProgress from 'react-native-circular-progress-indicator';
import EditarPresupuesto from './EditarPresupuesto';

const ControlPresupuesto = ({presupuesto, gastos, resetearApp, setNewModal, newModal}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [ porcentaje, setPorcentaje ] = useState(0)

    useEffect(() => {

        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.monto) + total, 0 )
        //"total", es un valor que va siendo acumulado, y "gasto" es el elemento que se va iterando del array
        //estamos llamando a gastos, aplicandole el reduce
        //llamando el monto

        const totalDisponible = presupuesto - totalGastado

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
        )

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);


    }, [gastos, presupuesto])

  return (
    <View style={ styles.contenedor}>
       <View style={styles.grafica}>
           <CircularProgress 
                value={ porcentaje }
                duration={1000}
                radius={ 110 }
                valueSuffix={'%'}
                title='Gastado'
                titleStyle={{ fontWeight: 'bold', fontSize: 20}}
                inActiveStrokeColor='#757575'
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                activeStrokeColor='#269443'
           />
       </View>

       <View style={styles.contCantidades}>

             <Pressable
                onPress={ ()=> setNewModal(!newModal) }
                style={styles.pressableDos}
             >
                <Text style={styles.textoBtn}> Editar presupuesto</Text>
            </Pressable>

           <Pressable
                style={ styles.boton }
                onLongPress={ resetearApp }
           >
               <Text style={styles.textoBtn}>Reset</Text>
           </Pressable>
           <Text style={styles.texto}>
               <Text style={styles.label}> Presupuesto: {''}</Text>
               {formatearCantidad(presupuesto)}
           </Text>

           <Text style={styles.texto}>
               <Text style={styles.label}> Disponible: {''}</Text>
               {formatearCantidad(disponible)}
           </Text>

           <Text style={styles.textoGastado}>
               <Text style={styles.label}> Gastado: {''}</Text>
                {formatearCantidad(gastado)}
           </Text>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
    contenedor:{
        marginTop:35,
        backgroundColor:'#353535',
        marginHorizontal: 35,
        borderRadius: 20,
        paddingTop:30,
        paddingBottom: 15
    },
    image:{
        // marginTop: 20,
        alignSelf: 'center',
        width: 220,
        height: 220,
        resizeMode: 'contain',

    },
    texto:{
        color:'#fff',
        marginBottom:10,
        textAlign:'center'
    },
    textoGastado:{
        color:'#f05d76',
        marginBottom:10,
        textAlign:'center'
    },
    contCantidades:{
        marginTop:20,
        paddingHorizontal: 20,

    },
    label:{
        fontWeight:'700',
        color: '#269443'
    },
    grafica:{
        alignItems: 'center'
    },
    textoBtn:{
        color:'#fff',
        textAlign: 'center'
    },
    boton:{
        marginVertical:15,
        backgroundColor:'#ba4536',
        marginHorizontal: 50,
        padding: 10,
        borderRadius: 8
    },
    pressableDos:{
        marginHorizontal: 50,
        padding: 10,
        borderRadius: 8,
        backgroundColor:'green'
      },
   
  });


export default ControlPresupuesto