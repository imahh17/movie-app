const APIKEY = 'd1cf03e9c242181f7d663f4b66c949be';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='+APIKEY+'&language=es&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';  //https://www.themoviedb.org/t/p/original/

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key='+APIKEY+'&query=';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('.search');

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);

}

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
    //Click en el titulo para volver a inicio
    alert('h');
});





