class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="footer bg-dark p-3" style="color: white;">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-md-4 col-lg-4">
            <h3>Movie Popular</h3>
            <a href="/">Movie Popular</a>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4">
            <h3>Movie Top Rated</h3>
            <a href="/">Movie Top Rated</a>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4">
            <h3>Movie Upcoming</h3>
            <a href="/">Movie Upcoming</a>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define("foo-ter", Footer);
