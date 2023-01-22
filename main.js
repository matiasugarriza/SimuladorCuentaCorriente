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

///////* Estructuras de datos *////////


/////* Variables */////
let id = 0;

//Guardar valores en localStorage
const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor) };


//Array para almacenar los movimientos.
const movimientos = [];


//////* Funciones: *//////
function fechaActual() {
    const hoy = new Date();
    const ahora = hoy.toLocaleDateString('es-AR');
    const actualizarFecha = document.getElementById("fechaActual");
    actualizarFecha.innerHTML = `: ${ahora}`;
}

//Ordenar Array por fecha:
function ordenarPorFecha() {
    
    movimientos.sort((a, b) => a.fecha > b.fecha);
    
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
    if(isNaN(monto) || fecha <= 0 || tipoDeMovimiento == "null" ){
        Toastify({
            text: "Los datos no pueden estar vacíos.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #b01500, #ff4c05)",
            }
          }).showToast();
    }else{
        movimientos.push(new Movimiento(id, fecha, monto, tipoDeMovimiento, detalle));
        for (const movimiento of movimientos) {
            guardarLocal(movimiento.id, JSON.stringify(movimiento));
        }
        Toastify({
            text: "Movimiento guardado.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #1bb61b, #00c753)",
            }
        }).showToast();
    }
}
//Función para borrar Movimientos ANteriores:
function borrarMovimientosAnteriores() {
    const borrarDatosAnteriores = document.getElementById("contenedorMovimientos");
    borrarDatosAnteriores.innerHTML = ``;
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
    detalle = document.getElementById("detalle").value || tipoDeMovimiento;             
    validarFormularioVacio();
    mostrarMovimientos();
}

function validarFormulario(e){
    e.preventDefault();
}

//Suma del saldos de los movimientos.
function sumarSaldo() {
const sumaSaldo = movimientos.map(movimiento => movimiento.monto).reduce((prev, curr) => prev + curr, 0);
const mostrarSumaSaldo = document.getElementById("saldo");
mostrarSumaSaldo.innerHTML = `: $${sumaSaldo.toFixed(2)} `
}

//Filtros para buscar movimientos

function filtroMovimientos(){
    const filtroMovimientos = document.getElementById("filtrarMovimientos");
    const egresos = Array.from(document.querySelectorAll(".Egreso"));
    const ingresos = Array.from(document.querySelectorAll(".Ingreso"));

    filtroMovimientos.addEventListener("change", (e) =>{
        if(e.target.value == "ingresos"){
        egresos.forEach(egreso => {
            egreso.setAttribute('style', 'display:none');
        });
        ingresos.forEach(ingreso => {
            ingreso.setAttribute('style', 'display:grid');
        });
        } else if(e.target.value == "egresos"){
        egresos.forEach(egreso => {
            egreso.setAttribute('style', 'display:grid');
            });
        ingresos.forEach(ingreso => {
            ingreso.setAttribute('style', 'display:none');
        });  
        }else{
            egresos.forEach(egreso => {
                egreso.setAttribute('style', 'display:grid');
            });
            ingresos.forEach(ingreso => {
                ingreso.setAttribute('style', 'display:grid');
            });
        }
    });
}


/* EVENTOS Y BOTONES */
const miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);
miFormulario.addEventListener("submit", guardarMovimiento);



//Botón Borrar todo:
const btnBorrarTodo = document.getElementById("borrarTodo");
btnBorrarTodo.addEventListener("click", BorrarTodo => {
Swal.fire({
    title: 'Estás a punto de eliminar todos los movimientos.',
    text: "¿Estás seguro?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#663399',
    cancelButtonColor: '#dc3741',
    confirmButtonText: '¡Sí, borrar todo!',
    showClass:{
        popup: 'animate__pulse'
    },
    hideClass: {
        popup: 'animate__fadeOut'
    }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            localStorage.clear(),
            'Todos los movimientos han sido eliminados.',
            ),
            borrarMovimientosAnteriores(),
            movimientos.splice(0, movimientos.length)
            }})
    });

//Botón cargar movimientos de ejemplo:

const mostrarEjemplos = document.getElementById("ejemplos");
mostrarEjemplos.addEventListener("click", traerEjemplos => {
    fetch('movimientos.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        data.forEach((traerMovimiento) => {
            idDeMovimiento();
            traerMovimiento.id = id;
            movimientos.push(traerMovimiento);
            for (const movimiento of movimientos) {
                guardarLocal(id, JSON.stringify(movimiento));
            }
        })
        mostrarMovimientos();
    });
})

//Modificación del DOM para mostrar movimientos:
const contenedorMovimientos = document.getElementById("contenedorMovimientos");
const mostrarMovimientos = () => {
    borrarMovimientosAnteriores();
    movimientos.forEach( movimiento => {
        ordenarPorFecha();
        const line = document.createElement("div");
        line.setAttribute("id",`${movimiento.id}`);
        line.classList.add("columnasMovimientos");
        line.classList.add("lineaMovimientos");
        line.classList.add(`${movimiento.tipoDeMovimiento}`)
        line.innerHTML = `
                    <input type="checkbox" class="checkbox" id="checkbox${movimiento.id}"></input>
                    <label for="checkbox${movimiento.id}">${movimiento.fecha}</label>
                    <label for="checkbox${movimiento.id}">${movimiento.detalle}</label>
                    <label for="checkbox${movimiento.id}"> $ ${movimiento.monto}</label>
        `
        contenedorMovimientos.appendChild(line);
        });
    sumarSaldo();
    filtroMovimientos();
    
};


  
//////*Programa*//////
recuperarLocalStorage();

