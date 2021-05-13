import { DOMSelectors } from "./DOM";
import { genres } from "./genre";

const key = "a92e7c4bda085c6b116c470c8fe494b9";

/// CODE
const query = async function () {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=average_vote.asc&vote_count.gte=10000&vote_average.gte=8&api_key=${key}`
    );
    const data = await response.json();
    data.results.forEach((movie) => {
      let genreArr = [];
      const addGenre = function () {
        genres.forEach((element) => {
          if (movie.genre_ids.includes(element.id)) {
            genreArr.push(element.name);
            return genreArr;
          }
        });
      };
      addGenre();
      console.log(genreArr);
      DOMSelectors.grid.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-card">
      <div class="movie-card-front">
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          alt=""
          class="poster"
        />
      </div>
      <div class="movie-card-back">
        <h3 class="movie-card-header">${movie.original_title}</h3>
        <div class="score-box">
          <p class="user-score">Community Score</p>
          <p class="user-score">${movie.vote_average}</p>
        </div>
        <div class="release-box">
          <p class="release-date">Released</p>
          <p class="release-date">${movie.release_date}</p>
        </div>
        <div class="movie-genres">
          ${genreArr}
        </div>
      </div>
    </div>`
      );
    });
    console.log(data.results);
  } catch (error) {
    console.log(error);
    alert("Hey something went wrong");
  }
};

query();
