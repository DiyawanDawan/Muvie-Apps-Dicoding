import axios from "axios";

const apiKey = "4313ad19d10dff5eb25b38cd673e3386";

class MovieSearch extends HTMLElement {
  connectedCallback() {
    this.render();

    const searchForm = this.querySelector("#search-form");
    const searchInput = this.querySelector("#search-input");
    const movieListElement = this.querySelector("#movie-list");

    const createMovieElement = (movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");
      movieElement.innerHTML = `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <strong>Release Date:</strong> ${movie.release_date} <br>
              <strong>Rating:</strong> ⭐ ${movie.vote_average}
            </p>
            <p class="card-text">${movie.overview}</p>
          </div>
        </div>
      `;
      return movieElement;
    };

    const renderSearchResults = (movies) => {
      movieListElement.innerHTML = "";

      if (movies.length === 0) {
        movieListElement.textContent = "No movies found.";
        return;
      }

      const movieElements = movies.map(createMovieElement);
      movieElements.forEach((movieElement) => {
        movieListElement.appendChild(movieElement);
      });
    };

    const searchMovies = (query) => {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

      axios.get(searchUrl)
        .then((response) => {
          const movies = response.data.results;
          renderSearchResults(movies);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        searchMovies(query);
      }
    });
  }

  render() {
    this.innerHTML = `
      <form id="search-form">
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="search-input" placeholder="Cari Movie">
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>
      <div class="row" id="movie-list"></div>
    `;
  }
}

customElements.define("search-movie", MovieSearch);
