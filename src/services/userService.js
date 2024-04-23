import apiService from "./apiService";

export default {
  getMyBooks() {
    return apiService.get("/user/books").then((response) => {
      return response.data;
    });
  },
  getMyBookById(id) {
    return apiService
      .get(`/user/books/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => false);
  },
  createMyBook(book) {
    return apiService.post("/user/books", book).then((response) => {
      return response.data;
    });
  },
  updateMyBook(id, book) {
    return apiService.put(`/user/books/${id}`, book).then((response) => {
      return response.data;
    });
  },
  deleteMyBook(id) {
    return apiService.delete(`/user/books/${id}`).then((response) => {
      return response.data;
    });
  },
};
