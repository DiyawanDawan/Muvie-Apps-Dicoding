import axios from "axios";

class TopRatedMovie extends HTMLElement {
  connectedCallback() {
    const apiKey = "4313ad19d10dff5eb25b38cd673e3386";
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

    axios.get(apiUrl)
      .then((response) => {
        const movies = response.data.results;
        const movieTopRated = new MovieTopRatedRenderer(movies);
        this.innerHTML = movieTopRated.render();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class MovieTopRatedRenderer {
  constructor(movies) {
    this.movies = movies;
  }

  render() {
    return `
      <h1>Top Rated ⭐</h1>
      <div class="row">
        ${this.movies
          .slice(0, 5)
          .map((movie) => `
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="card mb-3">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text"><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
                </div>
              </div>
            </div>
          `)
          .join("")}
      </div>`;
  }
}

customElements.define("movie-toprated", TopRatedMovie);
