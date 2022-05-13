import React  from 'react'
import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native'

export const NuevoPresupuesto = ({
    handleNuevoPresupuesto, 
    presupuesto, 
    setPresupuesto
}) => {


  return (
    <View style={styles.contenedor}>
        <Text style={styles.defPresupuesto}>Define tu Presupuesto</Text>
        <TextInput 
            style={styles.input}
            keyboardType='numeric'
            placeholder = '$0.00'
            placeholderTextColor={'#d1d1d1'}
            value = {presupuesto.toString()}
            onChangeText = { setPresupuesto }
        />

        <Pressable
            onPress={() => handleNuevoPresupuesto(presupuesto)}
        >
            <Text style={styles.addPresupuesto}>Agregar Presupuesto</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        marginTop:35,
        backgroundColor:'#353535',
        marginHorizontal: 35,
        borderRadius: 20,
    },
    defPresupuesto:{
        paddingVertical:14,
      color: '#FFF',
      textAlign:'center',
      fontSize:22,

    },
    input:{
        backgroundColor:'#999999',
        paddingVertical:4,
        marginBottom: 15,
        borderRadius: 10,
        marginHorizontal:39,
        textAlign: 'center',
        fontWeight:'600',
        color:'#fff'
    },
    addPresupuesto:{
        backgroundColor: '#269443',
        color:'#FFF',
        fontSize:18,
        textAlign:'center',
        paddingVertical:7,
        marginHorizontal:32,
        padding:15,
        marginBottom: 15,
        borderRadius: 10

    }
   
});

export default NuevoPresupuesto