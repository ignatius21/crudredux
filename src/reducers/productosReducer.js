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

// cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null,
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true,
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }    
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case COMENZAR_DESCARGA_EXITO:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: null,
            }
        case COMENZAR_DESCARGA_ERROR:
            return {
                ...state,
                productos: [],
                loading: false,
                error: action.payload,
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload,
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar)
            }
        case ELIMINAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload,
            }
        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case MOSTRAR_ALERTA:
            return {
                ...state,
                error: action.payload,
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}