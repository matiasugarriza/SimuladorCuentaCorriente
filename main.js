/* Clases */

//Clase para instanciar el constructor de objeto
class Movimiento {
    constructor(id, fecha, monto, tipoDeMovimiento, detalle) {
        this.id = id;
        this.fecha = fecha;
        this.monto = monto;
        this.tipoDeMovimiento = tipoDeMovimiento;
        this.detalle = detalle;
    }
}

/* Funciones: */
function respuestaClick(){
    id ++;    
    fecha = document.getElementById("fecha").value;
    monto = document.getElementById("monto").value;
    tipoDeMovimiento = document.getElementById("tipoDeMovimiento").value;
    detalle = document.getElementById("detalle").value;
    movimientos.push(new Movimiento(id, fecha, monto, tipoDeMovimiento, detalle));
    localStorage.setItem("id", id);
    for (const movimiento of movimientos) {
        guardarLocal(movimiento.id, JSON.stringify(movimiento));
    }
  }



/* Estructuras de datos */

//Array para almacenar los movimientos.
const movimientos = [];

/////* Variables */////
let id = 0;

//EnventListener Botón Guardar
let boton = document.getElementById("btnGuardar")
boton.addEventListener("click", respuestaClick)

//Guardar valores en localStorage
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };



/* Ejecución del código */

//Recuperar valores en localStorage
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    localStorage.getItem(localStorage.key(i));
  }