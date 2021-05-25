// const loadM = require("./button-m");
// button-m
const $button = document.querySelector(".hi");

var $modalButton = document.getElementById("btn-modal");
var $modal = document.querySelector(".modal-container");
var $closeButton = document.querySelector(".closeButton");
var $addButton = document.querySelector(".addButton");

let modalShow = false;

function showModal() {
  $modal.style.zIndex = "1";
  $modal.style.opacity = "1";
  $modal.classList.toggle("show-modal-animation");
  modalShow = true;
}

function hideModal() {
  $modal.style.zIndex = "-1";
  $modal.style.opacity = "0";
  $modal.classList.toggle("show-modal-animation");
  modalShow = false;
}

$modalButton.addEventListener("click", function () {
  if (!modalShow) {
    showModal();
  } else {
    hideModal();
  }
});

document.addEventListener("click", function (e) {
  if (modalShow && e.target.id === "exampleModal") {
    hideModal();
  }
});

$closeButton.addEventListener("click", function () {
  const element = document.querySelector("#task-input");

  element.value = "";

  hideModal();
});

let todos = [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let lastTasks = localStorage.getItem("todos");
  if (!lastTasks) return;

  todos = JSON.parse(lastTasks);
  todos.forEach(addToMonth);
}

function addToMonth(todo) {
  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo";

  span.textContent = todo.task + "(" + todo.ST + ":" + todo.ET + ")";
  div.appendChild(span);

  let mm = document.getElementsByClassName("YM");
  let q = mm[0].textContent.slice(5, 7);

  /*
  if (q > todo.month) {
    while (1) {
      q = mm[0].textContent.slice(5, 7);

      if (q === todo.month) {
        break;
      }
      //lastMonth();
    }
  } else if (q < todo.month) {
    while (1) {
      q = mm[0].textContent.slice(5, 7);

      if (q === todo.month) {
        break;
      }
      //nextMonth();
    }
  }*/

  let y = document.getElementsByClassName("date");
  let z;
  if (todo.date > 24) {
    if (parseInt(y[0].textContent.slice(0, 2)) > 20) {
      for (i = 21; i < 35; i++) {
        if (y[i].textContent.slice(0, 2) === todo.date) {
          z = y[i];
          break;
        }
      }
    }
  } else {
    for (i = 0; i < 35; i++) {
      if (y[i].textContent.slice(0, 2) === todo.date) {
        z = y[i];
        break;
      }
    }
  }

  let checkbtn = document.createElement("button");
  checkbtn.className = "checkbtn btn-sm btn-danger";
  div.appendChild(checkbtn);

  checkbtn.addEventListener("click", () => {
    todos = todos.filter((t) => t !== todo);
    saveTodos();
    div.remove();
  });

  z.appendChild(div);
  saveTodos();
}

$addButton.addEventListener("click", function () {
  let element = document.querySelector("#task-input");
  let mon = document.querySelector("#month-input");
  let date = document.querySelector("#day-input");
  let st = document.querySelector("#start-time-input");
  let et = document.querySelector("#end-time-input");
  let year = document.querySelector("#year-input");

  let inputTask = element.value,
    inputMonth = mon.value,
    inputDate = date.value,
    startTime = st.value,
    endTime = et.value;
  inputYear = year.value;

  let todo = {
    task: inputTask,
    year: inputYear,
    month: inputMonth,
    date: inputDate,
    ST: startTime,
    ET: endTime,
  };

  todos.push(todo);
  saveTodos();

  element.value = "";
  mon.value = "";
  date.value = "";
  st.value = "";
  et.value = "";
  year.value = "";

  hideModal();

  addToMonth(todo);
});

// Display
let date = new Date();

const displayCal = function () {
  const year = date.getFullYear();
  const month = date.getMonth();

  document.querySelector(".YM").textContent = `${year} ${month + 1}`;

  const lastEnd = new Date(year, month, 0);
  const thisEnd = new Date(year, month + 1, 0);

  const LEDate = lastEnd.getDate();
  const LEDay = lastEnd.getDay();
  const TEDate = thisEnd.getDate();
  const TEDay = thisEnd.getDay();

  const lastDates = [];
  const thisDates = [];
  const nextDates = [];

  if (LEDay != 6) for (let i = LEDay; i >= 0; i--) lastDates.push(LEDate - i);
  for (let i = 1; i <= TEDate; i++) thisDates.push(i);
  for (let i = 1; i < 7 - TEDay; i++) nextDates.push(i);

  const dates = lastDates.concat(thisDates, nextDates);
  const lastIdx = lastDates.length - 1;
  const nextIdx = dates.length - nextDates.length;

  const today = new Date();
  if (year === today.getFullYear() && month === today.getMonth()) {
    dates.forEach((date, i) => {
      if (i <= lastIdx || i >= nextIdx)
        dates[
          i
        ] = `<div class = "date" ><span style = "opacity: .3" >${date}</span></div>`;
      else if (dates[i] === today.getDate())
        dates[
          i
        ] = `<div class = "date border border-primary rounded">${date}</div>`;
      else dates[i] = `<div class = "date">${date}</div>`;
    });
  } else {
    dates.forEach((date, i) => {
      if (i <= lastIdx || i >= nextIdx)
        dates[
          i
        ] = `<div class = "date" ><span style = "opacity: .3" >${date}</span></div>`;
      else dates[i] = `<div class = "date">${date}</div>`;
    });
  }
  document.querySelector(".dates").innerHTML = dates.join("");

  loadTodos();
};

displayCal();

const lastMonth = function () {
  date.setMonth(date.getMonth() - 1);
  displayCal();
};

const nextMonth = function () {
  date.setMonth(date.getMonth() + 1);
  displayCal();
};
