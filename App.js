import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  Text
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import { generarId } from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import EditarPresupuesto from './src/components/EditarPresupuesto';

const App = () => {

  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState( false )
  const [ presupuesto, setPresupuesto] = useState('')
  const [ gastos, setGastos ] = useState([])
  const [ modal, setModal ] = useState(false)
  const [ newModal, setNewModal ] = useState(false)
  const [ gasto, setGasto] = useState({})
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados] = useState([])


  

  // ASYNCSTORAGE
      useEffect(() => {
        const obtenerPresupuestoStorage = async () => {
            try {
              const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

              if(presupuestoStorage > 0 ) {
                setPresupuesto(presupuestoStorage)
                setIsValidPresupuesto(true)
              }
            } catch (error) {
              console.log(error)
            }
        }
        obtenerPresupuestoStorage()
      }, [])

      useEffect(() => { 
        if(isValidPresupuesto) {
          const guardarPresupuestoStorage = async () => {
              try {
                await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
              } catch (error) {
                console.log(error)
              }
          }
          guardarPresupuestoStorage()
        }
      }, [ isValidPresupuesto ])  // Cuando el presupuesto cambie a true se va a activar

      useEffect(() => {
          const obtenerGastosStorage = async () => {
            try {
                const gastosStorage = await AsyncStorage.getItem('planificador_gastos') 

                setGastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
            } catch (error) {
                console.log(error)
            }
          }
          obtenerGastosStorage()
      }, [])

      useEffect(() => {
        const guardarGastosStorage = async () => {
          try {
            await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
          } catch (error) {
            console.log(error)
          }
        }
        guardarGastosStorage();
      }, [gastos])
//ASYNCSTORAGE



  const handleNuevoPresupuesto = (presupuesto) => {
    if(Number(presupuesto) > 0) {
      setIsValidPresupuesto( true )
      
    } else{
      Alert.alert('Valor invalido', 'El presupuesto tiene que ser mayor que $0.00', [{text: 'Aceptar'}])
    }
  }

  const handleGasto = gasto =>{
    if([ gasto.nombre, gasto.categoria, gasto.cantidad ].includes('')){
      Alert.alert('Campo vacíos', 'Todos los campos deben contener un valor', [{text: 'Aceptar'}])
      return
    } 

    if(gasto.id){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
    } else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos ([...gastos, gasto])//Los 3 puntos son para crear una copia de lo que habia, y lo siguiente es para agregar un gasto nuevo
    }

    setModal(!modal) 
  }

  const eliminarGasto = id =>{
      Alert.alert('Eliminar gasto', '¿Seguro que deseas eliminar el gasto?'
      ,[
        { text: 'No', style: 'cancel'},
        { text: 'Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id)

          setGastos( gastosActualizados )
          setModal(!modal)
          setGasto({})
        }}
      ])
  }

  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminará presupuesto y gastos', 
      [
        { text: 'Cancelar', style: 'cancel'},
        { text: 'Reset', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto('')
            setGastos([])
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )

}

  
  return (
    <View>
    <ScrollView>
        <View style={styles.fondo}>
          <Header />

          {isValidPresupuesto ? 
            <ControlPresupuesto 
                presupuesto={presupuesto}
                gastos={gastos}
                resetearApp={resetearApp}
                setNewModal = { setNewModal }
                newModal = {newModal}
            /> 
          : 
          <NuevoPresupuesto 
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
          />}

          {isValidPresupuesto &&(
            <>
              <Filtro 
                setFiltro={setFiltro}
                filtro={filtro}
                gastos={gastos}
                setGastosFiltrados={setGastosFiltrados}
              />
              <ListadoGastos 
                gastos={gastos}
                setModal={setModal}
                setGasto={setGasto}
                filtro = { filtro }
                gastosFiltrados = { gastosFiltrados }
              />
            </>
          )}  
    </View>
    </ScrollView>
       {modal && (
         <Modal 
            animationType='slide'
            visible={modal}
          >

            <FormularioGasto 
              setModal={setModal}
              handleGasto={handleGasto}
              gasto = {gasto}
              setGasto = {setGasto}
              eliminarGasto = {eliminarGasto}
            />

          </Modal>
       )}

        {newModal && (
         <Modal 
            animationType='slide'
            visible={newModal}
          >

            <EditarPresupuesto
              setNewModal={setNewModal}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />

          </Modal>
       )}
       
      {isValidPresupuesto &&(
        <Pressable
          onPress={ ()=> setModal(!modal) }
          style={styles.pressable}
        >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}


      
</View>



  );
};

const styles = StyleSheet.create({
  fondo:{
    backgroundColor: '#4a4a4a',
    minHeight:800
  },
  pressable:{
    marginTop: 30,
    position: 'absolute',
    right: 20,
    bottom: 20
  },

  imagen:{
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
 
});

export default App;
