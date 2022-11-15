const watchlistSection =  document.querySelector(".watchlist-section")
const savedMovies = JSON.parse(localStorage.getItem('my movies'))

let myMovielist = []
if (savedMovies) {
    myMovielist = savedMovies
    renderWatchlist()
}

function getWatchlistHtml() {
    let watchlistHtml = ``
    myMovielist.forEach(function(watch) {
        watchlistHtml += `<div class="movie-container">
                                <div class="poster-container">
                                    <img src="${watch.Poster}" alt="movie poster" class="poster">
                                </div>
                                <div class="movie-details">
                                    <div class="movie-rating">
                                        <h3 class="title">${watch.Title}</h3>
                                        <img src="img/icon.png" alt="star icon" class="star-icon">
                                        <h4>${watch.imdbRating}</h4>
                                    </div>
                                    <div class="movie-specifications">
                                        <h4>${watch.Runtime}</h4>
                                        <h4>${watch.Genre}</h4>
                                        <div class="watchlist">
                                            <i class="fa-solid fa-circle-minus" data-remove="${watch.imdbID}"></i>
                                            <h4>Watchlist</h4>
                                        </div>
                                    </div>
                                    <p class="movie-plot">${watch.Plot}</p>
                                </div>
                        </div>
                        <hr>`
    }) 
        return watchlistHtml

    }


function renderWatchlist() {
    watchlistSection.innerHTML = getWatchlistHtml()
        if (savedMovies.length > 2) {
            document.querySelector(".container").style.height = "fit-content"
            document.querySelector(".watchlist-section").style.height = "fit-content"
        } else{
            document.querySelector(".container").style.height = "779px"
            document.querySelector(".watchlist-section").style.height = "571px"
        }

        if (savedMovies.length === 0) {
            watchlistSection.innerHTML = `<h2>Your watchlist is looking a little empty...</h2>
                                            <div class="watchlist-placeholder">
                                                <a href="index.html"><i class="fa-solid fa-circle-plus"></i></a>
                                                <h4>Let's add some movies!</h4>
                                            </div>`
        }
    }

document.addEventListener("click", function(e) {
    if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    }
})


function handleRemove(movieId) {
    const targetMovieObj = savedMovies.filter(function (movie) {
        return movie.imdbID === movieId
    })[0]

    let movieIndex = savedMovies.indexOf(targetMovieObj)
    savedMovies.splice(movieIndex, 1)
    localStorage.setItem("my movies", JSON.stringify(savedMovies))
    renderWatchlist()
}
