// converter for currency include decimals too

/*
function converter(num){
    let numStr = num.toString();

    let first = parseInt(numStr.split('.')[0]);
    let last = numStr.split('.')[1];

    last = !last ? '' : '.' + last;

    let ans = first.toLocaleString('en-IN') + last;

    return ans;
}

console.log(converter(10000.010));
*/

// make your own set interval function

/*
function mySetInervalPolyfill() {
    let intervalId = 1;
    let map = {};

    function mySetInterval(callback, ms, ...args) {
        const uniqueId = intervalId++;

        function repeatFn() {
            map[uniqueId] = setTimeout(() => {
                callback(...args);

                if (map[uniqueId]) {
                    repeatFn();
                }
            }, ms);
        }

        repeatFn(); //function ko call bi toh krna hai nah.
        return uniqueId;
    }

    function myClearInterval(uniqueId) {
        clearTimeout(map[uniqueId]);
        delete map[uniqueId];
    }

    return { mySetInterval, myClearInterval };
}

const { mySetInterval, myClearInterval } = mySetInervalPolyfill();

const uniqueId = mySetInterval(() => console.log(count++), 1000, (count = 0));

setTimeout(() => {
    myClearInterval(uniqueId);
}, 4000);
*/

// polyfill for promises.all

/*
function promisesAll(promiseArr){
    const arr = [];
    
    return new Promise(async (resolve, reject) => {
        for(let idx = 0; idx < promiseArr.length; idx++){
             try{
                 const result = await promiseArr[idx];
                 arr.push(result);
             }

             catch(e){
                 reject(e);
             }
        }

        resolve(arr);
    });
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 10, 'foo');
});

promisesAll([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});
*/

// create your own DOM

/*
function myDOM() {
    this.elements = [];

    function Node(tagName){
        this.tagName = tagName;
        this.chidren = [];
    }

    myDOM.prototype.createElement = (tagName) => {
        this.elements.push(new Node(tagName));
        return new Node(tagName);
    }

    myDOM.prototype.querySelector = (selector) => {
        if(selector.includes('#')){
            const id = selector.split('#')[1];
            return this.elements.find(element => element.id === id);
        }

        else if(selector.includes('.')){
            const className = selector.split('.')[1];
            return this.elements.find(element => element.className === className);
        }

        return this.elements.find(element => element.tagName === selector);
    }

    Node.prototype.appendChild = (child) => {
       if(!(child instanceof Node)){
            throw new Error('Child must be an instance of Node');
       }

        this.chidren.push(child);
    }

    Node.prototype.removeChild = (child) => {
        this.chidren = this.chidren.filter(element => element !== child);
    }

    Node.prototype.getElementById = (id) => {
        return this.chidren.find(element => element.id === id);
    }

    Node.prototype.getElementsByTagName = (tagName) => {
        return this.chidren.filter(element => element.tagName === tagName);
    }

    Node.prototype.innerHTML = (html) => {
        this.html = html;
    }
};
*/

// sum(10)(320)(40)()

/*
function sum(a){
    return function(b){
        if(b){
            return sum(a + b);
        }
        return a;
    };
};
*/

// debouncing and de throttling

/* 

key points -> it reduces api calls, prevents thread blocking so as to reduce re-rendering, less server load, better ui/ux experience. 
*/

/*
function callbackFn(){
    let count = 0;
    
    console.log(count++);
}

function debounceFn(callbackFn, delay){
    let timerId = 0;

    return (...args) => {    //event listener bi khud args deta hai 
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            callbackFn.apply(this, args);
        }, delay);
    }
}

function throttleFn(callbackFn, delay){
    let check = true;

    return (...args) => {
        if(check){
            callbackFn.apply(this, args);
            check = !check;

            setTimeout(() => {
                check = true;
            }, delay);
        }
    };
}

const debounce = debounceFn(callbackFn, 300);
const throttle = throttleFn(callbackFn, 400);

document.querySelector('debouncing').addEventListener('keyup', debounce);  //automatically pass hojaege
document.querySelector('throttling').addEventListener('keyup', throttle);
*/

//flatten this object into a single level object

/*
const data = {
    a: 'jack',
    b: {
        c: 'sparrow',
        d: {
           e: 'hahaha'
        }
    }
};

function flatten(data){
    const flattenedData = {};

    function flattenData(data, path = ''){
        for(let key in data){
            if(typeof data[key] === 'object'){
                flattenData(data[key], path + key + '.');
            } else {
                flattenedData[path + key] = data[key];
            }
        }
    }

    flattenData(data);

    return flattenedData;
}

console.log(flatten(data));
/*

console.log(calculator(10).add(15).sub(10).mult(4).divide(10).result());
*/

/*
Function.prototype.myBind = function(...args){
    const myThis = this;
    const parameters = args.slice(1);

    return function(...fnArgs) {
        return myThis.apply(args[0], [parameters], [fnArgs]);
    }
};

function printName(param1, param2){
    return firstName + ' ' + secondName + ' ' + param1 + ' ' + param2;
};

const person = { firstName: "Vaibhav", secondName: "Paliwal" };
const boundFn = printName.myBind(person, "Hello", "World");

console.log(boundFn());
*/

//polyfill of myMap

/*
Array.prototype.myMap = function (callback, referThis) {
    const arr = [];

    for(let idx = 0; idx < this.length; idx++){
        arr.push(callback.call(referThis, this[idx], idx, this));
    }

    return arr;
}
*/

// polyfill of reduce

/*
Array.prototype.myReduce = function(callback, initialValue){
    let accumulator = initialValue;
    let startIdx = accumulator ? 0 : 1;

    for(let i = startIdx; i < this.length; i++){
        if(!accumulator){
            accumulator = this[i];
        } else {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    return accumulator;
}
*/

//polyfill of group by

/*
function groupBy(array, callback){
    const result = {};

    array.forEach(element => {
        const key = callback(element);
        if(!result[key]){
            result[key] = [];
        }

        result[key].push(element);
    });

    return result;
}
*/

// make a pollyfill of forEach

/*
    Array.prototype.myForEach = function(callback, myThis){
        if(!myThis){
            myThis = this;
        }

        for(let idx = 0; idx < this.length; idx++){
            callback.call(myThis, this[idx], idx, this);
        }
    }
*/

let obj = {
    name: "Jack",
};

let myFunc = function (id, city) {
    console.log(`${this.name}, ${id}, ${city}`);
};

Function.prototype.myBind = function (newThis, ...args) {
    newThis._this = this;

    return () => {
        return newThis._this(...args);
    };
};
//obj ke andar hi my func bnadia
