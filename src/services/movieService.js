export default {
  async fetchMovies() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: "OK",
          data: {
            movies: [
              {
                id: 1,
                title: "Movie 1",
                requiresLogin: false,
              },
              {
                id: 2,
                title: "Movie 2",
                requiresLogin: true,
              },
              {
                id: 3,
                title: "Movie 3",
                requiresLogin: false,
              },
            ],
          },
        });
      }, 3000);
    });
  },
  //   delete(id) {
  //     return Api.delete(`${END_POINT}/${id}`);
  //   },
};
