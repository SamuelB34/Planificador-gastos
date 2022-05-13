import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { formatearCantidad, formatearFecha } from '../helpers'


const diccionarioIconos = {
    comida: require('../img/icono_comida.png'),
    salida: require('../img/icono_ocio.png'),
    suscripciones: require('../img/icono_suscripciones.png'),
    snacks: require('../img/icono_snacks.png'),
    otro: require('../img/other.png')
}

const Gasto = ({gasto, setModal, setGasto}) => {
    const { nombre, monto, tipo, fecha } = gasto
    const handleAcciones = () => {
        setModal(true)
        setGasto(gasto)
    }

  return (
    <Pressable
        onLongPress={handleAcciones}
    >
        <View style={styles.contenedor}>
            <View style={styles.contenido}>
                <View style={styles.contenedorImagen}>
                    <Image 
                        style={styles.imagen}
                        source={diccionarioIconos[tipo]}
                    />
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.tinyText}>Nombre:</Text>
                        <Text style={styles.texto}>{nombre}</Text> 
                        <Text style={styles.tinyText}> Tipo de gasto:</Text>
                        <Text style={styles.texto2}>{tipo}</Text>
                        <Text style={styles.tinyText}> Fecha:</Text>
                        <Text style={styles.textoFecha}>{formatearFecha(fecha)}</Text>
                    </View>
                    <Text style={styles.cantidad}>-{formatearCantidad(monto)}</Text>
                </View>
            </View>
        </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#353535',
        marginBottom:25,
        marginHorizontal: 35,
        padding: 20,
        borderRadius:10,    
    },
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorImagen: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    imagen: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    contenedorTexto: {
        flex: 1
    },
    texto:{
        fontSize:15,
        fontWeight:'700',
        marginBottom:14
    },
    texto2:{
        textTransform: 'capitalize',
        fontSize:15,
        fontWeight:'700',
        marginBottom:14
    },
    tinyText:{
        fontSize:12,
        fontWeight:'300',
        color:'#a6a6a6'
    },
    cantidad:{
        fontWeight:'700',
        fontSize:17,
        color:'#f05d76'
    },
    textoFecha:{
        fontSize:15,
        fontWeight:'700',
    }
    

})

export default Gasto