import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_EXITO,
    COMENZAR_DESCARGA_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,     
 } from '../types';

import clienteAxios from '../config/axios'; 

import Swal from 'sweetalert2';


// Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(nuevoProducto());

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);
            dispatch(agregarProductoExito(producto));
            // Alerta
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto Agregado Correctamente',
                showConfirmButton: false,
                timer: 1500
              })

        } catch (error) {
            console.log(error)
            // Si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// Funcion que descarga los productos de la base de datos

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: COMENZAR_DESCARGA_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: COMENZAR_DESCARGA_ERROR,
    payload: true
})


// Selecciona y elimina el producto

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            // Si se elimina, mostrar alerta
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto Eliminado Correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: ELIMINAR_PRODUCTO_EXITO
})

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
})


// Colocar producto en edicion

export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));

    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})


// Edita un registro en la api y state

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = producto => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
})


const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
})


// Muestra alerta

export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch(mostrarAlerta(alerta));

        setTimeout(() => {
            dispatch(ocultarAlertaAction());
        }, 3000);
    }
}

const mostrarAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

const ocultarAlertaAction = () => ({
    type: OCULTAR_ALERTA
})




