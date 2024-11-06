const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const clear = document.querySelector(".clear-all");

function validate(input) {
  if (input.value.length < 4) {
    alert("Please enter more than 4 characters");
    input.focus();
    return false;
  }

  return true;
}

function createCard(data) {
  return `<li>
      <h3>${data.task}</h3>
      <div class="btns">
      <button class="check"><i class="fa-solid fa-check"></i></button>
      <button data-id="${data.id}" class="remove"><i class="fa-solid fa-trash"></i></button>
      </div>
      </li>`;
}

function getDataLocalstorage() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}

button &&
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const isValid = validate(input);
    if (!isValid) {
      return;
    }

    let data = {
      task: input.value,
      id: Date.now(),
    };

    const card = createCard(data);
    let res = card + ul.innerHTML;
    ul.innerHTML = res;
    form.reset();
    let todos = getDataLocalstorage();
    todos.push(data);
    localStorage.setItem("todos", JSON.stringify(todos));
  });

document.addEventListener("DOMContentLoaded", () => {
  let todos = getDataLocalstorage();

  todos.forEach((todo) => {
    const card = createCard(todo);
    let res = card + ul.innerHTML;
    ul.innerHTML = res;
  });

  let removeTask = document.querySelectorAll(".remove");
  removeTask.length > 0 &&
    removeTask.forEach((value) => {
      value &&
        value.addEventListener("click", function () {
          let isDelete = confirm("Are you sure you want to delete the task ?");
          if (isDelete) {
            this.parentNode.parentNode.remove();
            let id = this.getAttribute("data-id");
            if (id) {
              todos = todos.filter((value) => {
                return value.id != id;
              });
              localStorage.setItem("todos", JSON.stringify(todos));
            }
          }
        });
    });
});

clear &&
  clear.addEventListener("click", function (event) {
    event.preventDefault();
    let isClear = confirm("Are you sure you want to delete all task ?");
    if (isClear) {
      ul.innerHTML = "";
      localStorage.removeItem("todos");
    }
  });
