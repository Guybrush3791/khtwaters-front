import apiService from "./apiService";

export default {
  async getBooks() {
    return (await apiService.get("/books")).data.map((book) => {
      book.images = JSON.parse(book.images);
      return book;
    });
  },
};
