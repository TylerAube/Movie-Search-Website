const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");
const statusMessage = document.getElementById("statusMessage");

searchBtn.addEventListener("click", searchMovies);


function searchMovies() {
  document.getElementById("hero").classList.add("searched");
  const searchTerm = document.getElementById("searchInput").value.trim();

  if (!searchTerm) {
    statusMessage.textContent = "Please enter a movie name 🎥";
    return;
  }

  statusMessage.textContent = "Loading movies...";
  movieList.innerHTML = "";

  fetch(`http://www.omdbapi.com/?apikey=95566ec3&s=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      statusMessage.textContent = "";

      if (data.Response === "False") {
        statusMessage.textContent = "No movies found 😕";
        return;
      }

      data.Search.forEach(movie => {
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
    })
    .catch(() => {
      statusMessage.textContent = "Something went wrong. Try again later.";
    });
}

document.getElementById("resetHome").addEventListener("click", () => {
  document.getElementById("hero").classList.remove("searched");
  document.getElementById("movieList").innerHTML = "";
  document.getElementById("statusMessage").textContent = "";
  document.getElementById("searchInput").value = "";
});
