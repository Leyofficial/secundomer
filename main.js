const hours = document.querySelector(".hours span");
const minutes = document.querySelector(".minutes span");
const seconds = document.querySelector(".seconds span");
const btnStart = document.querySelector(".button-start");
const btnReset = document.querySelector(".button-reset");
const tableResults = document.querySelector(".lastresults");
const loader = document.querySelector(".loader");
const main = document.querySelector(".main-block");
const save = document.querySelector(".save");

let counterSeconds = 0;
let counterMinutes = 0;
let counterHours = 0;

hours.innerHTML = localStorage.getItem("hours") || "00";
minutes.innerHTML = localStorage.getItem("minutes") || "00";
seconds.innerHTML = localStorage.getItem("seconds") || "00";

document.addEventListener("DOMContentLoaded", () => {
  loader.innerHTML = `
    <div class = 'load'>
    <img class = 'loadimg' src="Load.gif" alt="Loading...">
    </div>`;
  main.style.cssText = "display: none";
});
window.addEventListener("load", () => {
  main.style.cssText = "display : block";
  loader.remove();
});
btnStart.addEventListener("click", () => {
  localStorage.setItem("hours", counterHours);
  localStorage.setItem("minutes", counterMinutes);
  localStorage.setItem("seconds", counterSeconds);

  if (btnStart.innerHTML === "Stop") {
    btnStart.innerHTML = "Start";
    btnStart.classList.remove("redd");
    clearInterval(intervalStart);
  } else {
    btnStart.innerHTML = "Stop";
    btnStart.classList.add("redd");

    intervalStart = setInterval(() => {
      counterSeconds++;
      seconds.innerHTML = counterSeconds;
      if (counterSeconds === 60) {
        counterSeconds = 0;
        counterMinutes += 1;
      }
      minutes.innerHTML = counterMinutes;

      if (counterMinutes === 60) {
        counterMinutes = 0;
        counterHours += 1;
      }
      hours.innerHTML = counterHours;
      if (btnStart.innerHTML === "Start") {
        counterSeconds = 0;
        counterMinutes = 0;
        counterHours = 0;
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
      }
    }, 1000);
  }
});
btnReset.addEventListener("click", () => {
  localStorage.clear();
  counterSeconds = 0;
  counterMinutes = 0;
  counterHours = 0;
  hours.innerHTML = "00";
  minutes.innerHTML = "00";
  seconds.innerHTML = 
});
let counterRound = 0;

save.addEventListener("click", () => {
    localStorage.setItem(
    `data`,
    (localStorage.getItem("hours") || "00") +
      "h " +
      (localStorage.getItem("minutes") || "00") +
      "m " +
      (localStorage.getItem("seconds") || "00") +
      "s"
  );
  localStorage.setItem('rounds' , counterRound+=1)
  tableResults.insertAdjacentHTML(
    "beforeend",
    `<tr>
    <th class = "rounds">${localStorage.getItem('rounds')}</th>
    <th>${localStorage.getItem("data")}
    </th>
    </tr>
    `
  );
  console.log(tableResults);
});

const loadSaveRounds = () => {
    const saveRounds = localStorage.getItem('rounds')
    if (saveRounds) {
        tableResults.innerHTML = saveRounds
    }
}
const saveTableData = () => {
  const tableData = tableResults.innerHTML;
  localStorage.setItem("tableData", tableData);
};

// Load the saved table data from localStorage
const loadTableData = () => {
  const tableData = localStorage.getItem("tableData");
  if (tableData) {
    tableResults.innerHTML = tableData;
  }
};

// Add the event listener to save the table data when the page is about to be unloaded
window.onbeforeunload = () => {
  saveTableData();
};

// Load the saved table data when the page is loaded
window.addEventListener("load", () => {
  loadTableData();
});
