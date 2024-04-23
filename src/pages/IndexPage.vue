<template>
  <q-page>
    <h4 class="text-center">Book Manager</h4>
    <div
      v-if="books.length > 0"
      class="q-gutter-md flex flex-wrap justify-around q-mr-md"
    >
      <q-input
        v-model="search"
        outlined
        placeholder="Search"
        class="q-mb-md"
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon name="close" v-if="search" @click="search = ''" />
        </template>
      </q-input>
      <book-component
        v-for="book in books.filter(
          (book) =>
            book.name.toLowerCase().includes(search.toLowerCase()) ||
            book.description.toLowerCase().includes(search.toLowerCase())
        )"
        :key="book.id"
        :book="book"
        @click="onBookClick(book)"
      />
    </div>
    <book-dialog
      v-model="selectedBookOpen"
      :book="selectedBook"
      @close="selectedBookOpen = false"
    />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

import BookComponent from "src/components/Guest/BookComponent.vue";
import BookDialog from "src/components/Guest/BookDialog.vue";

import guestBookService from "src/services/guestBookService";

const search = ref("");
const books = ref([]);
const selectedBookOpen = ref(false);
const selectedBook = ref(null);

const onBookClick = (book) => {
  selectedBook.value = book;
  selectedBookOpen.value = true;
};

onMounted(async () => {
  books.value = await guestBookService.getBooks();
});
</script>
