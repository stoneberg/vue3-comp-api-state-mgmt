import { reactive, readonly, computed } from "vue";
import useUserStore from "@/store/useUserStore";
import movieService from "@/services/movieService";

const defaultState = {
  movies: [],
};

const state = reactive(defaultState);

const getters = {
  getNumberOfMovies() {
    return computed(() => state.movies.length);
  },
  getMovies() {
    return computed(() => {
      const { getters: userGetters } = useUserStore();

      if (userGetters.getIsLoggedIn().value) {
        return state.movies;
      }

      return state.movies.filter((movie) => !movie.requiresLogin);
    });
  },
};

const actions = {
  async findMovies() {
    try {
      const response = await movieService.fetchMovies();
      console.log("response>>>", response);
      state.movies = [].concat(response.data.movies);
      return response;
    } catch (e) {
      console.error(e);
      state.movies = [];
    }
  },
  addMovie(newMovie) {
    state.movies.push(newMovie);
  },
  removeMovie(movieId) {
    const indexOfMovie = state.movies.findIndex(
      (movie) => movie.id === movieId
    );

    state.movies.splice(indexOfMovie, 1);
  },
};

export default () => ({
  state: readonly(state),
  getters,
  actions,
});
