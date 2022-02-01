let container_plantilla = document.getElementById('container-plantilla');
let escudo_equipo = document.getElementById('escudo-equipo');
let volveralistar = document.getElementById('volveralistar');
let nombreequipo;
let nombreaBuscar;

//Con el id del equipo saco la plantilla entera, si no esta reflejada en la API te muestra un mensaje
const verPlantilla = (id) => {
    fetch("https://api-football-v1.p.rapidapi.com/v3/players/squads?team=" + id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "5dbfa1c1demsh53a65d71061e3aep1ddeadjsn99a21e46a07d"
        }
    })
        .then(datos => datos.json())
        .then(datos => {
            console.log(datos.response)

            if (datos.response.length > 0) {
                escudo_equipo.src = datos.response[0].team.logo;
                datos.response[0].players.forEach(jugador => {
                    // console.log(jugador);
                    let contenedorJugador = document.createElement('a');
                    let imagenJugador = document.createElement('img');
                    let nombreJugador = document.createElement('p');
                    let posicion = document.createElement('p');
                    let hr = document.createElement('hr')

                    contenedorJugador.classList.add('container-jugador');
                    nombreJugador.classList.add('nombreJugador');
                    posicion.classList.add('posicion');
                    imagenJugador.classList.add('imagenJugador');

                    imagenJugador.src = jugador.photo;
                    nombreJugador.textContent = jugador.name;

                    //No he conseguido sacar los resultados en Español
                    if (jugador.position == "Goalkeeper") {
                        posicion.textContent = "Portero";
                    } else if (jugador.position == "Defender") {
                        posicion.textContent = "Defensa";
                    } else if (jugador.position == "Midfielder") {
                        posicion.textContent = "Medio Centro";
                    } else if (jugador.position == "Attacker") {
                        posicion.textContent = "Delantero";
                    } else {
                        posicion.textContent = "No definido";
                    }

                    container_plantilla.appendChild(contenedorJugador);
                    contenedorJugador.appendChild(imagenJugador);
                    contenedorJugador.appendChild(nombreJugador);
                    contenedorJugador.appendChild(hr);
                    contenedorJugador.appendChild(posicion);
                });
            } else {
                sinpartidos.hidden = false;
            }
        })
}

//TENER EN CUENTA QUE ES UN POCO LENTA AUNQUE SOLO PIDAS UN RESULTADO
const busquedaJugador = (jugador) => {
    fetch("https://google-search3.p.rapidapi.com/api/v1/search/q=" + jugador + "&num=1", {
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-proxy-location": "EU",
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "5dbfa1c1demsh53a65d71061e3aep1ddeadjsn99a21e46a07d"
        }
    })
        .then(datos => datos.json())
        .then(datos => {
            
            window.location.href = datos.results[0].link;
        })
        .catch(err => {
            console.error(err);
        });
}

container_info.addEventListener('click', (event) => {
    if (event.target.tagName == 'SPAN' || event.target.tagName == 'IMG') {
        container_info.hidden = true;
        titulo_live.hidden = true;
        titulo_equipo.hidden = false;
        numero_partidos.hidden = true;
        if (event.target.getAttribute('id')) {
            verPlantilla(event.target.getAttribute('id'));
        }
        if(event.target.getAttribute('alt')){
            nombreequipo = event.target.getAttribute('alt');
        }
    }
})

container_plantilla.addEventListener('click', (event) => {

    if (event.target.tagName == "A") {
        nombreaBuscar = event.target.childNodes[1].textContent;
    }
    if (event.target.tagName == "P") {
        if (event.target.classList.contains('posicion')) {
            nombreaBuscar = event.target.previousElementSibling.previousElementSibling.textContent;
        } else {
            nombreaBuscar = event.target.textContent
        }
    }
    if (event.target.tagName == "IMG") {
        nombreaBuscar = event.target.nextElementSibling.textContent;
    }
    busquedaJugador(nombreaBuscar + ' ' +nombreequipo);

    //Ejecuto un alert por que la api es lenta y a si se nota menos la espera
    alert('Buscando a '+nombreaBuscar+'...');

})

//Si la API no muestra resultados de un equipo muestra un boton para volver a ver los partidos.
volveralistar.addEventListener('click', () => {
    container_info.hidden = false;
    titulo_live.hidden = false;
    titulo_equipo.hidden = true;
    numero_partidos.hidden = false;
    sinpartidos.hidden = true;
})

