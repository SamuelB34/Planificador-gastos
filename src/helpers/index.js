export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('en-US', 
    {
        style: 'currency',
        currency: 'USD'
    })
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: '2-digit',
        month: 'short',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const generarId = () => {
    const random = Math.random().toString(14).substring(2, 11) //Se esta creando un numero random de 14 digitos, empezando por el segundo hasta el 11
    const fecha = Date.now().toString(36)

    return fecha + random 
}