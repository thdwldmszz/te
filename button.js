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
  //todos.forEach(addToMonth);
  todos.forEach(addToWeek);
}



function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addToMonth(todo){
  let date = new Date();
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
  let z;
  if(todo.date>24){
    if(parseInt(y[0].textContent.slice(0,2))>20){
      for(i=21;i<35;i++){
        if(y[i].textContent.slice(0,2)===todo.date){
          z=y[i];
          break;
        }
      }
    }
  }
  else{
    for(i=0;i<35;i++){
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

function addToWeek(todo){

  let div = document.createElement("div");

  let span = document.createElement("span");
  span.className = "todo-w";

  span.textContent = todo.task+'('+todo.ST+":"+todo.ET+')';
  div.appendChild(span);

  let dd = document.getElementsByClassName('date');
  let mm = document.getElementsByClassName('YM');
  let q=mm[0].textContent.slice(5,7);

  let x, z, j, flag=0;

  if(q>todo.month){
    while(1){
      q=mm[0].textContent.slice(5,7);
      if(q===todo.month){
        break;
      }
      lastWeek();
    }
  }
  else if (q<todo.month){
    while(1){
    q=mm[0].textContent.slice(5,7);
    if(q===todo.month){
      break;
    }
    nextWeek();
    }
  }
  if(q===todo.month){
    while(1){
      if(flag===1){
        break;
      }
      x=parseInt(dd[0].textContent);
      z=parseInt(dd[6].textContent);
      if(x<=todo.date && z>=todo.date){
        for(i=0;i<7;i++){
          if(dd[i].textContent===todo.date){
            z=i;
            flag=1;
            break;
          } 
        }
      }
      else if(x>todo.date){
        if(x>20){
          if(x>z){
            for(i=0;i<7;i++){
              if(dd[i].textContent===todo.date){
                z=i;
                flag=1;
                break;
              } 
            }
          }
        }
        lastWeek();
      }
      else if(x<todo.date){
        nextWeek();
      }
    }
  }
  
  let tm = document.getElementById("times");
  for(i=0;i<24;i++){
    let ta = tm.getElementsByTagName("tr")[i];
    if(todo.ST<10){
      if(ta.textContent.slice(0,1)===todo.ST){
        j=i;
        break;
      }
    }
    else if(todo.ST>=10){
      if(ta.textContent.slice(0,2)===todo.ST-12){
        j=i;
        break;
      }
    }
    else{
      if(ta.textContent.slice(0,2)===todo.ST){
        j=i;
        break;
      }
    } 
  }
  for(i=0;i<24;i++){
    let ta = tm.getElementsByTagName("tr")[i];
    if(todo.ET>23){
      k=23;
    }
    if(todo.ET<10){
      if(ta.textContent.slice(0,1)===todo.ET){
        k=i;
        break;
      }
    }
    else if(todo.ET>=10&&todo.ET<=23){
      if(ta.textContent.slice(0,2)===todo.ET){
        k=i;
        break;
      }
    }
    else{
      if(ta.textContent.slice(0,2)===todo.ET){
        k=i;
        break;
      }
    }
  }
  let sttime = 7*j+z;
  let entime = 7*k+z;
  let tl = tm.getElementsByTagName("td");

  for(i=sttime; i<=entime;i+=7){
    tl[i].style.backgroundColor = "rgb(168, 216, 223)";
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
  console.log(todos);
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
  addToWeek(todo);

  element.value = '';
  mon.value = '';
  date.value = '';
  st.value = '';
  et.value = '';

  hideModal();
});