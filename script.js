const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");
const statusMessage = document.getElementById("statusMessage");
const sortSelect = document.getElementById("sortSelect");
const yearSort = document.getElementById("yearSort");

let moviesData = [];

searchBtn.addEventListener("click", searchMovies);
sortSelect.addEventListener("change", applyFilters);
yearSort.addEventListener("change", applyFilters);

function searchMovies() {
  document.getElementById("hero").classList.add("searched");

  const searchTerm = document.getElementById("searchInput").value.trim();

  if (!searchTerm) {
    statusMessage.textContent = "Please enter a movie name 🎬";
    return;
  }

  statusMessage.textContent = "Loading movies...";
  movieList.innerHTML = "";

  fetch(`https://www.omdbapi.com/?apikey=95566ec3&s=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      statusMessage.textContent = "";

      if (data.Response === "False") {
        statusMessage.textContent = "No movies found 😕";
        return;
      }

      moviesData = data.Search;
      renderMovies(moviesData);
    })
    .catch(() => {
      statusMessage.textContent = "Something went wrong. Try again later.";
    });
}

function renderMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach(movie => {
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    movieList.innerHTML += `
      <div class="movie-card">
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;
  });
}

function applyFilters() {
  let sortedMovies = [...moviesData];

  if (sortSelect.value === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  if (sortSelect.value === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  if (yearSort.value === "new") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }

  if (yearSort.value === "old") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  renderMovies(sortedMovies);
}
