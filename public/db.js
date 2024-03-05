//var url = 'http://192.168.213.199:3000/books'
var url ='http://localhost:3000/books'
fetch('http://localhost:3000/books',{
    mode: "cors"}) 

.then(function(res){
  return res.json();
})

.then(function(data){

let html= '';
data.forEach(function(data){

 html +=`
 <table>
          
          <tr>
            <td><img src=${data.img}  width="50px" id= "img"></td>
            <td>${data.name}</td>
            <td>${data.author}</td>
            <td class="noSearch">${data.year}</td>
            <td class="noSearch"> <a href="#" id="${data.id}" class="btn red cum" onclick="ponerput() " ><i class="icofont-edit cum" id="${data.id}" ></i></a></td>
            <td class="noSearch"> <a href="#" id="${data.id}" class="btn num" onclick="verid()"><i class="icofont-trash num" id="${data.id}" ></i></a></td>
            </tr>
        
`;
})
data.forEach(function(datar){
const array= {number: datar.name}
//localStorage.setItem(JSON.stringify("cantidadtotal",array))
//const numerito= Object.keys(array).length
//console.log(array, Object.keys(array).length)
})

document.getElementById('mostrar').innerHTML= html


})



function enviar(){
 
const name1 = document.getElementById('name')
const author = document.getElementById('author')
const year = document.getElementById('year')
if(name1.value == "" ||  author.value == "" || year.value == ""){    
  alert('Debes rellenar todos los campos requeridos')
  
 }
 else{ 
  
  let datos = {name:name1.value, author:author.value, year:year.value}
fetch('/books',{
    method:"POST",
    mode: "cors",
    headers:{
        "Content-Type": "application/json"},
        body: JSON.stringify(datos)}
    ) 

.then(function(res){
  return res.json();
})

.then(function(data){
}) 
smserver2()

} 
}


function smserver2(){
  Swal.fire({
   title:'Libro inscrito con éxito',
   icon: 'success',
   showConfirmButton: false,
   timer: 2000,    
 })
document.getElementById("form").reset()
}

//mensaje de enviado
function smserver(){
   Swal.fire({
    title:'Libro inscrito con éxito',
    icon: 'success',
    html:'<h5><a href="#" class="btn green" onclick="location.reload()">OK</span></h5>',
    showConfirmButton: false,
    allowOutsideClick: false,    
  })}
//mensaje de borrado
function smborrado(){
  Swal.fire({
   title:'Libro borrado con éxito',
   icon: 'success',
   html:'<h5><a href="#" class="btn green" onclick="location.reload()">OK</span></h5>',
   showConfirmButton: false,
   allowOutsideClick: false
   
 })

}

//borrado de datos de la apinode

function borrar(){
  verid()
 const url = localStorage.getItem("lidatos")
 console.log(url)
  fetch(url,{
       method:"DELETE",
      mode: "cors"}) 
//location.reload()
    }

//eeditado

 function verid(){
        document.querySelectorAll(".num").forEach(el =>{
          el.addEventListener("click", e =>{
              const id =e.target.getAttribute("id")
              const url = "http://localhost:3000/books/"
             var servi= url+id
              console.log(servi)
              localStorage.setItem("lidatos", url+id)
              verborrar()
              //borrar()
              //smborrado()
             
          })})}
//editar
function edit(){
  document.querySelectorAll(".num").forEach(el =>{
    el.addEventListener("click", e =>{
        const id =e.target.getAttribute("id")
        const url = "http://localhost:3000/books"
       var servi= url+id
        console.log(servi)
        localStorage.setItem("editardatos", url+id)
        
    })})}
//editado


 //ver con detalles
