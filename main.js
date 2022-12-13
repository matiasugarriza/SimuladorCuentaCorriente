
/* CALCULADORA DE SALDOS */

//OBJETIVO: Una aplicación que calcule, a partir de un saldo inicial, los movs diferenciando entre Ingreso y Egreso (Condicional). Se podrán cargar diversos movs (Ciclo) hasta dar por finalizada la carga. Luego, el programa entregará una lista de movs, una suma de Ingresos, una suma de Egresos y el Saldo Final.


/* PASOS DEL PROGRAMA */

// 1) Fecha y Saldo Inicial
let fechaInicial = 0;
let saldoInicial = 0;
function inicio(){
    fechaInicial = prompt("Escriba la fecha Inicial en el siguiente formato: dd/mm/aaaa");
    saldoInicial = parseFloat(prompt("Escriba el saldo Inicial: "));
    while (isNaN(saldoInicial)|| saldoInicial == undefined){
        saldoInicial = 0;
    }
    console.log("Saldo inicial: " + fechaInicial + " --> $" + saldoInicial);
}

inicio();



// 2) Creo una clase que contiene un constructor para crear los movimientos.

class Movimiento {
    constructor(nMovArray, fechaArray, montoArray, tipoMovArray, detalleArray) {
        this.nMovArray = nMovArray;
        this.fechaArray  = fechaArray;
        this.montoArray  = montoArray;
        this.tipoMovArray = tipoMovArray;
        this.detalleArray = detalleArray;
    }
}
// 3) Declaro un array para almacenar los distintos movimientos.
const movimientos = [];

// 4) Creo una función con condicional para crear nuevos movimientos.
let nMov = 0;
let nuevoMov = 0;
function mov() {
    nuevoMov = prompt("¿Desea realizar un nuevo movimiento? Escriba si o no.");
    while(nuevoMov == "Si" || nuevoMov == "si" || nuevoMov == "Sí" || nuevoMov == "sí" || nuevoMov == "S" || nuevoMov == "s") {
        nMov = nMov+1;
        nuevoMovimiento();
    };
};

mov();

// 5) Declaro una función para cargar y almacenar los datos dentro del array de movimientos.
function nuevoMovimiento(){
    let fecha = prompt("Escriba la fecha de este movimiento en el siguiente formato: dd/mm/aaaa");
    let monto = parseFloat(prompt("Ingrese el valor: "));
    while(isNaN(monto)){
        monto=0;
    }
    let tipoMov = parseInt(prompt("¿Qué tipo de movimiento es? Escriba 1 si es un Ingreso y 2 si es un Egreso."))
    let detalle = prompt("Ingrese un detalle sobre el movimiento: ")
    if (tipoMov != 1 || tipoMov == 2) {
        monto = - monto;
    };
    movimientos.push(new Movimiento (nMov, fecha, monto, tipoMov, detalle));
    mov();
};


// 6) Modifico la variable saldoInicial para que sume el monto de cada objeto de array y con for busco dentro del array los datos de cada movimiento que luego imprimo por consola.
for (const movimiento of movimientos) {
    saldoInicial += movimiento.montoArray;
    console.log("Movimiento "+movimiento.nMovArray+": "+movimiento.fechaArray+" --> $"+movimiento.montoArray+" Detalle: "+movimiento.detalleArray+" | Saldo: $"+saldoInicial);
}
    


