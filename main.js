

/* CALCULADORA DE SALDOS */

//OBJETIVO: Una aplicación que calcule, a partir de un saldo inicial, los movs diferenciando entre Ingreso y Egreso (Condicional). Se podrán cargar diversos movs (Ciclo) hasta dar por finalizada la carga. Luego, el programa entregará una lista de movs, una suma de Ingresos, una suma de Egresos y el Saldo Final.

//Variables a usar:
let fechaInicial = 0;
let saldoInicial = 0;
let nMov = 0;
let monto = 0;
let nuevoMov = 0;

//Suma de montos y saldo con arrow function.
let sumaSaldo = (a,b) => a + b ;
function resultado() {
    console.log("Saldo: " + "$" + sumaSaldo(saldoInicial,monto));
};


/* PASOS DEL PROGRAMA */


// 1) Fecha y Saldo Inicial
function inicio(){
    fechaInicial = prompt("Escriba la fecha Inicial en el siguiente formato: dd/mm/aaaa");
    saldoInicial = parseFloat(prompt("Escriba el saldo Inicial: "));
    while (isNaN(saldoInicial)|| saldoInicial == undefined){
        saldoInicial = 0;
    }
    console.log("Saldo inicial: " + fechaInicial + " --> $" + saldoInicial);
}

inicio();

// 2) Nuevo Movimiento - Función para realizar nuevos movimientos.
function mov() {
    nuevoMov = prompt("¿Desea realizar un nuevo movimiento? Escriba si o no.");
    Cond();
};

mov();

//3) Condicional para respuesta a nuevo movimiento.
//Función que contiene los datos del movimiento.
function movimiento(){
    fecha = prompt("Escriba la fecha del movimiento 1 en el siguiente formato: dd/mm/aaaa");
    monto = parseFloat(prompt("Ingrese el valor: "));
    while(isNaN(monto)){
        monto=0;
    }
    tipoMov = parseInt(prompt("¿Qué tipo de movimiento es? Escriba 1 si es un Ingreso y 2 si es un Egreso."))
    let detalle = prompt("Ingrese un detalle sobre el movimiento: ")
    if (tipoMov != 1 || tipoMov == 2) {
        monto = - monto;
    };
    console.log("Movimiento "+ nMov +": "+fecha+" - Concepto: "+detalle+"-->"+" $"+monto);
    mov();
};
function Cond() {
    if(nuevoMov == "Si" || nuevoMov == "si" || nuevoMov == "Sí" || nuevoMov == "sí" || nuevoMov == "S" || nuevoMov == "s") {
        nMov = nMov+1;
        saldoInicial = sumaSaldo(saldoInicial,monto);
        movimiento();
    };
}

resultado();


/* Ideas para agregar */