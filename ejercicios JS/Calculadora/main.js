const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

let dis1Num = "";
/*Solo una de las 2 const*/
let dis2Num = "";
/*Solo una de las 2 const*/
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach(number => {
  /*para cada numero*/
  number.addEventListener("click", (e) => {
    /*cuando click*/
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
      /*Si tiene . ->true(permite), si no no añade nada */
    }
    dis2Num += e.target.innerText;
    /*Se añade el numero clickado*/
    display2El.innerText = dis2Num;
    /*No tiene mucha mas explicacion*/
  });
});

operationEl.forEach((operation) => {
  /*para cada operador*/
  operation.addEventListener("click", (e) => {
    /*cuando click*/
    if (!dis2Num) return;
    /*Si no hay numero abajo->return*/
    haveDot = false;
    /*No permite .*/
    const operationName = e.target.innerText;
    /*Crea constante del operador*/
    if (dis1Num && dis2Num && lastOperation) {
      /*Si las 3 cosas estan se hace la operación*/
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
      /*Si no se le convierte en un numero porque era un string*/
    }
    clearVar(operationName);
    /*a la funcion*/
    lastOperation = operationName;
    /*el primero se convierte en el texto del otro(cuando click )*/
  });
});
function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  /*al numero de arriba se le añade el de abajo y con el operador añadido se pinta*/
  display1El.innerText = dis1Num;
  /*Se pinta arriba*/
  display2El.innerText = "";
  dis2Num = "";
  /*Los de abajo se vacian*/
  tempResultEl.innerText = result;
  /*El numero convertido se pone en el temporal*/
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}
/*Las operaciones -- Lo metido se opera con lo que hay abajo*/

equalEl.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  /*Si no se tiene ningun display no hace nada*/
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  /*El resultado final se muestra abajo*/
  tempResultEl.innerText = "";
  /*El temporal se borra*/
  dis2Num = result;
  /*El resultado final se muestra abajo*/
  dis1Num = "";
  /*El temporal se borra*/
});

clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "0";
  display2El.innerText = "0";
  result = "";
  tempResultEl.innerText = " ";
});
/*Borra todo*/

clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});
/*Borra el que queda abajo*/

window.addEventListener("keydown", (e) => {
  /*Teclado*/
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    /*Cuando click en un numero se ejecuta la funcion*/
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
    /*Cuando click en un operador  se ejecuta la funcion*/
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  /*Cuando click en igual  se ejecuta la funcion*/
});
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalEl.click();
}
/*Si por cada llamada coincide alguno se ejecuta*/