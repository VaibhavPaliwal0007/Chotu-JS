import { statementEvaluation  } from "./logic";

window.addEventListener("load", bindEvents);

function bindEvents() {
    const calculate = document.querySelector(".btn.compute");
    const buttons = document.querySelector(".buttons");
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

        let ans = statementEvaluation(toDisplay.value);

        if(ans === NaN){
            return 'Invalid Expression';
        }

        toDisplay.value = '';
        toDisplay.value = ans;
    }
    
    for(let button of buttons){
        button.addEventListener('click', addToDisplay);
    }
    calculate.addEventListener("click", computeIt);
};