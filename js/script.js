// Lista de palabras para adivinar
const palabras = ['javascript', 'programacion', 'desarrollo', 'algoritmo', 'computadora','visualbasic','procesador','windows','ubuntu','lenguaje','internet','google'];

// Selección aleatoria de una palabra
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabraOculta = palabra.split('').map(() => '_'); // Inicia con la palabra oculta
let intentos = 6; // Número de intentos permitidos
let letrasIncorrectas = [];

// Elementos de la interfaz
const wordElement = document.getElementById('word');
const incorrectLettersElement = document.getElementById('incorrectLetters');
const remainingAttemptsElement = document.getElementById('remainingAttempts');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const resultMessage = document.getElementById('resultMessage');
const hangmanImage = document.getElementById('hangman');

// Función para mostrar el estado actual del juego
function mostrarEstado() {
    wordElement.textContent = palabraOculta.join(' '); // Mostrar la palabra oculta
    incorrectLettersElement.textContent = letrasIncorrectas.join(', '); // Mostrar letras incorrectas
    remainingAttemptsElement.textContent = intentos; // Mostrar los intentos restantes

    // Cambiar la imagen según los intentos restantes
    hangmanImage.src = `img/${6 - intentos}.png`; // Cambia la imagen del ahorcado
}

// Función para manejar la adivinación
function adivinarLetra() {
    const letra = letterInput.value.toLowerCase(); // Obtener la letra ingresada

    // Validar si la entrada es una letra válida
    if (!letra || letra.length !== 1 || !/[a-z]/i.test(letra)) {
        alert('Por favor ingresa una letra válida.');
        return;
    }

    // Comprobar si la letra ya fue adivinada
    if (letrasIncorrectas.includes(letra) || palabraOculta.includes(letra)) {
        alert('Ya adivinaste esa letra.');
        return;
    }

    // Comprobar si la letra está en la palabra
    if (palabra.includes(letra)) {
        // Si la letra está en la palabra, actualizar la palabra oculta
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                palabraOculta[i] = letra; // Reemplazar la letra oculta
            }
        }
    } else {
        // Si la letra no está en la palabra, agregarla a las letras incorrectas
        letrasIncorrectas.push(letra);
        intentos--; // Restar un intento
    }

    // Actualizar el estado del juego
    mostrarEstado();

    // Comprobar si el jugador ha ganado o perdido
    if (palabraOculta.join('') === palabra) {
        resultMessage.textContent = '¡Felicidades! Has adivinado la palabra.';
        resultMessage.style.color = 'green';
    } else if (intentos <= 0) {
        resultMessage.textContent = `¡Has perdido! La palabra era: ${palabra}.`;
        resultMessage.style.color = 'red';
    }

    // Limpiar el campo de entrada
    letterInput.value = '';
    letterInput.focus();
}

// Iniciar el juego
function iniciarJuego() {
    // Reiniciar los valores
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraOculta = palabra.split('').map(() => '_');
    intentos = 6;
    letrasIncorrectas = [];
    resultMessage.textContent = '';
    mostrarEstado();
}

// Manejar el clic en el botón
guessButton.addEventListener('click', adivinarLetra);

// Iniciar el juego al cargar la página
iniciarJuego();
