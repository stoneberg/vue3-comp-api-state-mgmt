export const signin = async () =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: "John",
        lastName: "Doe",
      });
    }, 2000);
  });
