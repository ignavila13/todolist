
window.onload = getElementFromLocalStorage();

var arrayTask = [];
var id = 0;
function addTask(){
    
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var checkbox = "<input type='checkbox' id='chkTask id"+id+"' onclick='editTask(this)'>";
    var btnClipboard = "<button type='button' id='btnClipboard' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
    var btnShare = "<button type='button' id='btnShare' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
    var btnDelete = "<button type='button' id='btnDelete id"+id+"' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
    var taskWrited = document.getElementById("writeTask").value;
    var spanTask = "<span id='spanTask' value='"+taskWrited+"'>"+taskWrited+"</span>";
    li.innerHTML = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
    innerTask = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
    //li.innerHTML = checkbox + spanTask + btnClipboard + btnShare + btnDelete;
    //innerTask = checkbox + spanTask + btnClipboard + btnShare + btnDelete;
    ul.appendChild(li);

    var task = new captureTask("id"+id, innerTask, taskWrited, "false", "geolocation");

    console.log(task);
    arrayTask.push(task);

    window['localStorage'].setItem('Tarea', JSON.stringify(arrayTask));
    id++;
    //console.log(arrayTask);
}


function addModifyTask(stateOfChek, idOfChk){
  var taskFromLS = JSON.parse(window['localStorage'].getItem('Tarea'));

  taskFromLS.forEach(element => {
    if(element.idTask = idOfChk){
      var ul = document.getElementById("list");
      var li = document.createElement("li");
      if(stateOfChek = "True"){
        var checkbox = "<input type='checkbox' id='chkTask "+idOfChk+"' onclick='editTask(this) checked'>";
      } else{
        var checkbox = "<input type='checkbox' id='chkTask id"+idOfChk+"' onclick='editTask(this)'>";
      } 
      var btnClipboard = "<button type='button' id='btnClipboard' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
      var btnShare = "<button type='button' id='btnShare' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
      var btnDelete = "<button type='button' id='btnDelete id"+idOfChk+"' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
      var taskWrited = element.valueTask;
      var spanTask = "<span id='spanTask' value='"+taskWrited+"'>"+taskWrited+"</span>";
      li.innerHTML = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
      innerTask = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
      //li.innerHTML = checkbox + spanTask + btnClipboard + btnShare + btnDelete;
      //innerTask = checkbox + spanTask + btnClipboard + btnShare + btnDelete;
      ul.appendChild(li);
  
      var task = new captureTask(""+idOfChk, innerTask, taskWrited, "false", "geolocation");
      addTaskFromLocalStorage(task)


      /*
      console.log(task);
      arrayTask.push(task);
  
      window['localStorage'].setItem('Tarea', JSON.stringify(arrayTask));
      */
    }
  });

}

function editTask(checkTask){
  var taskFromLS = JSON.parse(window['localStorage'].getItem('Tarea'));
  console.log("el id es: "+checkTask.id);
  //isChkChecked(checkTask);
  taskFromLS.forEach(element => {
    if(element.idTask = checkTask.id){
      element.estado = checkTask.checked;
      checkTask.checked = element.estado;
      addTaskFromLocalStorage(checkTask.id)
      //addModifyTask(checkTask.checked, checkTask.id);
    }
  });
  localStorage.setItem('Tarea', JSON.stringify(taskFromLS));
  
  
}

function addTaskFromLocalStorage(taskRetrived){

  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.innerHTML = taskRetrived; 
  ul.appendChild(li);
  //recorro el li y cambio el estado de los checkbox
}

function addTaskEditedFromLocalStorage(idCheck){


  var taskFromLS = JSON.parse(window['localStorage'].getItem('Tarea'));
  console.log("el id es: "+checkTask.id);
  //isChkChecked(checkTask);
  taskFromLS.forEach(element => {
    if(element.idTask = checkTask.id){
      element.estado = checkTask.checked;
      checkTask.checked = element.estado;
      addTaskFromLocalStorage(checkTask.id)
      //addModifyTask(checkTask.checked, checkTask.id);
    }
  });
  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.innerHTML = taskRetrived; 
  ul.appendChild(li);
  //recorro el li y cambio el estado de los checkbox
}

function captureTask(idTask, task, strTask, state, geolocation){
    this.idTask = idTask;
    this.tarea = task;
    this.valueTask = strTask
    this.estado = state;
    this.geolocalizacion = geolocation;
}


function getElementFromLocalStorage(){

  if(window['localStorage'].getItem('Tarea') !== undefined && window['localStorage'].getItem('Tarea')){

      console.log("Hay elementos en LocalStorage");
      var taskFromLS = JSON.parse(window['localStorage'].getItem('Tarea'));

      taskFromLS.forEach(element => {
        console.log("tarea: "+element.tarea);
        addTaskFromLocalStorage(element.tarea);
      });

  } else{
    console.log("No hay elementos en LocalStorage");
  }

}



function deleteTask(getTask){
    getTask.closest("li").remove();
}

function copyTask(element){
    var taskCopied = $(element).closest("li").find("#spanTask").text();
    navigator.clipboard.writeText(taskCopied);
    alert("Tarea '"+taskCopied+"' copiada con exito!");
}

function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("imgFullscreen").src="icons/fullscreen-exit.svg";
        
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("imgFullscreen").src="icons/fullscreen.svg";
        

      }
    }
  }

  function shareTask(element) {
    if (!("share" in navigator)) {
      alert('Web Share API not supported.');
      return;
    }

    var miTask = $(element).closest("li").find("#spanTask").text();
  
    navigator.share({
        title: 'Compartiendo mi tarea!',
        text: miTask
      })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error));
  }



  




