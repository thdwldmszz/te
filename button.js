const $button = document.querySelector('.hi');

var $modalButton = document.getElementById('btn-modal');
var $modal = document.querySelector('.modal-container');
var $closeButton = document.querySelector('.closeButton');
var $addButton = document.querySelector('.addButton');

let modalShow = false;

function showModal() {
  $modal.style.zIndex = '1';
  $modal.style.opacity = '1';
  $modal.classList.toggle('show-modal-animation');
  modalShow = true;
}

function hideModal() {
  $modal.style.zIndex = '-1';
  $modal.style.opacity = '0';
  $modal.classList.toggle('show-modal-animation');
  modalShow = false;
}

$modalButton.addEventListener('click', function () {
  if (!modalShow) {
    showModal();
  } else {
    hideModal();
  }
});

document.addEventListener('click', function (e) {
  if (modalShow && e.target.id === 'exampleModal') {
    hideModal();
  }
});

$closeButton.addEventListener('click', function () {
  const element = document.querySelector('#task-input');

  element.value = '';

  hideModal();
});

let todos = [];

function loadTodos() {
  let lastTasks = localStorage.getItem("todos");
  if (!lastTasks) return;

  todos = JSON.parse(lastTasks);
  todos.forEach(addToMonth);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addToMonth(todo){
  let month = date.getMonth();

  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo";

  span.textContent = todo.task+'('+todo.ST+":"+todo.ET+')';
  div.appendChild(span);

  if(month>todo.month-1){
    while(month!=todo.month-1){
      lastMonth();
      if(month===todo.month-1){
        break;
      }
      month--;
    }
  }
  else if (month<todo.month-1){
    while(month!=todo.month-1){
      nextMonth();
      if(month===todo.month-1){
        break;
      }
      month++;
    }
  }

  let y = document.getElementsByClassName('date');
 // let z;
  for(i=0;i<31;i++){
    if(todo.date<10){
      if(y[i].textContent.slice(0,1)===todo.date){
        z=y[i];
        break;
      }
    }
    else{
      if(y[i].textContent.slice(0,2)===todo.date){
        z=y[i];
        break;
      }
    }
  }

  let checkbtn = document.createElement("button");
		checkbtn.className = "checkbtn btn-sm btn-danger";
		div.appendChild(checkbtn);

		checkbtn.addEventListener("click", () => {
		  todos = todos.filter(t => t !== todo);
			saveTodos();
			div.remove();
		});

  z.appendChild(div);
  saveTodos();
}

window.addEventListener("load", () => {
  loadTodos();
});

$addButton.addEventListener('click', function () {
  let element = document.querySelector('#task-input');
  let mon = document.querySelector('#month-input');
  let date = document.querySelector('#day-input');
  let st = document.querySelector('#start-time-input');
  let et = document.querySelector('#end-time-input');

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
  addToMonth(todo);
//addToWeek();

  element.value = '';
  mon.value = '';
  date.value = '';
  st.value = '';
  et.value = '';

  hideModal();
});
