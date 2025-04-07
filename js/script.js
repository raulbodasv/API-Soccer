//API usada https://rapidapi.com/api-sports/api/api-football/
//API usada https://rapidapi.com/apigeek/api/google-search3/
const key = ('API_KEY');

let numero_partidos = document.getElementById('numero-partidos');
let container_info = document.getElementById('container-info');
let titulo_equipo = document.getElementById('titulo-equipo');
let titulo_live = document.getElementById('titulo-live');
let sinpartidos = document.getElementById('sinpartidos');


//Oculto alguna información
titulo_equipo.hidden = true;
sinpartidos.hidden = true;

//Saco todos los partidos en directo
fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/live", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "API_KEY"
    }
})
    .then(datos => datos.json())
    .then(datos => {
        numero_partidos.textContent = "Total de partidos: " + (datos.api.fixtures).length;

        datos.api.fixtures.forEach(partido => {
            //Contenedor de cada partido
            let contenedorPartido = document.createElement('article');
            let contenedorAdicional = document.createElement('div');
            let tiempo = document.createElement('p');
            let goles = document.createElement('p');

            contenedorPartido.classList.add('contenedor-partido');
            tiempo.classList.add('tiempo-transurrido');
            goles.classList.add('goles');
            contenedorAdicional.classList.add('contenedor-adicional');

            tiempo.textContent = partido.elapsed + " '";
            goles.textContent = partido.goalsHomeTeam + " - " + partido.goalsAwayTeam

            container_info.appendChild(contenedorPartido);
            contenedorPartido.appendChild(contenedorAdicional);
            contenedorAdicional.appendChild(tiempo);
            contenedorAdicional.appendChild(goles);


            //Contenedor de el equipo Local
            let contenedorEquipoLocal = document.createElement('div');
            let nombreEquipoLocal = document.createElement('span');
            let logoEquipoLocal = document.createElement('img');


            contenedorEquipoLocal.classList.add('contenedor__partido-local');
            nombreEquipoLocal.classList.add('nombre-partido');
            logoEquipoLocal.classList.add('logo__equipo');

            nombreEquipoLocal.textContent = partido.homeTeam.team_name;
            nombreEquipoLocal.setAttribute('id', partido.homeTeam.team_id);
            nombreEquipoLocal.setAttribute('alt', partido.homeTeam.team_name);
            logoEquipoLocal.src = partido.homeTeam.logo;
            logoEquipoLocal.setAttribute('id', partido.homeTeam.team_id);
            logoEquipoLocal.setAttribute('alt', partido.homeTeam.team_name);

            contenedorPartido.appendChild(contenedorEquipoLocal);
            contenedorEquipoLocal.appendChild(logoEquipoLocal);
            contenedorEquipoLocal.appendChild(nombreEquipoLocal);



            //Contenedor de el equipo Contrario
            let contenedorEquipoContrario = document.createElement('div')
            let nombreEquipoContrario = document.createElement('span');
            let logoEquipoContrario = document.createElement('img');

            contenedorEquipoContrario.classList.add('contenedor__partido-contrario');
            nombreEquipoContrario.classList.add('nombre-partido');
            logoEquipoContrario.classList.add('logo__equipo');

            nombreEquipoContrario.textContent = partido.awayTeam.team_name;
            nombreEquipoContrario.setAttribute('id', partido.awayTeam.team_id);
            nombreEquipoContrario.setAttribute('alt', partido.awayTeam.team_name);
            logoEquipoContrario.src = partido.awayTeam.logo;
            logoEquipoContrario.setAttribute('id', partido.awayTeam.team_id);
            logoEquipoContrario.setAttribute('alt', partido.awayTeam.team_name);

            contenedorPartido.appendChild(contenedorEquipoContrario);
            contenedorEquipoContrario.appendChild(nombreEquipoContrario);
            contenedorEquipoContrario.appendChild(logoEquipoContrario);

        });
    });
