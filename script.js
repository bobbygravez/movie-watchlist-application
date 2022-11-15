const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")
const movieSection = document.querySelector(".movie-section")

let imdbID = []
let movieList = []
let myWatchlist = []


document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        handleAdd(e.target.dataset.add)
    }
})

function handleAdd(movieId) {
    const targetMovieObj = movieList.filter(function(movie) {
        return movie.imdbID === movieId
    })[0]

    document.querySelector(`#watchlist-${movieId}`).children[1].innerHTML = `Added`

    if (!myWatchlist.includes(targetMovieObj)) {
        myWatchlist.push(targetMovieObj)
    }
   localStorage.setItem("my movies", JSON.stringify(myWatchlist))
}

searchBtn.addEventListener("click", handleSearch)

function handleSearch() {
    fetch(`https://www.omdbapi.com/?apikey=6f58387e&s=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.Error) {
            movieSection.innerHTML = `<h2 class="not-found">Unable to find what you're looking for, Please try another search</h>`
        } else {
            data.Search.map(function(movie) {
                imdbID.push(movie.imdbID) 
            })

            searchInput.value = ""
            renderMovies()
        }
        
    }) 
   
}

function renderMovies() {
    let movieHtml = ""
    imdbID.forEach(function(id) {
        fetch(`https://www.omdbapi.com/?apikey=6f58387e&i=${id}`)
        .then(response => response.json())
        .then(data => {
                movieList.push(data)
            movieHtml += `<div class="movie-container">
                                    <div class="poster-container">
                                        <img src="${data.Poster}" alt="movie poster" class="poster">
                                    </div>
                                    <div class="movie-details">
                                        <div class="movie-rating">
                                            <h3 class="title">${data.Title}</h3>
                                            <img src="img/icon.png" alt="star icon" class="star-icon">
                                            <h4>${data.imdbRating}</h4>
                                        </div>
                                        <div class="movie-specifications">
                                            <h4>${data.Runtime}</h4>
                                            <h4>${data.Genre}</h4>
                                            <div class="watchlist" id="watchlist-${data.imdbID}">
                                                <i class="fa-solid fa-circle-plus" data-add="${data.imdbID}"></i>
                                                <h4>Watchlist</h4>
                                            </div>
                                        </div>
                                        <p class="movie-plot">${data.Plot}</p>
                                    </div>
                            </div>
                          <hr> `
            movieSection.innerHTML = movieHtml
        }) 
    })
    setTimeout(function() {
        if (movieList.length > 2) {
            document.querySelector(".container").style.height = "fit-content"
            document.querySelector(".movie-section").style.height = "fit-content"
        }
    }, 1000)

    imdbID = []
}
