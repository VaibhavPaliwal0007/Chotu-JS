window.addEventListener('load', bindClick); //when we are not using defer* keyword.

let counter = 0;

function bindClick() {
  const button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', likeCount);
};

function likeCount(){
    const span = document.getElementsByTagName('span')[0];

    span.innerHTML = `<i>${counter}</i>`;
    counter++;
}

bindClick();