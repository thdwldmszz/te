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
  todos.forEach(addToWeek);
}

function addToWeek(todo) {
  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo-w";

  span.textContent = todo.task;
  div.appendChild(span);

  let dd = document.getElementsByClassName("date");
  let mm = document.getElementsByClassName("YM");
  let q = mm[0].textContent.slice(5, 7);

  let x,
    z,
    j,
    flag = 0;

  /*
  if (q > todo.month) {
    while (1) {
      q = mm[0].textContent.slice(5, 7);

      if (q === todo.month) {
        break;
      }
      lastWeek();
    }
  } else if (q < todo.month) {
    while (1) {
      q = mm[0].textContent.slice(5, 7);

      if (q === todo.month) {
        break;
      }
      nextWeek();
    }
  }*/
  /*
  while (1) {
    if (flag === 1) {
      break;
    }
    x = parseInt(dd[0].textContent);
    z = parseInt(dd[6].textContent);
    if (x <= todo.date && z >= todo.date) {
      for (i = 0; i < 7; i++) {
        if (dd[i].textContent === todo.date) {
          z = i;
          flag = 1;
          break;
        }
      }
    } else if (x > z) {
      if (todo.month === q && todo.date >= x) {
        for (i = 0; i < 7; i++) {
          if (dd[i].textContent === todo.date) {
            z = i;
            flag = 1;
            break;
          }
        }
      } else {
        q = mm[0].textContent.slice(5, 7);
        if (todo.month - 1 === parseInt(q)) {
          for (i = 0; i < 7; i++) {
            if (dd[i].textContent === todo.date) {
              z = i;
              flag = 1;
              break;
            }
          }
        } else break; //lastWeek();
      }
    } else if (x < z) {
      if (todo.date < x) {
        break; //lastWeek();
      } else {
        break; //nextWeek();
      }
    }
  }
*/
  let tm = document.getElementById("times");
  for (i = 0; i < 24; i++) {
    let ta = tm.getElementsByTagName("tr")[i];
    if (todo.ST < 10) {
      if (ta.textContent.slice(0, 1) === todo.ST) {
        j = i;
        break;
      }
    } else if (todo.ST >= 10) {
      if (ta.textContent.slice(0, 2) === todo.ST - 12) {
        j = i;
        break;
      }
    } else {
      if (ta.textContent.slice(0, 2) === todo.ST) {
        j = i;
        break;
      }
    }
  }
  for (i = 0; i < 24; i++) {
    let ta = tm.getElementsByTagName("tr")[i];
    if (todo.ET > 23) {
      k = 23;
    }
    if (todo.ET < 10) {
      if (ta.textContent.slice(0, 1) === todo.ET) {
        k = i;
        break;
      }
    } else if (todo.ET >= 10 && todo.ET <= 23) {
      if (ta.textContent.slice(0, 2) === todo.ET) {
        k = i;
        break;
      }
    } else {
      if (ta.textContent.slice(0, 2) === todo.ET) {
        k = i;
        break;
      }
    }
  }
  let sttime = 7 * j + z;
  let entime = 7 * k + z;
  let tl = tm.getElementsByTagName("td");

  var color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
  for (i = sttime; i <= entime; i += 7) {
    tl[i].style.background = color;
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
  saveTodos();
}

$addButton.addEventListener("click", function () {
  let element = document.querySelector("#task-input");
  let mon = document.querySelector("#month-input");
  let date = document.querySelector("#day-input");
  let st = document.querySelector("#start-time-input");
  let et = document.querySelector("#end-time-input");

  let inputTask = element.value,
    inputMonth = mon.value,
    inputDate = date.value,
    startTime = st.value,
    endTime = et.value;

  let todo = {
    task: inputTask,
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
    for (let j = 0; j < 7; j++) times.push(`<td></td>`);
    times.push(`</tr>`);
  }
  document.querySelector("#times").innerHTML = times.join("");
};

const displayWeek = function () {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0~11
  const date = d.getDate(); // 1~31
  const day = d.getDay(); // 0~6

  document.querySelector(".YM").textContent = `${year} ${month + 1}`;

  const lastEnd = new Date(year, month, 0);
  const thisEnd = new Date(year, month + 1, 0);

  const LEDate = lastEnd.getDate();
  const TEDate = thisEnd.getDate();

  const lastDates = [];
  const thisDates = [];
  const nextDates = [];

  for (let i = date - day; i <= 0; i++) lastDates.push(LEDate + i);

  for (let i = day; i > 0; i--) if (date - i > 0) thisDates.push(date - i);
  thisDates.push(date);
  for (let i = 1; i <= 6 - day; i++)
    if (date + i <= TEDate) thisDates.push(date + i);

  let dates = lastDates.concat(thisDates);

  for (let i = 1; i <= 7 - dates.length; i++) nextDates.push(i);
  dates = dates.concat(nextDates);

  // Put into week.html
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

  displayTable();

  loadTodos();
};

displayWeek();

const lastWeek = function () {
  d.setDate(d.getDate() - 7);
  d.setDate(d.getDate() - d.getDay());
  displayWeek();
};
const nextWeek = function () {
  d.setDate(d.getDate() + 7);
  d.setDate(d.getDate() - d.getDay());
  displayWeek();
};
