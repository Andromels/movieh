const API_KEY = '361accd1456703005807d09acf1e92fe'; // Replace with your TMDb API key
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

// Set background image for dashboard
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

// Display movies in the dashboard
function displayMovies(movies) {
    const moviesSection = document.getElementById('movies-section');
    moviesSection.innerHTML = ''; // Clear previous results

    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.onclick = () => openModal(movie);

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

// Open modal with movie details
function openModal(movie) {
    const modalPoster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'no_image.png';
    document.getElementById('modal-poster').src = modalPoster;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-overview').textContent = movie.overview;
    document.getElementById('modal-release-date').textContent = movie.release_date;
    document.getElementById('trailer').src = ''; // Clear previous trailer

    const modal = document.getElementById('movie-modal');
    modal.style.display = 'flex';
}


// Close modal
function closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none';
    document.getElementById('trailer').src = ''; // Stop the trailer
}

// Function to search for movies
function searchMovies() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }
}
