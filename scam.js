// Function.prototype.myBind = function(...args){
//     const myThis = this;
//     const parameters = args.slice(1);

//     return function(...fnArgs) {
//         return myThis.apply(args[0], [parameters], [fnArgs]);
//     }
// };

// function printName(param1, param2){
//     return firstName + ' ' + secondName + ' ' + param1 + ' ' + param2;
// };

// const person = { firstName: "Vaibhav", secondName: "Paliwal" };
// const boundFn = printName.myBind(person, "Hello", "World");

// console.log(boundFn());

// const data = {
//     a: 'jack',
//     b: {
//         c: 'sparrow',
//         d: {
//            e: 'hahaha'
//         }
//     }
// };

//flatten this object into a single level object

// function flatten(data){
//     const flattenedData = {};

//     function flattenData(data, path = ''){
//         for(let key in data){
//             if(typeof data[key] === 'object'){
//                 flattenData(data[key], path + key + '.');
//             } else {
//                 flattenedData[path + key] = data[key];
//             }
//         }
//     }

//     flattenData(data);

//     return flattenedData;
// }

// console.log(flatten(data));

// function calculator(value = 0)
// {  
//     let val = value;

//     this.add = (b) =>{
//          val += b;
//          return this;  //object return krara hu me 
//     }

//     this.sub = (b) => {
//          val -= b;
//          return this;
//     }

//     this.mult = (b) => {
//          val *= b;
//          return this;
//     }

//     this.divide = (b) => {
//          val /= b;
//          return this;
//     }

//     this.result = () => {
//         return val; 
//     }

//     return this;
// }
// console.log(calculator(10).add(15).sub(10).mult(4).divide(10).result());

// function createSetIntervaluePolyfillTask(){
//     let intervalId = 1;
//     let mp = {};

//     function mySetInterval(callback, ms, ...args){
//         const uniqueId = intervalId++;

//         function repeatFn(){
//             mp[uniqueId] = setTimeout(() => {
//                 callback(...args);

//                 if(mp[uniqueId]){
//                     repeatFn();
//                 }
//             }, ms);
//         };

//         repeatFn();
//         return uniqueId;
//     };

//     function myClearInterval(uniqueId){
//         clearTimeout(mp[uniqueId]);
//         delete mp[uniqueId];
//     }

//     return { mySetInterval, myClearInterval };
// };

// const { mySetInterval, myClearInterval } = createSetIntervaluePolyfillTask();

// mySetInterval(() => console.log('hello world'), 1000);

// Object.prototype.myInstanceof = function(a, A){
//      if(typeof a == 'function'){
//          return 'Cannot obtain instance of a function';
//      }

//      let toCompare = Object.getPrototypeOf(a);

//      while(toCompare != null)
//      {
//          if(toCompare.constructor == A){
//              return true;
//          }

//          toCompare = Object.getPrototypeOf(toCompare);
//      }

//      return false;
// };

// const arr = [1, 2, 34];

// console.log(Object.myInstanceof(arr, String));

// function promisesAll(promisesArr){
//     let arr = [];

//     return new Promise(async (resolve, reject) => {
//         for(let idx = 0; idx < promisesArr.length; idx++){
//             try{
//                 const result = await promisesArr[idx];
//                 await arr.push(result);
//             }

//             catch(e){
//                 reject(e);
//             }
//         }
//         resolve(arr);
//     })
// };

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 10, 'foo');
// });

// promisesAll([promise1, promise2, promise3]).then((values) => {
//     console.log(values);
// });

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