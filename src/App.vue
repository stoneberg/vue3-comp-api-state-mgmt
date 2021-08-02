<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <user-login v-if="!userState.isLoggedIn" />
  <user-profile v-else />
  <movie-list />
  Number of movies: {{ numberOfMovies }}
</template>

<script>
import useMovieStore from "@/store/useMovieStore";
import useUserStore from "@/store/useUserStore";
import MovieList from "./components/MovieList";
import UserLogin from "./components/UserLogin";
import UserProfile from "./components/UserProfile";

export default {
  name: "App",
  components: { MovieList, UserLogin, UserProfile },
  setup: () => {
    const { getters: movieGetters } = useMovieStore();
    const { state: userState, getters: userGetters } = useUserStore();

    return {
      numberOfMovies: movieGetters.getNumberOfMovies(),
      isLoggedIn: userGetters.getIsLoggedIn(),
      userState,
    };
  },
};
</script>
