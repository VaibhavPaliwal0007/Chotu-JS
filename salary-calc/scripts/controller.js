import { allowances } from './model.js';

window.addEventListener("load", bindEvents);

function bindEvents() {
    document.getElementById("compute").addEventListener("click", computeIt);
}

function validate(basicSalary) {
    if (basicSalary === "") {
        alert("Please enter basic salary");
        return true;
    }

    else if (isNaN(basicSalary)) {
        alert("Please enter a valid number");
        return true;
    }

    return false;
}

function computeIt() {
    let basicSalary = document.querySelector("#basicsalary").value;
    let fieldset = document.querySelector("fieldset");

    if (validate(basicSalary)) {
        return;
    }

    allowances.basicSalary = parseInt(basicSalary);

    fieldset.innerHTML = "";

    for (const func in allowances) {
        //key
        if (typeof allowances[func] === "function") {
            let p = document.createElement("p");

            p.innerHTML =
                func +
                ":   " +
                `<span>&#8377 ${allowances[func]().toLocaleString(
                    "hi-IN"
                )}</span>`;

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
