const API_KEY = '361accd1456703005807d09acf1e92fe'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_IMG_URL = 'https://image.tmdb.org/t/p/original';

// Fetch popular movies for dashboard and background
document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies();
});

function fetchPopularMovies() {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
            setBackground(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// background image for dashboard
function setBackground(movies) {
    const movieBackground = document.getElementById('movie-background');
    if (movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        const backgroundImage = `${BACKDROP_IMG_URL}${randomMovie.backdrop_path}`;
        movieBackground.style.backgroundImage = `url(${backgroundImage})`;
    } else {
        movieBackground.style.backgroundImage = `url('default_background.jpg')`;
    }
}

// Display movies dashboard
function displayMovies(movies) {
    const moviesSection = document.getElementById('movies-section');
    moviesSection.innerHTML = ''; // Clear previous results

    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.onclick = () => fetchMovieTrailer(movie);

            const moviePoster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'no_image.png';
            movieCard.innerHTML = `
                <img src="${moviePoster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;

            moviesSection.appendChild(movieCard);
        });
    } else {
        moviesSection.innerHTML = '<p>No movies found</p>';
    }
}

// Fetch and display movie trailer and details in the modal
function fetchMovieTrailer(movie) {
    fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            const trailerKey = trailer ? trailer.key : null;
            openModal(movie, trailerKey);
        })
        .catch(error => console.error('Error fetching trailer:', error));
}

// Open modal with movie details and trailer
function openModal(movie, trailerKey) {
    const modalPoster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'no_image.png';
    document.getElementById('modal-poster').src = modalPoster;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-overview').textContent = movie.overview;
    document.getElementById('modal-release-date').textContent = movie.release_date;

    if (trailerKey) {
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        document.getElementById('trailer').src = trailerUrl;
    } else {
        document.getElementById('trailer').src = ''; // No trailer available
    }

    document.getElementById('movie-modal').style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('movie-modal').style.display = 'none';
    document.getElementById('trailer').src = ''; // Stop the video
}

// Search movies
function searchMovies() {
    const query = document.getElementById('search-input').value;

    if (query.trim() !== '') {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}
