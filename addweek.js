
function loadTodos() {
    let lastTasks = localStorage.getItem("todos");
    if (!lastTasks) return;
  
    todos = JSON.parse(lastTasks);
    todos.forEach(addToWeek);
  }
  
  function addToWeek(todo){
    
    let div = document.createElement("div");
  
    let span = document.createElement("span");
    span.className = "todo-w";
  
    span.textContent = todo.task;
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
        else if(x>z){
          if(todo.month===q &&todo.date>=x) {
            for(i=0;i<7;i++){
              if(dd[i].textContent===todo.date){
                z=i;
                flag=1;
                break;
              } 
            }
          }
          else{
            q=mm[0].textContent.slice(5,7);
            if(todo.month-1===parseInt(q)){
              for(i=0;i<7;i++){
                if(dd[i].textContent===todo.date){
                  z=i;
                  flag=1;
                  break;
                } 
              }
            }
            else
              lastWeek();
          }
        }
        else if(x<z){
          if(todo.date<x){
            lastWeek();
          }
          else{
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
  
    var color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    for(i=sttime; i<=entime;i+=7){
      tl[i].style.background = color;
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
