const base_url = "http://127.0.0.1:8000";

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

//get item from local storage
Get();


LIST = [];
id = 0;
// console.log(LIST)
//   load list
function loadList(array) {
  array.forEach(function (item) {
    addToDO(item.name, item.id, item.done, item.trash);
  });
}

//clear the storage
clear.addEventListener("click", function () {
  Clear();
  location.reload();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDO(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}" >${toDo}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>

    `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDO(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      Save(LIST);
      id++;
    }
    input.value = "";
  }
});

//COMPLETE TO DO
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//REMOVE TO DO
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  console.log(LIST)
  Save(LIST);
});

function Save(list) {
  let data = JSON.stringify(list);

  let request = new XMLHttpRequest();
  let url = base_url + "/save";
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(data);
}

function Get() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.response);
      LIST = myObj;
      loadList(LIST);
      return myObj;
    }
  };
  xmlhttp.open("GET", base_url + "/data", true);
  xmlhttp.send();
}

function Clear() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", base_url + "/clear", true);
  xmlhttp.send();
}
