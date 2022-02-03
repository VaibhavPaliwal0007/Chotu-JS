document.querySelector('.inputContainer').addEventListener('keyup',onKeyInput);
document.querySelector('.searchBtnContainer').addEventListener('click',searchBtnClick);

let state = {
    val : '',
    isLoading : false,
    isError: false,
}

function setState(key,value) {
    const newState = {
        ...state
    }

    newState[key] = value;

    state = newState;
}

function onKeyInput(event) {
    const val = event.target.value;

    setState('val',val);
}

async function searchBtnClick() {
    try {
    const { val } = state;

    setState('isLoading',true);
    const dataToFetch = await (await fetch(`https://api.github.com/users/${val}/repos`)).json();

    setState('isLoading',false);
    const repoContainer = document.querySelector('.repoContainer');

    let str = '';

    for(let repo of dataToFetch) {
        const name = repo?.name ?? '';
        const description = repo?.description ?? '';
        const stargazers_count = repo?.stargazers_count ?? 0;
        const language = repo?.language ?? '';
        const updated_at = repo?.updated_at ?? '';

        const oldDate = new Date(updated_at);

        const timeDifference1 = timeDifference(new Date(),oldDate);
        str+= `
        <div class="outerContainer">
        <h2>${name}</h2>
        <h4>${description}</h4>

       <div class="flex jcSpaceBetween width50">
        <div>Stars : ${stargazers_count}</div>
        <div>${language}</div>
        <div>${timeDifference1}</div>
       </div>
    </div>
        `
    }

    repoContainer.innerHTML = str;
    } catch(err) {
        console.error(err);

        setState('isError',true);
        setState('isLoading' , false);

        const repoContainer = document.querySelector('.repoContainer');

        repoContainer.innerHTML = `
            <h5 class="marginCheck center">
                Something went Wrong! Please try Again!
            </h5>
        `;
    }
}

function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}