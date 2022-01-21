window.addEventListener("load", bindEvents);

function bindEvents() {
  document.getElementById("compute").addEventListener("click", computeIt);
}
function computeIt() {
  allowances.basicSalary = parseInt(document.getElementById("basicsalary").value);

  document.getElementById("hra").innerText = allowances.hra();
  document.getElementById("da").innerText = allowances.da();
  document.getElementById("ta").innerText = allowances.ta();
  document.getElementById("ma").innerText = allowances.ma();
  document.getElementById("pf").innerText = allowances.pf();
  document.getElementById("gs").innerText = allowances.gs();
  document.getElementById("ns").innerText = allowances.ns();
}
