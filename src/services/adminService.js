import apiService from "./apiService";

export default {
  getUsers() {
    return apiService
      .get("/admin/users")
      .then((response) => {
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

    if (password && password.length > 0) {
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
