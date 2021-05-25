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
  todos.forEach(addToDay);
}

function addToDay(todo) {
  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo-d";

  span.textContent = todo.task;
  div.appendChild(span);

  let YM = document.getElementsByClassName("YM");
  let yy = YM[0].textContent.slice(0, 4);
  if (yy !== todo.year) return false;
  let mm = YM[0].textContent.slice(5, 7);
  if (mm !== todo.month) return false;

  let dates = document.getElementsByClassName("date");
  for (let i = 0; i < 7; i++) {
    if (dates[i].textContent.length !== 0) {
      if (todo.date !== dates[i].textContent) return false;
    }
  }

  let tm = document.getElementById("times");
  let sttime, entime;

  for (let i = 0; i < 24; i++) {
    let ta = tm.getElementsByTagName("tr")[i];
    if (todo.ST < 10) {
      if (ta.textContent.slice(0, 1) === todo.ST) {
        sttime = i;
        break;
      }
    } else if (todo.ST >= 10) {
      if (ta.textContent.slice(0, 2) === todo.ST - 12) {
        sttime = i;
        break;
      }
    } else {
      if (ta.textContent.slice(0, 2) === todo.ST) {
        sttime = i;
        break;
      }
    }
  }

  for (let i = 0; i < 24; i++) {
    let ta = tm.getElementsByTagName("tr")[i];
    if (todo.ET > 23) {
      entime = 23;
    }
    if (todo.ET < 10) {
      if (ta.textContent.slice(0, 1) === todo.ET) {
        entime = i;
        break;
      }
    } else if (todo.ET >= 10 && todo.ET <= 23) {
      if (ta.textContent.slice(0, 2) === todo.ET) {
        entime = i;
        break;
      }
    } else {
      if (ta.textContent.slice(0, 2) === todo.ET) {
        entime = i;
        break;
      }
    }
  }

  let tl = tm.getElementsByTagName("td");

  var color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
  for (let i = sttime; i <= entime; i++) {
    tl[i].style.backgroundColor = color;
  }

  let checkbtn = document.createElement("button");
  checkbtn.className = "checkbtn btn-sm btn-danger";
  div.appendChild(checkbtn);

  checkbtn.addEventListener("click", () => {
    todos = todos.filter((t) => t !== todo);
    saveTodos();
    div.remove();
  });

  tl[sttime].appendChild(div);
  //saveTodos();
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

  loadTodos();
});

//Display
let d = new Date();

const displayTable = function () {
  let times = [];
  for (let i = 0; i < 24; i++) {
    times.push(
      `<tr><th scope = "row" style = "width: 100px; height: 50px">${i}:00</th>`
    );
    times.push(`<td></td>`);
    times.push(`</tr>`);
  }
  document.querySelector("#times").innerHTML = times.join("");
};

const displayDay = function () {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0~11
  const date = d.getDate(); // 1~31
  const day = d.getDay(); // 0~6
  let days = ["Su", "Mo", "Tu", "We", "Tu", "Fr", "Sa"];

  // appepen year & month
  document.querySelector(".YM").textContent = `${year} ${month + 1}`;

  // append day
  for (let i = 0; i < 7; i++) {
    if (i === day) days[i] = `<p class = "day">${days[i]}</p>`;
    else days[i] = `<p class = "day" style = "opacity: .3" >${days[i]}</p>`;
  }
  document.querySelector(".days").innerHTML = days.join("");

  // append date
  let dateHtml = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    if (i === day) {
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate()
      ) {
        dateHtml[
          i
        ] = `<div class = "date border border-primary rounded">${date}</div>`;
      } else {
        dateHtml[i] = `<div class = "date" >${date}</div>`;
      }
    } else {
      dateHtml[i] = `<div class = "date" ></div>`;
    }
  }
  document.querySelector(".dates").innerHTML = dateHtml.join("");

  displayTable();

  loadTodos();
};

displayDay();

const lastDay = function () {
  d.setDate(d.getDate() - 1);
  displayDay();
};
const nextDay = function () {
  d.setDate(d.getDate() + 1);
  displayDay();
};
