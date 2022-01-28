const percentageOperator = (currNum) => {
    if(currNum.toString().includes("%")){
        currNum = currNum.replace("%", "");
        currNum = (parseFloat(currNum) / 100);
    }

    currNum = parseFloat(currNum);
  
    return currNum;
};

const insertElementInStack = (currNum, numberStack, operator) => {
    currNum = percentageOperator(currNum);
    
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

const removeWhiteSpace = (str) => {
    return str.replace(/\s/g, '');
};

const isOperator = (c) => c === '+' || c === '-' || c === '*' || c === '/';
const isDigit = (c) => c >= '0' && c <= '9';

const compute = (numberStack) => {
    let ans = 0;

    for(let number of numberStack){
        ans += number;
    }

    return ans;
};

let idx = 0;

const calulate = (str) => {
    // str = removeWhiteSpace(str);
    let operator = '+';
    let numberStack = [];
    
    while(idx < str.length)
    {
        if(isOperator(str[idx])){
            operator = str[idx];
        }

        else if(str[idx] === '('){
            idx++;
            let currNum = calulate(str);
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

console.log(calulate("78%*65"));