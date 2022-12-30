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

function idDeMovimiento() {
    if(document.getElementById("tipoDeMovimiento").value === "saldoInicial"){
    id = 0;
    } else {
    if(id = localStorage.key){
        id = localStorage.length + 1;
        localStorage.key(id);
    }}
}

function guardarMovimiento(){
    idDeMovimiento();
    fecha = document.getElementById("fecha").value;
    monto = document.getElementById("monto").value;
    tipoDeMovimiento = document.getElementById("tipoDeMovimiento").value;
    detalle = document.getElementById("detalle").value;
    movimientos.push(new Movimiento(id, fecha, monto, tipoDeMovimiento, detalle));
    for (const movimiento of movimientos) {
        guardarLocal(movimiento.id, JSON.stringify(movimiento));
    }
    mostrarMovimientos();
  }

  //Modificación del DOM para mostrar movimientos:
  const contenedorMovimientos = document.getElementById("contenedorMovimientos");

  const mostrarMovimientos = () => {
    movimientos.forEach( movimiento => {

        const line = document.createElement("div");
        line.classList.add("lineaMovimiento");
        line.innerHTML = `
                <div class="line">
                    <p>${movimiento.fecha}</p>
                    <p>${movimiento.detalle}</p>
                    <p>${movimiento.monto}</p>
                </div>
        `
    contenedorMovimientos.appendChild(line);
    })
  }
  

  let miFormulario = document.getElementById("formulario");
  miFormulario.addEventListener("submit", validarFormulario);
  miFormulario.addEventListener("submit", guardarMovimiento);
 

  function validarFormulario(e){
      e.preventDefault();
  }



/* Estructuras de datos */

//Array para almacenar los movimientos.
const movimientos = [];

/////* Variables */////
let id = 0;



//Guardar valores en localStorage
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

