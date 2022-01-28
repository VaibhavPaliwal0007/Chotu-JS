import { evalutateExpression  } from "./logic.js";

window.addEventListener("load", bindEvents);

function bindEvents() {
    const calculate = document.querySelector(".btn.compute");
    const buttons = document.querySelectorAll(".btn");
    let toDisplay = document.querySelector('.display');

    const isACorCompute = (str) => {
        return str === "AC" || str === "=";
    };

    const validate = (str) => {
        if (str == "" || str == "+" || str == "-" || str == "*" || str == "/") {
            return false;
        }
        return true;
    };

    const addToDisplay = (event) => {
        if(!isACorCompute(event.target.value)){
            toDisplay.value += event.target.value;
        }

        if(event.target.value === 'AC'){
            toDisplay.value = '';
        }
    }

    const computeIt = () => {
        if(!validate(toDisplay.value)){
            return alert('Invalid Expression');
        }

        let ans = evalutateExpression(toDisplay.value);

        if(ans === NaN){
            return 'Invalid Expression';
        }

        if(typeof ans === String){
            alert(ans);
            toDisplay.value = '';
            return;
        }

        toDisplay.value = '';
        toDisplay.value = ans;
    }
    
    for(let button of buttons){
        button.addEventListener('click', addToDisplay);
    }
    calculate.addEventListener("click", computeIt);
};