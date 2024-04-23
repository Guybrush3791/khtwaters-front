import apiService from "./apiService";

export default {
  getUsers() {
    return apiService
      .get("/admin/users")
      .then((response) => {
        const users = response.data;
        users.map((user) => {
          user.books.map((book) => {
            book.images = JSON.parse(book.images);
          });
        });
        return response.data;
      })
      .catch(() => {
        return [];
      });
  },
  updateUser(id, name, email, password, admin) {
    const data = {
      name,
      email,
      admin,
    };

    if (password && password.trim().length > 0) {
      data.password = password;
    }

    return apiService
      .put(`/admin/users/${id}`, data)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  },
};
