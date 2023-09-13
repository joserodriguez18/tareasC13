//EVENTO PARA CREAR UNA TAREA
const tareas = localStorage.getItem("tareasC")
  ? JSON.parse(localStorage.getItem("tareasC"))
  : [];
const inputTarea = document.querySelector("#tarea-texto");
inputTarea.addEventListener("keyup", (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector("#tarea-texto").value.length > 0
  ) {
    const item = document.querySelector("#tarea-texto");
    crearTarea();
  }
});

// FUNCIÓN PARA CREAR UNA TAREA
function crearTarea() {
  nombreTarea = document.querySelector("#tarea-texto").value;
  checkedTarea = true;
  prioridadTarea = "Alta";
  categoriaTarea = "Casa";
  let tarea = {
    nombreTarea,
    checkedTarea,
    prioridadTarea,
    categoriaTarea,
  };
  // if (localStorage.getItem("tareasC") === null) {
  //   tareas.push(tarea);
  //   localStorage.setItem("tareasC", JSON.stringify(tareas));
  //   alert("Primer registro");
  // } else {
    tareas.push(tarea);
    localStorage.setItem("tareasC", JSON.stringify(tareas));
    alert("Guardó correctamente");
  // }
  inputTarea.value = "";
  leer();
}

// FUNCIÓN PARA MOSTRAR DATOS EN LA GRILLA
function leer() {
  document.querySelector("#tabla-tareas").innerHTML = "";
  for (let i = 0; i < tareas.length; i++) {
    let nombreTarea = tareas[i].nombreTarea;
    document.querySelector("#tabla-tareas").innerHTML += `<tr>
    <td><textarea id="${nombreTarea}" disabled>${nombreTarea}</textarea></td>
    <td class="center"><input type="checkbox" class="toggle" id="checkbox_${i}" ${
      tareas[i].checkedTarea ? "checked" : ""
    }/></td>
    <td>
      <select id="priporidad">
        <option ${
          tareas[i].prioridadTarea === "Alta" ? "selected" : ""
        }>Alta</option> 
        <option ${
          tareas[i].prioridadTarea === "Media" ? "selected" : ""
        }>Media</option> 
        <option ${
          tareas[i].prioridadTarea === "Baja" ? "selected" : ""
        }>Baja</option> 
      </select>
    </td>
    <td>
      <select id="categoria">
        <option ${
          tareas[i].categoriaTarea === "Casa" ? "selected" : ""
        }>Casa</option> 
        <option ${
          tareas[i].categoriaTarea === "Trabajo" ? "selected" : ""
        }>Trabajo</option> 
        <option ${
          tareas[i].categoriaTarea === "Emprendimiento" ? "selected" : ""
        }>Emprendimiento</option> 
      </select>
    </td>
    <td><button onclick="editar('${nombreTarea}')" class="btn btn-success">Editar</button></td>
    <td><button onclick="eliminar('${nombreTarea}')" class="btn btn-danger">Eliminar</button></td>
    </tr>`;
  }
  tareasPend();
}

// LLAMADO A LA FUNCIÓN LEER

leer();

// FUNCIÓN PARA ELIMINAR LA TAREA

function eliminar(nombreTarea) {
  let eliminar = "¿Está seguro que desea elimnar la tarea?";
  if (confirm(eliminar) == true) {
    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].nombreTarea === nombreTarea) {
        tareas.splice(i, 1);
        alert("eliminó correctamente");
      }
    }
    localStorage.setItem("tareasC", JSON.stringify(tareas));
    leer();
  } else {
    alert("Tarea a salvo");
  }
}

// TODAS LAS TAREAS
function tareasPend() {
  let num = tareas.length;
  localStorage.setItem("tareasC", JSON.stringify(tareas));
  document.querySelector("#countPend").innerHTML = `Todos (${num})`;
}
tareasPend();