function put(){
  let urlDi = localStorage.getItem("editardatos")
  let nuevoname = document.getElementById("nuevoname").value
  let nuevolibro = document.getElementById("nuevolibro").value
  let nuevoyear = document.getElementById("nuevoyear").value
const requestOptions = {
    method: 'PUT',
    headers: { 
        'Content-Type': 'application/json',
        'Mode': 'cors'       
    },
    body: JSON.stringify({ name: nuevolibro, author:nuevoname, year:nuevoyear })
};
fetch(urlDi, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


// para decidir si borrar o no
function verborrar(){
  Swal.fire({
    title: "¿Deseas eliminar este registro?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Sí",
    denyButtonText: `No`
  }).then((result) => {
 
    if (result.isConfirmed) {
   borrar()
   Swal.fire({
    icon:'success',
    html:'<h5><a href="#" class="btn green" onclick="location.reload()">Actualizar</span></h5>',
    title:'Borrado con éxito',
    showConfirmButton: false,
    allowOutsideClick: false
    });
    } else if (result.isDenied) {
      Swal.fire("No se eliminó el registro","", "warning");
      
    }
  });
}
//limpiar formulario
function limpiar(){
document.getElementById('form').reset()
document.getElementById('name').focus()

}


//esta parte pone la info en el localstorage
function ponerput(){
  document.querySelectorAll(".cum").forEach(el =>{
    el.addEventListener("click", e =>{
        const idPUT =e.target.getAttribute("id")
        const urlPUT = "http://localhost:3000/books/"
       var serviPUT= urlPUT+idPUT
        console.log(serviPUT)
       localStorage.setItem("datosput", urlPUT+idPUT)
       GETparaPUT()
       mostrarPUT()
       
    })})
}



// Obtener el formulario por su id
function GETparaPUT(){
  const dirc= localStorage.getItem("datosput")
fetch(dirc,{
    mode: "cors"}) 

.then(function(res){
  return res.json();
})
.then(function(data){
  const nameH= document.getElementById("nameH")
const authorH= document.getElementById("authorH")
const yearH= document.getElementById("yearH")
nameH.innerHTML= data.name
authorH.innerHTML= data.author
yearH.innerHTML= data.year
//console.log(nameH,authorH, yearH)
})
}

//este funciona es para mandar los dato put al server
//PUTNUEVO
function putnuevo(){
  //GETparaPUT()
  // La dirección única de la API de Express
const apiURL= localStorage.getItem("datosput")
const namen= document.getElementById("namen").value
const authorn= document.getElementById("authorn").value
const yearn= document.getElementById("yearn").value
// El cuerpo de la petición con los datos a actualizar
const body = JSON.stringify( 
  {
    "name": namen,
    "author":authorn,
    "year": yearn
})
console.log(body)
// Usar el método fetch con el método PUT y el cuerpo
fetch(apiURL, {
  method: "PUT",
  body: body,
  headers: {
    "Content-Type": "application/json",
    "Mode": "cors"
  },
})
exitoPUT()
}
function exitoPUT(){
     Swal.fire({
     title:'Registro actualizado con éxito',
     icon: 'success',
     html: '<h5><a href="#" class="btn green" onclick="location.reload()">Actualizar</span></h5>',
     showConfirmButton: false,
     allowOutsideClick: false,
     //timer: 2000
   })}
function mostrarPUT(){
  Swal.fire({
    title:'Datos a editar',
    html:'<form id="formnuevo" ><label for="name">Libro</label><p id="nameH">Datos anteriores</p><input type="text" id="namen" name="name" placeholder="dato nuevo" required><label for="author">Autor</label><p id="authorH">Datos anteriores</p><input type="text" id="authorn" name="author"  required> <label for="year">Año</label><p id="yearH">Datos anteriores</p><input type="date" id="yearn" name="year"  required></button><input id="btn1" type="button" onclick="putnuevo()" value="Guardar"></form>',
    showConfirmButton: false,
    allowOutsideClick: true,
   
 
  })
 
}

//contando los registros
async function contarElementos() {
  // Usamos fetch para obtener el array desde la URL
  try {
    const response = await fetch('http://localhost:3000/books');
    const array = await response.json();
    var totalregistros= array.length
      //let miArraySinRepetidos = quitarRepetidos(array)
    //console.log (miArraySinRepetidos, miArraySinRepetidos.length)
   // console.log (array.length);
  } catch (error) {
    return console.error(error);
  }
  document.getElementById("totalregistros").innerHTML= totalregistros
}



function quitarRepetidos(array) {
  // Creamos un objeto vacío para almacenar los elementos únicos
  let unicos = {};
  // Recorremos el array con un bucle for
  for (let i = 0; i < array.length; i++) {
    // Si el elemento actual no está en el objeto, lo añadimos con el valor true
    if (!unicos[array[i]]) {
      unicos[array[i]] = true;
    }
  }
  // Devolvemos un array con las claves del objeto, que son los elementos únicos
  return Object.keys(unicos);
}


function mostrarOcultarDiv() {
  var div =  document.getElementById("buscardiv")
  var textodiv =  document.getElementById("tbus")
  if (div.style.display == "none") {
    div.style.display = "flex";
    textodiv.innerHTML= "Cerrar"
  } else {
    div.style.display = "none";
    textodiv.innerHTML= "Buscar"
  }
}
function actualizar(){
  Swal.fire({
   title:'Actualización exitosa',
   icon: 'success',
   html:'<h5><a href="#" class="btn green" onclick="location.reload(), contarElementos()">Cerrar</span></h5>',
   showConfirmButton: false,
   allowOutsideClick: false
   //timer: 1000
 })
 

}