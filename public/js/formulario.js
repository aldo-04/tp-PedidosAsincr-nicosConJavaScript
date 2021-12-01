let title = document.getElementById("title")
let rating = document.getElementById("rating")
let awards = document.getElementById("awards")
let release_date = document.getElementById("release_date")
let length = document.getElementById("length")
let editar = document.getElementById("editar")
let crear = document.getElementById("crear")
let eliminar = document.getElementById("eliminar")
let form = document.getElementById("formulario")

let search= new URLSearchParams(window.location.search)
let href = window.location.pathname

window.onload = () => {
    fetch(`http://localhost:3001/api${href}`)
        .then(response => response.json())
        .then(pelicula=>{
            let fecha = new Date(pelicula.data.release_date)
            let año =fecha.getFullYear()
            let mes =fecha.getMonth()+1
            let dia =fecha.getDate()

            title.value = pelicula.data.title
            rating.value = pelicula.data.rating
            awards.value = pelicula.data.awards
            release_date.value = `${año}-${mes <= 9 ? '0'+ mes : mes}-${dia > 10 ? dia :'0'+dia}`
            length.value = pelicula.data.length

            // Editar pelicula
            editar.addEventListener("click",(e)=>{
                e.preventDefault()
                console.log(pelicula)
                let data = {
                    title : title.value,
                    genre_id : pelicula.data.genre_id,
                    rating : rating.value,
                    awards : awards.value,
                    release_date : release_date.value,
                    length : length.value
                }
                console.log(data)
                async function editar(item) {
                    try {
                        let response = await fetch(`http://localhost:3001/api/movies/${+pelicula.data.id}/update`, {
                            method: "PUT",
                            body: JSON.stringify(item),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        let result = await response.json();
                        return result;
                    } catch (err) {
                    }
                }
                editar(data)
            })

        // Crear pelicula
        crear.addEventListener("click",(e)=>{
            e.preventDefault()
            console.log(pelicula)
            let data = {
                title : title.value,
                genre_id : pelicula.data.genre_id,
                rating : rating.value,
                awards : awards.value,
                release_date : release_date.value,
                length : length.value
            }
            console.log(data)
            async function crear(item) {
                try {
                    let response = await fetch(`http://localhost:3001/api/movies/create`, {
                        method: "POST",
                        body: JSON.stringify(item),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    let result = await response.json();
                    return result;
                } catch (err) {
                }
            }
            crear(data)
        })

         // Eliminar la pelicula
         eliminar.addEventListener("click",(e)=>{
            e.preventDefault()
            async function eliminar() {
                try {
                    let response = await fetch(`http://localhost:3001/api/movies/delete/${pelicula.data.id}`, {
                        method: "DELETE"
                    });
                    let result = await response.json();
                    return result;
                } catch (err) {
                }
            }
            eliminar()
            window.location.href = "/"
        })
        })
}