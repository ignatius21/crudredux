import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        })
    }

    // Funcion que redirige de forma programada
    const history = useNavigate(); // Habilitar history para redireccion

    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history(`/productos/editar/${producto.id}`)
    }



  return (
    <tr>
      <td>{nombre}</td>
      <td>{precio}</td>
      <td>
        <button type='button' className="btn btn-primary mr-2" onClick={()=>redireccionarEdicion(producto)}>
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={()=> confirmarEliminarProducto(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Producto