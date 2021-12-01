
if(!sessionStorage.favourites){
   favourites = []
}else{
  favourites = [sessionStorage.favourites]
}

window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
      fetch("http://localhost:3001/api/movies/")
        .then(response => response.json())
        .then(peliculas=>{
          let data = peliculas.data;
          data.forEach((movie,i) => {
            const card = document.createElement("div");
            card.setAttribute("class", "card");

            const h1 = document.createElement("h1");
            h1.textContent = movie.title;
      
            const p = document.createElement("p");
            p.textContent = `Rating: ${movie.rating}`;

            const a = document.createElement("a")
            a.setAttribute("href", `/movies/detail/${movie.id}`);
            a.textContent = `Ir al detalle de la pelicula`;
      
            const duracion = document.createElement("p");
            duracion.textContent = `Duración: ${movie.length}`;

            const fav = document.createElement("i")
            fav.setAttribute("class","far fa-star")
            fav.setAttribute("id","star")
      
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(fav);
            card.appendChild(p);
            
            if (movie.genre !== null) {
              const genero = document.createElement("p");
              genero.textContent = `Genero: ${movie.genre.name}`;
              card.appendChild(genero);
            }
            card.appendChild(duracion);
            card.appendChild(a)

            

            let star = document.querySelectorAll("#star")
            star[i].addEventListener("click",()=>{
                favourites.push(movie.id)
               sessionStorage.favourites = favourites
               //funcion
                if(document.getElementById("a") == null){
                    const linkFav = document.createElement("a")
                    linkFav.setAttribute("href", `/movies/favs/`);
                    linkFav.setAttribute("id", `a`);
                    linkFav.textContent = `Ir a mis favoritos`;
                      app.insertBefore(linkFav,container)
                  }
          });
        })
        //funcion
        if(document.getElementById("a") == null && sessionStorage.favourites.length != 0 ){
          const linkFav = document.createElement("a")
          linkFav.setAttribute("href", `/movies/favs/`);
          linkFav.setAttribute("id", `a`);
          linkFav.textContent = `Ir a mis favoritos`;
            app.insertBefore(linkFav,container)
        }
      }) 
};
