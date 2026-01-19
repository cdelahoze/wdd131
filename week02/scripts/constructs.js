let a = 7;
let b = 3;

function constructsDemo() {
  console.log("Initial values:");
  console.log("a = " + a);
  console.log("b = " + b);

  // Addition assignment (+=)
  a += b;
  console.log("\na += b → a is now: " + a);

  // Subtraction assignment (-=)
  a -= b;
  console.log("a -= b → a is now: " + a);

  // Multiplication assignment (*=)
  a *= b;
  console.log("a *= b → a is now: " + a);

  // Division assignment (/=)
  a /= b;
  console.log("a /= b → a is now: " + a);

  // Exponentiation assignment (**=)
  a **= b;
  console.log("a **= b → a is now: " + a);

  // Remainder assignment (%=)
  a %= b;
  console.log("a %= b → a is now: " + a);

  // Logical AND assignment (&&=)
  a &&= b;
  console.log("a &&= b → a is now: " + a);

  // Logical OR assignment (||=)
  a ||= b;
  console.log("a ||= b → a is now: " + a);
}

constructsDemo();

// querySelector Examples
function queryDemo() {
  // Select by tag name
  const article = document.querySelector('article');
  console.log('\n--- querySelector Demo ---');
  console.log('Article element:', article);
  
  // Select by ID
  const title = document.querySelector('#title');
  console.log('Title by ID:', title.textContent);
  
  // Select by class
  const content = document.querySelector('.content');
  console.log('Content by class:', content);
  
  // Demonstrate innerHTML vs textContent
  article.innerHTML = 'innerHTML supports <strong>HTML</strong> tags. The textContent property does not.';
  console.log('Article innerHTML changed with HTML tags');
  
  // Modify elements
  const result = document.querySelector('#result');
  result.textContent = 'Demo completed! Check console.';
  result.style.color = 'green';
  result.style.fontWeight = 'bold';
  
  // Select button and add click event
  const button = document.querySelector('#run-btn');
  button.addEventListener('click', function() {
    console.log('\n🔄 Button clicked! Running demo again...');
    a = 7;
    b = 3;
    constructsDemo();
    result.textContent = 'Demo executed! Check console for results.';
    result.style.color = 'blue';
  });
}

// Run querySelector demo when page loads
queryDemo();
