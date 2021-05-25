
function loadTodos() {
    let lastTasks = localStorage.getItem("todos");
    if (!lastTasks) return;
  
    todos = JSON.parse(lastTasks);
    todos.forEach(addToMonth);
  }

function addToMonth(todo){

    let div = document.createElement("div");
  
    let span = document.createElement("span");
    span.className = "todo";
  
    span.textContent = todo.task+'('+todo.ST+":"+todo.ET+')';
    div.appendChild(span);
  
    let mm = document.getElementsByClassName('YM');
    let q=mm[0].textContent.slice(5,7);
  
    if(q>todo.month){
      while(1){
        q=mm[0].textContent.slice(5,7);
  
        if(q===todo.month){
          break;
        }
        lastMonth();
      }
    }
    else if (q<todo.month){
      while(1){
      q=mm[0].textContent.slice(5,7);
      
      if(q===todo.month){
        break;
      }
      nextMonth();
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

  
window.addEventListener("load", () => {
    loadTodos();
  });