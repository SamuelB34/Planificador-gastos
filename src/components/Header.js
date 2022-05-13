import React from 'react'
import {Text, View, StyleSheet,Image} from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
        <Image 
        source={require('../img/dinero.png')}
        style={styles.img}
        />
        <Text style={styles.texto}>Planificador de {''}
            <Text style={styles.textoBold}>gastos</Text>
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    img:{
        marginTop: 20,
        alignSelf: 'center',
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    texto:{
        textAlign: 'center',
        color: '#fff',
        fontSize:23,
        fontWeight:'400',
    },
    textoBold:{
        color:'#269443',
        fontSize: 25,
        fontWeight:'bold',
    },

 
});

export default Header