window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  fetch("http://localhost:3001/api/movies/favs")
  .then(response => response.json())
  .then(peliculas=>{
    let data = peliculas.data;
    data.forEach((movie) => {
      if(sessionStorage.favourites.includes(movie.id)){
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      }
    });

  })

  if(!sessionStorage.favourites){
    const h1 = document.createElement("h1");
    h1.textContent = "No tienes ninguna pelicula en favoritos";
    container.appendChild(h1)
  }
  
};
