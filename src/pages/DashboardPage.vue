<template>
  <q-page v-if="loaded">
    <h4 class="q-mx-md">Welcome back, {{ user.name }}</h4>
    <div class="flex flex-wrap justify-around">
      <q-btn
        class="q-mx-md q-mb-md"
        color="primary"
        label="Add book"
        @click="addBook"
      />
    </div>
    <div
      v-if="userBooks.length > 0"
      class="q-gutter-md flex flex-wrap justify-around q-mr-md q-my-md"
    >
      <book-component
        v-for="book in userBooks"
        :key="book.id"
        :book="book"
        @click="onBookClick(book)"
      />
    </div>
    <book-dialog
      v-model="selectedBookOpen"
      :edit="true"
      :book="selectedBook"
      @close="selectedBookOpen = false"
      @delete="deleteBook"
    />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import loginService from "@/services/loginService";
import userService from "@/services/userService";

import BookComponent from "src/components/Guest/BookComponent.vue";
import BookDialog from "src/components/Guest/BookDialog.vue";

const $router = useRouter();

const loaded = ref(false);
const user = ref(null);
const userBooks = ref([]);
const selectedBookOpen = ref(false);
const selectedBook = ref(null);

const addBook = () => {
  $router.push("/dashboard/book");
};

const onBookClick = (book) => {
  selectedBook.value = book;
  selectedBookOpen.value = true;
};

const deleteBook = async (id) => {
  await userService.deleteMyBook(id);
  userBooks.value = userBooks.value.filter((book) => book.id !== id);
};

onMounted(async () => {
  user.value = await loginService.getMe();
  userBooks.value = await userService.getMyBooks();

  loaded.value = true;
});
</script>
