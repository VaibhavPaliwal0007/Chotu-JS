// function createSetIntervaluePolyfillTask() {
//     let intervalueIdIncre = 0;
//     const intervalueIdMap = {};

//     function polyfilledSetIntervalue(callback, delay,...args) {
//         const uniqueId = intervalueIdIncre++;

//         function repeatThisFn() {
//             intervalueIdMap[uniqueId] = setTimeoutfunction((){
//                 callback(...args);

//                 if(intervalueIdMap[uniqueId]) {
//                     repeatThisFn();
//                 }
//             },delay);
//         }

//         repeatThisFn();

//         return uniqueId;
//     }

//     function polyfilledClearIntervalue(uniqueId) {
//         clearTimeout(intervalueIdMap[uniqueId]);

//         delete intervalueIdMap[uniqueId];
//     }

//     return {
//         polyfilledSetIntervalue,
//         polyfilledClearIntervalue
//     }
// }

// const { polyfilledSetIntervalue, polyfilledClearIntervalue } = createSetIntervaluePolyfillTask();

// let counter = 0;

// const uniqueId = polyfilledSetIntervaluefunction((){
//     console.log("Hello World");

//     counter++;

//     if(counter > 4) {
//         polyfilledClearIntervalue(uniqueId);
//     }
// },1000);

// Function.prototype.myBind = function(...args){
//     const myThis = this;
//     const parameters = args.slice(1);

//     return function(...fnArgs) {
//         return myapply(args[0], [parameters], [fnArgs]);
//     }
// };

// function printName(param1, param2){
//     return firstName + ' ' + secondName + ' ' + param1 + ' ' + param2;
// };

// const person = { firstName: "Vaibhav", secondName: "Paliwal" };
// const boundFn = printName.myBind(person, "Hello", "World");

// console.log(boundFn());

const data = {
    a: 'jack',
    b: {
        c: 'sparrow',
        d: {
           e: 'hahaha'
        }
    }
};

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

 

function calculator(value = 0)
{  
    val = value;

    this.add = (b) =>{
         val += b;
         return this;
    }

    this.sub = (b) => {
         val -= b;
         return this;
    }

    this.mult = (b) => {
         val *= b;
         return this;
    }

    this.divide = (b) => {
         val /= b;
         return this;
    }

    this.val = () => {
        return val;
    }
}
calculator(10).add(15).sub(10).mult(4).divide(10).val();



