const $ = s => document.querySelector(s);
const list = $("#list");
const form = $("#form");
const input = $("#todo");
const clear = $("#clear");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");
render();

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  todos.push({ text, done:false, id:crypto.randomUUID() });
  input.value = "";
  save(); render();
});

list.addEventListener("click", e => {
  const li = e.target.closest("li"); if(!li) return;
  const id = li.dataset.id;
  if(e.target.dataset.act === "toggle"){
    const t = todos.find(x=>x.id===id); t.done = !t.done;
  } else if(e.target.dataset.act === "del"){
    todos = todos.filter(x=>x.id!==id);
  }
  save(); render();
});

clear.addEventListener("click", () => {
  todos = todos.filter(t=>!t.done); save(); render();
});

function render(){
  list.innerHTML = todos.map(t=>`
    <li data-id="${t.id}" class="${t.done?'done':''}">
      <span>${t.text}</span>
      <div>
        <span class="icon" data-act="toggle">${t.done?'↩︎':'✔︎'}</span>
        <span class="icon" data-act="del">🗑️</span>
      </div>
    </li>`).join("");
}
function save(){ localStorage.setItem("todos", JSON.stringify(todos)); }
