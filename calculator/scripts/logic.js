const priorityOperator = (operand) => {
    if(operand === '/'){
        return 4;
    }

    else if(operand === '*'){
        return 3;
    }

    else if(operand === '+'){
        return 2;
    }

    else if(operand === '-'){
        return 1;
    }

    else{
        return 0 ;
    }
};

const percentageOperator = (firstOperand, secondOperand) => {
    if(firstOperand.toString().includes("%")){
        firstOperand = firstOperand.replace("%", "");
        firstOperand = (parseFloat(firstOperand) / 100) * secondOperand;
    }

    else if(secondOperand.toString().includes("%")){
        secondOperand = secondOperand.replace("%", "");
        secondOperand = (parseFloat(secondOperand) / 100) * firstOperand;
    }

    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);

    return { firstOperand, secondOperand };
};

const checkParanteheses = (str, idx) => {
    if(str[idx] === '('){
        let count = -1, i = idx

        while(i !== str.length && str[i] !== ')'){
            count++;
            i++;
        }
    
        str = str.substr(idx + 1, count);

        const ans = statementEvaluation(str);

        return ans;
    }

    else if(str[idx] === ')'){
        if(!str.includes('(')){
            return 'Invalid Expression. Missing opening parantheses';
        }
    }
};

const compute = (firstNumber, secondNumber, topOperator) => {
    const { firstOperand, secondOperand } = percentageOperator(firstNumber, secondNumber);
    
    if(topOperator === '+'){
        return firstOperand + secondOperand;
    }

    else if(topOperator === '-'){
        return firstOperand - secondOperand;
    }

    else if(topOperator === '*'){
        return firstOperand * secondOperand;
    }

    else if(topOperator === '/'){
        return firstOperand / secondOperand;
    }
};

const removeWhiteSpace = (str) => {
    return str.replace(/\s/g, '');
};

export const statementEvaluation = (str) => {
    const numberStack = [];
    const operatorStack = [];
    let check = false;
    let num = "";

    str = removeWhiteSpace(str);

    for(let idx = 0; idx < str.length; idx++){
       let char = str[idx];

       if(char === '+' || char === '-' || char === '/' || char === '*'){
           const topOperator = operatorStack[operatorStack.length - 1];

           numberStack.push(num);
           num = "";

           if(check){
               return 'Inner statement error';
           }
           
           if(topOperator === undefined && numberStack.length === 0){
               return 'Invalid Expression';
           }

           else if(priorityOperator(topOperator) <= priorityOperator(char)){
               operatorStack.push(char);
           }

           else{
               const firstOperand = numberStack.pop();
               const secondOperand = numberStack.pop();
               const result = compute(firstOperand, secondOperand, topOperator);

               numberStack.push(result);
               operatorStack.pop();
               operatorStack.push(char);
           }

           check = true;
       }

       else if(char === '(' || char === ')'){
            let ans  = checkParanteheses(str, idx);
            
            idx += (str.indexOf(')') - idx);
            numberStack.push(ans);
            check = false;
       }

       else {
           num += char;
           check = false;
       }
    }
    
    numberStack.push(num);

    while(numberStack.length !== 1 && operatorStack.length !== 0)
    {
        const topOperator = operatorStack.pop();
        const firstOperand = numberStack.pop();
        const secondOperand = numberStack.pop();
        const result = compute(secondOperand, firstOperand, topOperator);

        numberStack.push(result);
    }

    return numberStack[0];
};
