import apiService from "./apiService";

export default {
  getImage(filename) {
    return apiService({
      method: "get",
      url: `/res/image/${filename}`,
      responseType: "blob", // This tells Axios to expect a Blob response
    })
      .then((response) => {
        return URL.createObjectURL(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch image:", error);
        throw error; // Propagate the error if needed
      });
  },
  async getCover(book) {
    if (book?.cover ?? false) return await this.getImage(book.cover);

    return null;
  },
  async getImages(book) {
    if (!(book?.images ?? false)) return null;

    let images = {};

    for (let i = 0; i < book.images.length; i++) {
      const image = book.images[i];
      images[image] = await this.getImage(image);
    }

    return images;
  },
  uploadImage(book, type, file) {
    let formData = new FormData();

    formData.append("image", file);
    formData.append("type", type);

    return apiService({
      method: "post",
      url: `/user/books/${book.id}/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to upload image:", error);
        throw error; // Propagate the error if needed
      });
  },
  removeImage(book, filename) {
    return apiService({
      method: "delete",
      url: `/user/books/${book.id}/image`,
      data: { filename },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to remove image:", error);
        throw error; // Propagate the error if needed
      });
  },
};
