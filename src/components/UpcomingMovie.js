import axios from "axios";

class UpcomingMovie extends HTMLElement {
  connectedCallback() {
    const apiKey = "4313ad19d10dff5eb25b38cd673e3386";
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
    axios.get(apiUrl)
      .then((response) => {
        const movies = response.data.results;
        const movieUpcoming = new MovieUpcomingRenderer(movies);
        this.innerHTML = movieUpcoming.render();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class MovieUpcomingRenderer {
  constructor(movies) {
    this.movies = movies;
  }

  render() {
    return `
    <h1>Upcoming</h1>
    <div class="row">
      ${this.movies
        .slice(0, 9)
        .map(
          (movie) => `
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mb-3">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img-top" >
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text"><strong>Release:</strong> ${movie.release_date}<br><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
                <p>${movie.overview}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
        `
        )
        .join("")}
    </div>`;
  }
}

customElements.define("movie-upcoming", UpcomingMovie);
