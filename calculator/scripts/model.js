 export const evalutateExpression = (str) => {
    let idx = 0;

    const removeWhiteSpace = (str) => {
        return str.replace(/\s/g, '');
    };

    str = removeWhiteSpace(str);

    const percentageOperator = (currNum, numberStack) => {
        currNum = currNum.toString();
        
        if(currNum.includes("%")){
            currNum = currNum.replace("%", "");
            currNum = (parseFloat(currNum) / 100) * parseFloat(numberStack.length === 0 ? 1 : numberStack[numberStack.length - 1]);
        }
    
        currNum = parseFloat(currNum);
      
        return currNum;
    };
    
    const insertElementInStack = (currNum, numberStack, operator) => {
        currNum = percentageOperator(currNum, numberStack);
        
        if(operator === '-'){
            currNum *= -1;
        }
    
        else if(operator === '*'){
            currNum *= numberStack.pop();
        }
    
        else if(operator === '/'){
           currNum = numberStack.pop() / currNum;
        }
    
        numberStack.push(currNum);
    };
    
    const isOperator = (c) => c === '+' || c === '-' || c === '*' || c === '/';
    const isDigit = (c) => (c >= '0' && c <= '9') || c === '.' || c === '%';
    
    const compute = (numberStack) => {
        let ans = 0;
    
        for(let number of numberStack){
            ans += number;
        }
    
        return ans;
    };
    
    const calculate = () => {
        let operator = '+';
        let numberStack = [];
        
        while(idx < str.length)
        {
            if(isOperator(str[idx])){
                operator = str[idx];
            }
    
            else if(str[idx] === '('){
                idx++;
                let currNum = calculate(str);
                insertElementInStack(currNum, numberStack, operator);
            }
    
            else if(str[idx] === ')'){
                break;
            }
    
            else{
                let currNum1 = "";
    
                while(idx < str.length && isDigit(str[idx])){
                    currNum1 += str[idx];
                    idx++;
                }
    
                idx--;
                insertElementInStack(currNum1, numberStack, operator);
            }
    
            idx++;
        }
    
        return compute(numberStack);
    };

    return calculate();
};

console.log(evalutateExpression('50 + 65%'));