window.addEventListener("load", bindEvents);

function bindEvents() {
    const submitButton = document.querySelector("#submit");
    const buttons = document.querySelectorAll(".square");
    const players = document.querySelectorAll('p');
    let check = false;
    let count = 0;
    let credentials = [];
    let winner = '';
    
    const validate = (name) => {
        if (name) return true;
        return false;
    };

    const collectCredentials = () => {
        const name1 = document.querySelector("#name1").value;
        const name2 = document.querySelector("#name2").value;

        if (!validate(name1) || !validate(name2)) {
            alert("Please enter your and your friend name");
            return;
        }

        return [ name1, name2 ];
    };

    const gameReset = () => {
        for(let idx = 0; idx < buttons.length; idx++){
            buttons[idx].innerText = '';
            check = true;
            count = 0; 
        }
    }

    const isNotBlank = (button) => button.innerText.length !== 0;

    const isSame = (first, second, third) => {
        return (first.innerText === second.innerText) && (second.innerText === third.innerText);
    };

    const compare = (first, second, third) => {
        if (isNotBlank(first) && isNotBlank(second) && isNotBlank(third)) {
            if (isSame(first, second, third)) {
                if(first == '0'){
                   winner = credentials[0];
                   loser = credentials[1];
                }

                else{
                    winner = credentials[1];
                    loser = credentials[0]
                }
                
                return true;
            }
        }

        return false;
    };

    const isOver = () => {
        return (
            compare(buttons[0], buttons[1], buttons[2]) ||
            compare(buttons[3], buttons[4], buttons[5]) ||
            compare(buttons[6], buttons[7], buttons[8]) ||
            compare(buttons[0], buttons[3], buttons[6]) ||
            compare(buttons[1], buttons[4], buttons[7]) ||
            compare(buttons[0], buttons[4], buttons[8]) ||
            compare(buttons[2], buttons[4], buttons[6])
        );
    };

    const output = (e) => {
        if (e.target.innerText.length === 0) {
            if (check === false) {
                e.target.innerText = "0";
            } else {
                e.target.innerText = "X";
            }

            check = !check;
            count++;

            if(check){
                players[0].style.color = 'red';
                players[1].style.color = 'black';
            }
            else{
                players[1].style.color = 'red';
                players[0].style.color = 'black';
            }
        }

        if (count === 9) {
            alert('Game is Drawn');
            gameReset();
            return;
        }

        if (count >= 5 && isOver()) {
            // alert(`${winner} wins, ${loser} gandMara`)
            document.querySelector('.modal').style.display = 'block';
            document.querySelector('.winner').innerText = `${winner} wins, ${loser} gandMara`;
            gameReset();
            return;
        }
    };

    const formSubmit = () => {
        credentials = collectCredentials();

        players[0].innerText = credentials[0];
        players[1].innerText = credentials[1];

        document.querySelector(".form").style.display = "none";
        document.querySelector('.heading.scam').style.display = "none";

        const squares = document.querySelectorAll(".square");

        for(let square of squares){
            square.style.display = 'block';
        }
        document.querySelector('.game').style.display = 'flex';
       
        for (let button of buttons) {
            button.addEventListener("click", output);
        }
    };

    submitButton.addEventListener("click", formSubmit);
}
