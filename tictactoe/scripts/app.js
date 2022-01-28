window.addEventListener("load", bindEvents);

function bindEvents() {
    const buttons = document.querySelectorAll("button");
    let h1 = document.querySelector('#result');
    let flag = false;
    let count = 0;

    const resetGame = () => {
        buttons.forEach(button =>  button.innerText = '');
        flag = true;
        count = 0;
    };

    const isNotBlank = (button) => (button.innerText.length !== 0);
    const isSame = (first, second, third) => (first.innerText == second.innerText) && (first.innerText === third.innerText);

    const isGameOver = () => {
        return compareThree(buttons[0], buttons[1], buttons[2]) ||
        compareThree(buttons[0], buttons[1], buttons[2]) ||
        compareThree(buttons[3], buttons[4], buttons[5]) ||
        compareThree(buttons[6], buttons[7], buttons[8]) ||
        compareThree(buttons[0], buttons[3], buttons[6]) ||
        compareThree(buttons[1], buttons[4], buttons[7]) || 
        compareThree(buttons[2], buttons[5], buttons[8]) || 
        compareThree(buttons[0], buttons[4], buttons[8]) || 
        compareThree(buttons[2], buttons[4], buttons[6]); 
    };

    const compareThree = (first, second, third) => {
        if(isNotBlank(first) && isNotBlank(second) && isNotBlank(third)){
            if(isSame(first, second, third)){
                return true;
            }
        }

        return false;
    };

    const printXorZero = (event) => {
        if (event.target.innerText.length === 0) {
            event.target.innerText = flag === false ? "0" : "X";
            flag = !flag;
            count++;
        }

        if(count == 9){
            h1.innerText = 'Game Drawn';
            resetGame();
        }

        if(count >= 5 && isGameOver()){
            h1.innerText = 'Game Over';
            resetGame();
        }
    };

    for (let button of buttons) {
        button.addEventListener("click", printXorZero);
    }
}
