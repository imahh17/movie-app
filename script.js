const APIKEY = 'd1cf03e9c242181f7d663f4b66c949be';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='+APIKEY+'&language=es';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/'; 
const PAGPATH = '&page='
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key='+APIKEY+'&query=';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('.search');
const botonSec = document.getElementById('botonera');
const botones = document.querySelectorAll('.boton');

getMovies(APIURL+PAGPATH+"1");

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);

}

getBotones();

function showMovies(movies){
    //Borra lo que hay en la sección main
    main.innerHTML = "";

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        if(poster_path!=null){
            const movieEl = document.createElement('div');
            movieEl.classList.add("movie");

            movieEl.innerHTML = `
                <img src="${IMGPATH+poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span></div>
                    <div class="overview">
                        <h4>Sinopsis:</h4>
                        ${overview}
                    </div>
            `;

            main.appendChild(movieEl);
        }else{
            const movieEl = document.createElement('div');
            movieEl.classList.add("movie");

            movieEl.innerHTML = `
                <img src="null-img.png" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span></div>
                    <div class="overview">
                        <h4>Sinopsis:</h4>
                        ${overview}
                    </div>
            `;

            main.appendChild(movieEl);
        }
        
    });
}

function getBotones(){ //data como parametro si meto el callBack en getMovies como getBotones(respData) pero me reinicia botones y no lo uso
    //console.log(data.page); //Pagina actual
    //console.log(data.total_pages); //Total de paginas
    botonSec.innerHTML="";

    for(let i=1; i<=5; i++){

        //Antes creé button en vez de div
        const botonEl = document.createElement('div');
        botonEl.classList.add("botonCont");

        botonEl.innerHTML = `
            <button onclick="botonClick(this)" class="boton">`+i+`</button>
        `;

        botonSec.appendChild(botonEl);
    }

    botonSec.append(". . .");

    const botonEl = document.createElement('div');
    botonEl.classList.add("botonCont");

    botonEl.innerHTML = `
        <button onclick="botonClick(this)" class="boton">500</button>
    `;

    botonSec.appendChild(botonEl);
}

let botonAnterior = document.createElement('button');

function botonClick(e){
    console.log(e);
    if(botonAnterior != e){
        botonAnterior.classList.remove("botSelected");
    } 
    getMovies(APIURL+PAGPATH+e.innerText);
    window.scrollTo(0, 0);
    e.classList.add("botSelected");
    botonAnterior = e;

}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){

        getMovies(SEARCHAPI + searchTerm);

        search.value = '';
    }
});

document.getElementById('titulo').addEventListener('click', (e) => {
    botonAnterior.classList.remove("botSelected");
    getMovies(APIURL+PAGPATH+"1");
});





