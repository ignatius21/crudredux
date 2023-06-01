import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux' 
import { editarProductoAction } from '../actions/productoActions'
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

const EditarProducto = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [producto,guardarProducto] = useState({
    nombre:'',
    precio:''
  })

  // producto a editar
  const productoeditar = useSelector(state => state.productos.productoeditar);
  

  // llenar el state automaticamente
  useEffect(() => {
    guardarProducto(productoeditar);
  }, [productoeditar])

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }
  
  const { nombre, precio } = producto;


  const submitEditarProducto = e => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    navigate('/');
  }

  const edicionCorrecta = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cambios Guardados Correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                onClick={()=>edicionCorrecta()}
                
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto