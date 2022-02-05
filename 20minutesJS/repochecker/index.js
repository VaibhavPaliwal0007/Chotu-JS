window.addEventListener('load', bindEvents);

function bindEvents(){
    document.querySelector('.btn').addEventListener('click', getData);

    const nullChecker = (value) => {
        if(value === null){
            return 'N/A';
        }
        return value;
    }

    async function getData(){
        try{
            let input = document.querySelector('input').value;

            if(input.length === 0){
                alert('Please enter a username');
                return;
            }
            
            const req = await fetch(`https://api.github.com/users/${input}/repos`);
            
            if(req.status === 404){
                alert('User not found');
                return;
            }

            const repos = document.querySelector('.repos');
            
            repos.innerHTML = ``;

            const dataObj = await req.json();
            
            for(const key in dataObj){
                let div = document.createElement('div');

                div.className = 'repo';
                
                dataObj[key].name = nullChecker(dataObj[key].name);
                dataObj[key].description = nullChecker(dataObj[key].description);
                dataObj[key].language = nullChecker(dataObj[key].language);
                dataObj[key].updated_at = nullChecker(dataObj[key].updated_at);
                dataObj[key].created_at = nullChecker(dataObj[key].created_at);
                dataObj[key].stargazers_count = nullChecker(dataObj[key].stargazers_count);
              

                div.innerHTML = `
                    <h3>Name: ${dataObj[key].name}</h3>
                    <p>description: ${dataObj[key].description}</p>
                    <p>language: ${dataObj[key].language}</p>
                    <p>stars: ${dataObj[key].stargazers_count}</p>
                    <p>createdAt: ${dataObj[key].created_at}</p>
                    <p>lastUpdated: ${dataObj[key].updated_at}</p>
                `;

                repos.appendChild(div);
            }
        }

        catch(err){
            console.log(err);
        }

    }
}

