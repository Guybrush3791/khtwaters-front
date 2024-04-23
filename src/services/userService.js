import apiService from "./apiService";

export default {
  async getMyBooks() {
    return (await apiService.get("/user/books")).data.map((book) => {
      book.images = JSON.parse(book.images);
      return book;
    });
  },
  async getMyBookById(id) {
    return apiService
      .get(`/user/books/${id}`)
      .then((response) => {
        const book = response.data;
        book.images = JSON.parse(book.images);

        return book;
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
