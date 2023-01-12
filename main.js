///////* Clases *////////

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

//////* Funciones: *//////
function fechaActual() {
    const hoy = new Date();
    const ahora = hoy.toLocaleDateString('es-AR');
    const actualizarFecha = document.getElementById("fechaActual");
    actualizarFecha.innerHTML = `: ${ahora}`;
}

//Recupero los datos del localStorage al iniciar recargar la página.
function recuperarLocalStorage() {
    for (let i = 1; i <= localStorage.length; i++) {
        const movimientoRecuperado = JSON.parse(localStorage.getItem(i));
        movimientos.push(movimientoRecuperado);
    }
    mostrarMovimientos();
    fechaActual();
}

//Le doy un número de id a cada movimiento dependiendo si ese id ya existe en el local storage.
function idDeMovimiento() {
    id = 1;
    if(id = localStorage.key){
        id = localStorage.length + 1;
        localStorage.key(id);
    }
}
//Validación al enviar formulario.
function validarFormularioVacio() {
    if(monto == 0 || fecha <= 0 || tipoDeMovimiento.value === "Seleccione una opción" ){
        const avisoCompletarMonto = document.getElementById("avisos");
        avisoCompletarMonto.classList.add("aviso");
        avisoCompletarMonto.innerHTML = `
                <p>Los datos no pueden estar vacíos.<p>
        ` ;
    }else{
        const borrarAviso = document.getElementById("avisos");
        borrarAviso.innerHTML = ``;
        movimientos.push(new Movimiento(id, fecha, monto, tipoDeMovimiento, detalle));
        for (const movimiento of movimientos) {
            guardarLocal(movimiento.id, JSON.stringify(movimiento));
        }
    }
}
//Ordeno los movimientos según su fecha:
function ordenarPorFecha(){
    movimientos.sort((a, b) => {
        if (a.fecha < b.fecha) {
        return 1;
        }
        if (a.fecha > b.fecha) {
        return -1;
        }
        return 0;
        });
}
//Esta función toma los valores del formulario, borra los datos del contenedorMovimientos y los vuelve a escribir para que los movimientos queden ordenados segun fecha.
function guardarMovimiento(){
    idDeMovimiento();
    fecha = document.getElementById("fecha").value;
    monto = parseFloat(document.getElementById("monto").value);
    if(document.getElementById("tipoDeMovimiento").value == "Egreso"){
        monto *= -1;
    };
    tipoDeMovimiento = document.getElementById("tipoDeMovimiento").value;
    if (document.getElementById("detalle").value == ""){
        detalle = document.getElementById("tipoDeMovimiento").value;
    } else {
        detalle = document.getElementById("detalle").value;
    };
    console.log(movimientos);
    validarFormularioVacio();
    const borrarDatosAnteriores = document.getElementById("contenedorMovimientos");
    borrarDatosAnteriores.innerHTML = ``;
    mostrarMovimientos();
  }

  //Suma del saldos de los movimientos.
  function sumarSaldo() {
    const sumaSaldo = movimientos.map(movimiento => movimiento.monto).reduce((prev, curr) => prev + curr, 0);
    const mostrarSumaSaldo = document.getElementById("saldo");
    mostrarSumaSaldo.innerHTML = `: $${sumaSaldo.toFixed(2)} `
  }
  //Modificación del DOM para mostrar movimientos:
  const contenedorMovimientos = document.getElementById("contenedorMovimientos");

  const mostrarMovimientos = () => {
    ordenarPorFecha();
    movimientos.forEach( movimiento => {
        const line = document.createElement("div");
        line.classList.add("columnasMovimientos");
        line.classList.add("lineaMovimientos");
        line.innerHTML = `
                    <p>${movimiento.fecha}</p>
                    <p>${movimiento.detalle}</p>
                    <p>${movimiento.monto}</p>
        `
    contenedorMovimientos.appendChild(line);
    })
    sumarSaldo();
  }
  

  let miFormulario = document.getElementById("formulario");
  miFormulario.addEventListener("submit", validarFormulario);
  miFormulario.addEventListener("submit", guardarMovimiento);
 

  function validarFormulario(e){
      e.preventDefault();
  }



///////* Estructuras de datos *////////

//Array para almacenar los movimientos.
const movimientos = [];


/////* Variables */////
let id = 0;

//Guardar valores en localStorage
const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor) };

//////*Programa*//////
recuperarLocalStorage();