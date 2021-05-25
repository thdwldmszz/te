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

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


function loadTodos() {
  let lastTasks = localStorage.getItem("todos");
  if (!lastTasks) return;

  todos = JSON.parse(lastTasks);
  todos.forEach(addToDay);
}

function addToDay(todo){
  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo-d";

  span.textContent = todo.task;
  div.appendChild(span);

  let mm = document.getElementsByClassName('YM');
  let dd = document.getElementsByClassName('date');
  let q=mm[0].textContent.slice(5,7);

  if(q>todo.month){
    while(1){
      q=mm[0].textContent.slice(5,7);

      if(q===todo.month){
        break;
      }
      lastDay();
    }
  }
  else if (q<todo.month){
    while(1){
        q=mm[0].textContent.slice(5,7);
  
        if(q===todo.month){
            break;
        }
        nextDay();
    }
  }
  let flag=0;
  if(todo.date>27){
      while(1){
        if(flag===1){
          break;
        }
          for(i=0;i<7;i++){
              if(dd[i].textContent===todo.date){
                flag=1;  
                break;
              }
          }
          if(flag===0)
            lastDay();
      }
  }
  else{
      while(1){
        if(flag===1){
          break;
        }
          for(i=0;i<7;i++){
              if(dd[i].textContent===todo.date){
                flag=1;
                break;
              }
          }
          if(flag===0)
            nextDay();
      }
  }
 
  let tm = document.getElementById("times");
  let sttime, entime;

  for(i=0;i<24;i++){
    let ta = tm.getElementsByTagName("tr")[i];
    if(todo.ST<10){
      if(ta.textContent.slice(0,1)===todo.ST){
        sttime=i;
        break;
      }
    }
    else if(todo.ST>=10){
      if(ta.textContent.slice(0,2)===todo.ST-12){
        sttime=i;
        break;
      }
    }
    else{
      if(ta.textContent.slice(0,2)===todo.ST){
        sttime=i;
        break;
      }
    } 
  }

  for(i=0;i<24;i++){
    let ta = tm.getElementsByTagName("tr")[i];
    if(todo.ET>23){
      entime=23;
    }
    if(todo.ET<10){
      if(ta.textContent.slice(0,1)===todo.ET){
        entime=i;
        break;
      }
    }
    else if(todo.ET>=10&&todo.ET<=23){
      if(ta.textContent.slice(0,2)===todo.ET){
        entime=i;
        break;
      }
    }
    else{
      if(ta.textContent.slice(0,2)===todo.ET){
        entime=i;
        break;
      }
    }
  }

  let tl = tm.getElementsByTagName("td");

  var color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
  for(i=sttime; i<=entime;i++){
    tl[i].style.backgroundColor = color;
  } 

  let checkbtn = document.createElement("button");
  checkbtn.className = "checkbtn btn-sm btn-danger";
  div.appendChild(checkbtn);

  checkbtn.addEventListener("click", () => {
    todos = todos.filter(t => t !== todo);
    saveTodos();
    div.remove();
  });

  tl[sttime].appendChild(div);
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
  //addToMonth(todo);
  //addToWeek(todo);
  addToDay(todo);

  element.value = '';
  mon.value = '';
  date.value = '';
  st.value = '';
  et.value = '';

  hideModal();
});