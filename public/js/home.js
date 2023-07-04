let tbody = document.querySelector("tbody")

//Eliminar Anime
tbody.addEventListener("click", async (event) => {
  try {
    let elemento = event.target
    
    if (elemento.classList.contains("eliminar")) {
      
      elemento.classList.add("animate__bounce")
      let id = elemento.dataset.id
      let name = elemento.dataset.name
      
      let confirmar = confirm(`¿Está seguro que desea eliminar el Anime ${name}?`)

      if (confirmar) {
        let response = await fetch(`http://localhost:3000/api/v1/animes/${id}`, { method: "delete" })
        let data = await response.json()

            if (data.code === 200) {
            alert(data.message)
            location.reload()

            } else {
            alert(data.message)
            
            }
      }else{
        elemento.classList.remove("animate__bounce")
      }
    }
  } catch (error) {
    alert("Hubo un error al Eliminar el anime")
  }
})



//Mostrar Modal con Ver Más

tbody.addEventListener("click", async (event) =>{

    let elemento = event.target

    try {
        if(elemento.classList.contains("mostrar")){
            let id = elemento.dataset.id;
            let response = await fetch(`http://localhost:3000/api/v1/animes/${id}`);
            let data= await response.json();
            if(data.code == 200){
                let anime = data.data
                
                document.getElementById("titulo").innerHTML = `<b>${anime.nombre}</b> `
                document.getElementById("titulo").classList.add("text-center");
                document.getElementById("genero").innerHTML = `<b>Género:</b> ${anime.genero}`
                document.getElementById("year").innerHTML = `<b>Año Estreno:</b> ${anime.year}`
                document.getElementById("autor").innerHTML = `<b>Autor:</b> ${anime.autor}`
                document.getElementById("descripcion").innerHTML = `<b>Descripcion:</b><br><br>${anime.descripcion}`
                document.getElementById("imagen").setAttribute("src", anime.imagen)
                
            }
            else{
                alert(data.message);
            }
        }
        
    } catch (error) {
        alert("Ha ocurrido un error")
        
    }
})


//Agregar Anime

let crearAnime = document.getElementById("crearAnime")

crearAnime.addEventListener("submit", async (event) =>{
    event.preventDefault()

    try {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "nombre": crearNombre.value,
        "genero": crearGenero.value,
        "year": crearYear.value,
        "autor": crearAutor.value,
        "imagen": crearImagen.value,
        "descripcion": crearDescripcion.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let response = await fetch("http://localhost:3000/api/v1/animes", requestOptions)
        let data = await response.json()

        if (data.code === 201) {
                    alert(data.message)
                    location.reload()
                    crearAnime.reset()
                    
        } else if (data.code === 409){
            alert(data.message)
            crearAnime.reset()
        }
        else {
        alert(data.message)
        }

    } catch (error) {
        alert("Ha Ocurrido un Error")
    
    }
})

//Cargar datos en el modal Para Editar

tbody.addEventListener("click", async (event) => {
  try {
    let elemento = event.target

    if (elemento.classList.contains("editar")) {
        let id = elemento.dataset.id

        let response = await fetch(`http://localhost:3000/api/v1/animes/${id}`)
        let data = await response.json()
        let anime = data.data

        editNombre.value = anime.nombre
        editGenero.value = anime.genero
        editYear.value = anime.year
        editAutor.value = anime.autor
        editImagen.value = anime.imagen
        editDescripcion.value = anime.descripcion
        editId.value = anime.id

    }
  } catch (error) {
    alert("Hubo un error al Modificar el anime")
  }
})




// Editar animes

let editAnime = document.getElementById("editAnime")

editAnime.addEventListener("submit", async (event) => {
    event.preventDefault()
    let confirmar = confirm("Estás seguro que deseas editar este Anime")
    if(confirmar){
        try {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "nombre": editNombre.value,
            "genero": editGenero.value,
            "year": editYear.value,
            "autor": editAutor.value,
            "imagen": editImagen.value,
            "descripcion": editDescripcion.value
            });

            const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            let response = await fetch(`http://localhost:3000/api/v1/animes/${editId.value}`, requestOptions )
            let data = await response.json()

            if (data.code === 200) {
                    alert(data.message)
                    location.reload()                  
            } else {
            alert(data.message)
            }

    
  } catch (error) {
    alert("Hubo un error al Eliminar el anime")
  }
    }
})

//Efecto boton buscar

let btnBuscar = document.getElementById("btnBuscar")
let iconoEfecto = '<i class="bi bi-search"></i>'
let icono = '<i class="bi bi-search"></i>'


btnBuscar.addEventListener("mouseenter", () =>{
    btnBuscar.innerHTML = icono
    btnBuscar.classList.add("animate__heartBeat")
    
    
})
btnBuscar.addEventListener("mouseout", () =>{
    btnBuscar.innerHTML = icono + " Buscar"
    btnBuscar.classList.remove("animate__heartBeat")
    
})



