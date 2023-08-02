const readline = require('readline');

function calculateParityBits(data, parityBitsCount) {
  const result = [];
  let dataIndex = 0;

  for (let i = 1; i <= data.length + parityBitsCount; i++) {
    if (i === Math.pow(2, result.length)) {
      // Es un bit de paridad, inicialmente se establece en 0.
      result.push(0);
    } else {
      result.push(parseInt(data.charAt(dataIndex++), 10));
    }
  }

  for (let i = 0; i < parityBitsCount; i++) {
    let parityBitIndex = Math.pow(2, i) - 1;
    let parity = 0;

    for (let j = parityBitIndex; j < result.length; j++) {
      if (((j + 1) & (parityBitIndex + 1)) !== 0) {
        parity ^= result[j];
      }
    }

    result[parityBitIndex] = parity;
  }

  return result.join('');
}

function hammingCorrect(data, resultLength) {
  const dataLength = data.length;
  const parityBitsCount = Math.ceil(Math.log2(dataLength + resultLength + 1));

  // Calcular los bits de paridad para la cadena de entrada.
  const calculatedParityBits = calculateParityBits(data, parityBitsCount);

  // Simular un error en uno de los bits.
  const errorBitIndex = Math.floor(Math.random() * (dataLength + resultLength));
  calculatedParityBits[errorBitIndex] = (calculatedParityBits[errorBitIndex] ^ 1).toString();

  // Calcular nuevamente los bits de paridad para detectar el bit erróneo.
  const correctedParityBits = calculateParityBits(calculatedParityBits, parityBitsCount);

  // Corregir el error si se detecta uno.
  if (correctedParityBits !== calculatedParityBits) {
    calculatedParityBits[errorBitIndex] = (calculatedParityBits[errorBitIndex] ^ 1).toString();
  }

  // Eliminar los bits de paridad y devolver la cadena corregida.
  const correctedData = [];
  let dataIndex = 0;
  for (let i = 0; i < calculatedParityBits.length; i++) {
    if (((i + 1) & (i + 1 - Math.pow(2, dataIndex))) !== 0) {
      correctedData.push(calculatedParityBits[i]);
    } else {
      dataIndex++;
    }
  }

  // Rellenar con NaN si falta la longitud de resultado especificada
  while (correctedData.length < resultLength) {
    correctedData.push("NaN");
  }

  return correctedData.join('');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingrese la cadena de bits: ", function(data) {
  rl.question("Ingrese la longitud del resultado: ", function(resultLength) {
    const correctedData = hammingCorrect(data, parseInt(resultLength, 10));

    console.log("Cadena resultante corregida:", correctedData);

    rl.close();
  });
});
