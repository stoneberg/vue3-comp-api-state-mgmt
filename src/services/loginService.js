export default {
  async signin() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          firstName: "John",
          lastName: "Doe",
        });
      }, 2000);
    });
  },
//   delete(id) {
//     return Api.delete(`${END_POINT}/${id}`);
//   },
};
