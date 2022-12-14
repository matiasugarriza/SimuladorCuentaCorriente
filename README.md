# Pre Entrega 2 - Matías Ugarriza

## Objetivo del proyecto: Simulador de cuenta corriente.
El proyecto se trata de una simulación de cuenta corriente donde los datos se ingresan de manera manual mediante un cuadro de diálogo generado por un prompt. 
#### Pasos:
1. Se registra un saldo inicial que luego se muestra por consola.
2. Se registra una cantidad de movimientos indefinida y el sistema devuelve los datos de cada movimiento. En paralelo suma o resta estos valores del saldo inicial.
3. Se imprime en consola el saldo final.


## Versión Actual
* Cambios:

* Para mejorar:
    * Crear html de proyecto.
    * Hacer un prompt inicial con mensaje y opciones (1.Cargar Saldo Inicial 2.Cargar Nuevo Movimiento)
    * Hacer un alert que muestre los movimientos.

## Versión 1de1571 "creación array":
* Cambios:
    * Creé una clase para contener un método constructor con las propiedades necesarias para completar la información del movimiento.
    * Declaré un array para almacenar los distintos movimientos.
    * Creé una función que crea objetos y los almacena dentro  del array.
    

## Versión de Pre Entrega 1
* Elementos:
    * Declaré las siguientes variables: 
    ```
    let fechaInicial = 0;
    let saldoInicial = 0;
    let nMov = 0;
    let monto = 0;
    let nuevoMov = 0;
    ```
    * Declaré 2 funciones para sumar cada movimiento e imprimir en pantalla:
    ```
    let sumaSaldo = (a,b) => a + b ;
    function resultado() {
    console.log("Saldo: " + "$" + sumaSaldo(saldoInicial,monto));
    };
    ```