window.addEventListener("load", bindEvents);

function bindEvents() {
  document.getElementById("compute").addEventListener("click", computeIt);
}
function computeIt() {
  allowances.basicSalary = parseInt(document.getElementById("basicsalary").value);
  let fieldset = document.querySelector('fieldset');

  fieldset.innerHTML = "";

  for(const func in allowances){   //key
     if(typeof allowances[func] === 'function'){
        let p = document.createElement('p');

        p.innerHTML = func + ':   ' + `<span>&#8377 ${allowances[func]().toLocaleString('hi-IN')}</span>`;

        fieldset.appendChild(p);
     }
  }

  // document.getElementById("hra").innerText = allowances.hra();
  // document.getElementById("da").innerText = allowances.da();
  // document.getElementById("ta").innerText = allowances.ta();
  // document.getElementById("ma").innerText = allowances.ma();
  // document.getElementById("pf").innerText = allowances.pf();
  // document.getElementById("gs").innerText = allowances.gs();
  // document.getElementById("ns").innerText = allowances.ns();
}
