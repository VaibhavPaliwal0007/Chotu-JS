import { statementEvaluation } from "./logic.js";

window.addEventListener("load", bindEvents);

function bindEvents() {
    const calculate = document.querySelector('.btn.compute');
    scam();
    calculate.addEventListener('click', computeIt);
}

function validate(str){
    if(str == '' || str == '+' || str == '-' || str == '*' || str == '/'){
        return false;
    }

    return true;
}

function isNumber(str){
    return !isNaN(str) || str === '.';
}

function scam(){  
    let input = document.querySelector('.display');
    let buttons = document.querySelectorAll('.btn');

    for(let button of buttons){
        button.addEventListener('click', () => {
            if(isNumber(button.value)){
                input.value += button.value;
                console.log(button.value);
            }
           
        });
    }
}

function computeIt () {
    let input= document.querySelector('.display');

    if(!validate(input.value)){
        return alert('Invalid Expression');
    }

    let ans = statementEvaluation(input.value);

    if(ans === NaN){
        return 'Invalid Expression';
    }

    input.value = '';
    input.value = ans;
};