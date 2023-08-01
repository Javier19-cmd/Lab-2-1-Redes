const readline = require('readline');

// Función para calcular el bit de paridad en una posición específica
function calculateParityBit(data, pos) {
  let count = 0;
  for (let i = pos - 1; i < data.length; i += pos * 2) {
    for (let j = 0; j < pos && i + j < data.length; j++) {
      if (data[i + j] === "1") {
        count++;
      }
    }
  }
  return count % 2 === 0 ? "0" : "1";
}

// Función para calcular los bits de paridad y agregarlos a los datos originales
function addParityBits(data) {
  const parityBits = [];
  let pos = 1;
  let newData = "";

  // Insertar posiciones para los bits de paridad con valor '0'
  for (let i = 0; i < data.length; i++) {
    if (Math.pow(2, pos) === i + pos) {
      newData += "0";
      pos++;
    }
    newData += data[i];
  }

  pos = 1;
  while (Math.pow(2, pos) <= newData.length) {
    const parityBit = calculateParityBit(newData, Math.pow(2, pos));
    parityBits.push(parityBit);
    pos++;
  }

  // Agregar bits de paridad al final de los datos originales
  newData += parityBits.join("");

  return newData;
}

// Función para leer la trama desde la consola y procesarla
function readDataFromConsole() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Ingrese la trama en binario (por ejemplo, '110101'): ", (trama) => {
    rl.close();
    const dataWithParity = addParityBits(trama);
    console.log("Trama enviada: " + dataWithParity);
  });
}

// Llamamos a la función para leer la trama desde la consola
readDataFromConsole();