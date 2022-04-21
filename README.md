## **Callbacks:**
## A callback is a simple function that's passed as a value to another function, and will only be executed when the event happens.
One common example is by using timers:


**setTimeout(() => {**

`  `**// runs after 2 seconds**

**}, 2000)**

There are two types of callbacks: synchronous and asynchronous callbacks.

A **synchronous** callback is executed during the execution of the high-order function that uses the callback. 

An **asynchronous** callback is executed after the execution of the high-order function that uses the callback.

Asynchronicity means that if JavaScript has to wait for an operation to complete, it will execute the rest of the code while waiting.

Note that JavaScript is a single-threaded programming language. It carries asynchronous operations via the callback queue and[ event loop](https://www.javascripttutorial.net/javascript-event-loop/).


Handling errors in callbacks:

The first parameter in any callback function is the error object.

If there is no error, the object is null. If there is an error, it contains some description of the error and other information.

const fs = require('fs')

fs.readFile('/file.json', (err, data) => {

`  `if (err) {

`    `//handle error

`    `console.log(err)

`    `return

`  `}

`  `//no errors, process data

`  `console.log(data)

})
## **The problem with callbacks:**
Callbacks are great for simple cases!

However every callback adds a level of nesting, and when you have lots of callbacks, the code starts to be complicated very quickly.

Functions that are async and use callbacks don't return anything right away.

**var** photo **=** downloadPhoto('http://coolcats.com/cat.gif')

// photo is 'undefined'!

In this case the gif might take a very long time to download, and you don't want your program to pause (aka 'block') while waiting for the download to finish.

Instead, you store the code that should run after the download is complete in a function. This is the callback! 

The biggest hurdle people have when trying to understand callbacks is understanding the order that things execute as a program runs. 

**Call Back Hell:**

**This is a big issue caused by coding with complex nested callbacks. Here, each and every callback takes an argument that is a result of the previous callbacks. In this manner, The code structure looks like a pyramid, making it difficult to read and maintain.**

Starting with ES6, JavaScript introduced several features that help us with asynchronous code that do not involve using callbacks: Promises (ES6) and Async/Await (ES2017).

**Promise:**

Promises are one way to deal with asynchronous code, without getting stuck in callback hell.

Promises are objects that represent the eventual outcome of an asynchronous operation. A Promise object can be in one of three states:

1) Pending: The initial state— the operation has not completed yet.

1) Fulfilled: The operation has completed successfully, and the promise now has a resolved value. For example, a request’s promise might resolve with a JSON object as its value.


1) Rejected: The operation has failed, and the promise has a reason for the failure. This reason is usually an Error of some kind.


Constructing a Promise Object:

const executorFunction = (resolve, reject) => { };

const myFirstPromise = new Promise(executorFunction);


The executor function has two function parameters, usually referred to as the resolve() and reject() functions. The resolve() and reject() functions aren’t defined by the programmer. When the Promise constructor runs, JavaScript will pass its own resolve() and reject() functions into the executor function.

var promise = new Promise(function(resolve, reject) {

`  `// do thing, then…

`  `if (/\* everything worked \*/) {

`	`resolve("See, it worked!");

`  `}

`  `else {

`	`reject(Error("It broke"));

`  `}

});

**Using ‘Then’ (Promise Chaining):**

To take several asynchronous calls and synchronize them one after the other, you can use promise chaining. This allows using a value from the first promise in later subsequent callbacks.

Promise.resolve('some')

`  `.then(function(string) { // <-- This will happen after the above Promise resolves (returning the value 'some')

`    `return new Promise(function(resolve, reject) {

`      `setTimeout(function() {

`        `string += 'thing';

`        `resolve(string);

`      `}, 1);

`    `});

`  `})

`  `.then(function(string) { // <-- This will happen after the above .then's new Promise resolves

`    `console.log(string); // <-- Logs 'something' to the console

`  `});

.catch() – Use to handle the error

If at any point in the chain of functions a value is *rejected* the chain will skip to the nearest catch() handler.

.finally() – Use to execute in either case, both reject and resolve case, the finally method will be executed.

## **Promise.all(iterable): or Orchestrating promises**
###
###
### It is very useful for multiple requests to different source.
The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.

var promise1 = Promise.resolve(catSource);

var promise2 = Promise.resolve(dogSource);

var promise3 = Promise.resolve(cowSource);

Promise.all([promise1, promise2, promise3]).then(function(values) {

`  `console.log(values);

});

// expected output: Array ["catData", "dogData", "cowData"]

### **Promise.race()**

Promise.race() runs when the first of the promises you pass to it settles (resolves or rejects), and it runs the attached callback just once, with the result of the first promise settled.

const first = new Promise((resolve, reject) => {

`  `setTimeout(resolve, 500, 'first')

})

const second = new Promise((resolve, reject) => {

`  `setTimeout(resolve, 100, 'second')

})

Promise.race([first, second]).then(result => {

`  `console.log(result) // second

})
### **Promise.any()**

Promise.any() settles when any of the promises you pass to it fulfill or all of the promises get rejected. It returns a single promise that resolves with the value from the first promise that is fulfilled. If all promises are rejected, then the returned promise is rejected with an AggregateError.

const first = new Promise((resolve, reject) => {

`  `setTimeout(reject, 500, 'first')

})

const second = new Promise((resolve, reject) => {

`  `setTimeout(reject, 100, 'second')

})

Promise.any([first, second]).catch(error => {

`  `console.log(error) // AggregateError

})

## Function Generators**:**
##
In recent releases, JavaScript has introduced more ways to natively handle Promises. One such way is the function generator. Function generators are “pausable” functions. When used with Promises, generators can make using a lot easier to read and appear “synchronous”.

const myFirstGenerator = function\* () {

`  `const one = yield 1;

`  `const two = yield 2;

`  `const three = yield 3;

`  `return 'Finished!';

}

const gen = myFirstGenerator();


console.log(gen.next());

// Returns { value: 1, done: false }

As we keep calling gen.next() it will keep going onto the next yield and pausing each time. Once there are no more yield’s left, it will proceed to run the rest of the generator, which in this case simply returns 'Finished!'. If you call gen.next() again, it will throw an error as the generator is finished.

##

**Async/Await**

**async** makes a function return a Promise

The keyword async before a function makes the function return a promise:

async async function f() {

`  `return 1;

}

f().then(alert); // 1

…We could explicitly return a promise, which would be the same:

async function f() {

`  `return Promise.resolve(1);

}

f().then(alert); // 1

**await** makes a function wait for a Promise

The keyword await before a function makes the function wait for a promise:

let value = await promise;

The await keyword can only be used inside an async function.

If we try to use await in a non-async function, there would be a syntax error:

Error Handling:

We can catch that error using try..catch, the same way as a regular throw:

async function f() {

`  `try {

`    `let response = await fetch('http://no-such-url');

`  `} catch(err) {

`    `alert(err); // TypeError: failed to fetch

`  `}

}

f();

If we don’t have try..catch, then the promise generated by the call of the async function f() becomes rejected. We can append .catch to handle it:






