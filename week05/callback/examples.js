// examples.js
// Ejemplos de métodos de array y arrow functions

console.log('--- Array Callback Methods & Arrow Functions: ejemplos ---');

const numbers = [1, 2, 3, 4, 5];
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 17 },
  { name: 'Diana', age: 30 }
];

// 1) forEach - ejecutar una función por cada elemento
console.log('\n1) forEach:');
numbers.forEach((n, i) => console.log(`index ${i}: ${n}`));

// 2) map - transformar cada elemento y devolver un nuevo array
console.log('\n2) map:');
const doubled = numbers.map(n => n * 2);
console.log('doubled =>', doubled);

// 3) filter - devolver elementos que cumplan la condición
console.log('\n3) filter:');
const adults = people.filter(p => p.age >= 18);
console.log('adults =>', adults);

// 4) reduce - reducir a un único valor (suma de números)
console.log('\n4) reduce (suma):');
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('sum =>', sum);

// 4b) reduce - agrupar por propiedad
console.log('\n4b) reduce (agrupar por edad adulta):');
const grouped = people.reduce((acc, person) => {
  const key = person.age >= 18 ? 'adult' : 'minor';
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {});
console.log('grouped =>', grouped);

// 5) find - devolver el primer elemento que cumpla la condición
console.log("\n5) find:");
const firstAdult = people.find(p => p.age >= 18);
console.log('firstAdult =>', firstAdult);

// 6) findIndex - devolver el índice del primer elemento que cumpla
console.log('\n6) findIndex:');
const idxCharlie = people.findIndex(p => p.name === 'Charlie');
console.log('index of Charlie =>', idxCharlie);

// 7) some - al menos uno cumple la condición
console.log('\n7) some:');
const hasTeen = people.some(p => p.age < 20);
console.log('hasTeen =>', hasTeen);

// 8) every - todos cumplen la condición
console.log('\n8) every:');
const allAdults = people.every(p => p.age >= 18);
console.log('allAdults =>', allAdults);

// 9) includes - comprobar si un array incluye un valor (primitivo)
console.log('\n9) includes:');
console.log('numbers includes 3 =>', numbers.includes(3));
console.log('numbers includes 7 =>', numbers.includes(7));

// 10) sort - ordenar arrays (cuidado: muta el array)
console.log('\n10) sort:');
const numsToSort = [10, 2, 33, 4];
console.log('before sort =>', numsToSort.slice());
numsToSort.sort((a, b) => a - b);
console.log('after numeric sort =>', numsToSort);

// 11) concat / spread - combinar arrays sin mutar
console.log('\n11) concat / spread:');
const more = [6, 7];
const combined = numbers.concat(more);
const combined2 = [...numbers, ...more];
console.log('combined =>', combined);
console.log('combined2 =>', combined2);

// 12) slice - obtener porciones
console.log('\n12) slice:');
console.log('slice(1,3) =>', numbers.slice(1, 3));

// 13) flatMap - map + flat (ejemplo con strings)
console.log('\n13) flatMap:');
const nested = ['hello world', 'foo bar'];
const words = nested.flatMap(s => s.split(' '));
console.log('words =>', words);

// 14) chaining (map -> filter -> reduce)
console.log('\n14) chaining (map -> filter -> reduce):');
const totalEvenDoubles = numbers
  .map(n => n * 2)
  .filter(n => n % 2 === 0)
  .reduce((acc, n) => acc + n, 0);
console.log('totalEvenDoubles =>', totalEvenDoubles);

// 15) ejemplos con objetos y arrow functions
console.log('\n15) arrow functions con objetos:');
const names = people.map(p => p.name.toUpperCase());
console.log('names uppercase =>', names);

//Dadas estas declaraciones de función:

function calculate(a, b, callback) {
  callback(a + b);
}

function displayResult(result) {
  console.log('The result is: ' + result);
}

//Podemos usar una función de flecha como callback:

function fetchData(callback) {
  // using setTimeout to simulate fetching data from a server
  setTimeout(() => {
    // This calls the 'callback' function and passes data to it.
    callback('Data has been fetched');
  }, 2000); // This simulates a 2-second delay from a service.
}

// function that processes the data
function processData(data) {
  console.log("Data received:", data);
}

// Call the fetchData function and pass the processData function as an argument.
fetchData(processData);


console.log('\n--- Fin de ejemplos ---');
