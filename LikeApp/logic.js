const button = document.getElementsByTagName('button')[0];
let counter = 0;

function bindClick() {
  button.addEventListener('click', likeCount);
};

function likeCount(){
    const span = document.getElementsByTagName('span')[0];

    span.innerHTML = `<i>${counter}</i>`;
    counter++;
}

bindClick();