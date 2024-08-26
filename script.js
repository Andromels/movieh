const API_KEY = '361accd1456703005807d09acf1e92fe'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function searchMovies() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }
}

function displayMovies(movies) {
    const moviesSection = document.getElementById('movies-section');
    moviesSection.innerHTML = ''; // Clear previous results

    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            const moviePoster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'no_image.png';
            movieCard.innerHTML = `
                <img src="${moviePoster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
            `;

            moviesSection.appendChild(movieCard);
        });
    } else {
        moviesSection.innerHTML = '<p>No movies found</p>';
    }
}
