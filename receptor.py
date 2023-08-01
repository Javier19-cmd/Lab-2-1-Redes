# Función para calcular el checksum de Fletcher
def fletcher_checksum(data, block_size):
    # Asegurarse de que la longitud de los datos sea un múltiplo del tamaño de bloque
    if len(data) % block_size != 0:
        data += '0' * (block_size - len(data) % block_size)

    checksum1 = 0
    checksum2 = 0

    for i in range(0, len(data), block_size):
        block = data[i:i+block_size]

        for bit in block:
            checksum1 = (checksum1 + int(bit)) % 255
            checksum2 = (checksum2 + checksum1) % 255

    return format((checksum2 << 8) | checksum1, 'b')

# Función para determinar el tamaño del bloque más conveniente para la trama de datos
def find_optimal_block_size(data):
    for block_size in [32, 16, 8]:
        if len(data) % block_size == 0:
            return block_size
    return len(data)

# Función para leer la trama desde la consola, determinar el tamaño del bloque más conveniente y calcular el checksum
def read_data_from_console():
    data = input("Ingrese la trama de datos binarios: ")

    block_size = find_optimal_block_size(data)
    checksum = fletcher_checksum(data, block_size)

    print("Trama de datos: " + data)
    print("Tamaño del bloque utilizado: " + str(block_size))
    print("Checksum de Fletcher: " + checksum)

# Llamamos a la función para leer la trama desde la consola y calcular el checksum
read_data_from_console()
