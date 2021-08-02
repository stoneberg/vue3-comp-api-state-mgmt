<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
        <span v-if="movie.requiresLogin">(login required)</span>
        <button v-if="isLoggedIn" @click="removeMovie(movie.id)">x</button>
      </li>
    </ul>
    <button v-if="isLoggedIn" @click="onAddMovieClick()">Add Movie</button>
  </div>
</template>

<script>
import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";

export default {
  name: "MovieList",
  setup: () => {
    const {
      actions: movieActions, getters: movieGetters
    } = useMovieStore();
    const { getters: userGetters } = useUserStore();

    // call fetch movie api
    movieActions.findMovies();

    const onAddMovieClick = () => {
      movieActions.addMovie({
        id: movieGetters.getNumberOfMovies().value + 1,
        title: `Movie ${movieGetters.getNumberOfMovies().value + 1}`,
        requiresLogin: false,
      });
    };

    return {
      movies: movieGetters.getMovies(),
      isLoggedIn: userGetters.getIsLoggedIn(),
      removeMovie: movieActions.removeMovie,
      onAddMovieClick
    };
  },
};
</script>

<style></style>
