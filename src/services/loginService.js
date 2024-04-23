import apiService from "./apiService";

export default {
  isAdmin() {
    return apiService
      .get("/admin/is-admin")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
  },
  login(email, password) {
    return apiService
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("userToken", token);

        return true;
      })
      .catch(() => {
        return false;
      });
  },
  register(name, email, password) {
    return apiService
      .post("/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("userToken", token);

        return true;
      })
      .catch(() => {
        return false;
      });
  },
  update(name, email, password) {
    return apiService
      .put("/user/update", {
        name,
        email,
        password,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  logout() {
    localStorage.removeItem("userToken");
  },
  getMe() {
    if (localStorage.getItem("userToken") == null) return false;

    return apiService.get("/user/me").then((response) => {
      return response.data;
    });
  },
};
