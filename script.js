
const API_URL = 'wala pay API'; 


function fetchMovies() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = ''; 

            
            data.movies.forEach(movie => {
                const cardHtml = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">${movie.description}</p>
                                <a href="${movie.moreInfoUrl}" class="btn btn-warning" target="_blank">More Info</a>
                            </div>
                        </div>
                    </div>
                `;
                movieList.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error fetching movie data:', error));
}


document.addEventListener('DOMContentLoaded', fetchMovies);
