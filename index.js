let debounceTimer;

document.getElementById('movieSearch').addEventListener('input', function(event) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
        fetchMovies(event.target.value);
    }, 500); // Adjust the debounce delay as needed per your need
});

function fetchMovies(query) {
    const apiKey = 'e813c679'; // Replace with your actual API key you have
    const apiUrl = `http://www.omdbapi.com/?apikey=${'e813c679'}&s=${query}`; // Fix: Use apiKey variable

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateMovieResults(data.Search);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function updateMovieResults(movies) {
    const movieResultsDiv = document.getElementById('movieResults');
    movieResultsDiv.innerHTML = ''; // Clear previous results

    if (movies) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card'); // Add your styles here

            const title = document.createElement('h3');
            title.textContent = movie.Title;

            const year = document.createElement('p');
            year.textContent = `Year: ${movie.Year}`;

            movieCard.appendChild(title);
            movieCard.appendChild(year);
            movieResultsDiv.appendChild(movieCard);
        });
    } else {
        movieResultsDiv.innerHTML = 'No results found';
    }
}
