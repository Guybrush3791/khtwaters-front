<template>
  <q-page v-if="loaded">
    <h4 class="text-center text-h4">Book {{ edit ? "editor" : "creator" }}</h4>
    <q-card class="q-mx-md q-mt-xl" flat>
      <q-form @submit.prevent="onSubmit">
        <q-input v-model="book.name" label="Name" class="q-mb-md" dense />
        <q-input
          v-model="book.price"
          label="Price"
          type="number"
          step="any"
          class="q-mb-md"
          prefix="€"
          dense
        />
        <q-input
          v-model="book.description"
          label="Description"
          type="textarea"
          class="q-mb-md"
          dense
        />
        <q-card-actions align="right" class="">
          <q-btn flat label="Cancel" />
          <q-btn
            flat
            :label="edit ? 'Save' : 'Create'"
            class="text-primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import userService from "@/services/userService";

const $route = useRoute();
const $router = useRouter();

const id = $route.params.id;
const edit = id !== undefined;

const book = ref(null);
const loaded = ref(false);

const onSubmit = async () => {
  const data = {
    name: book.value.name,
    description: book.value.description,
    price: book.value.price,
  };

  if (edit) await userService.updateMyBook(book.value.id, data);
  else await userService.createMyBook(data);

  $router.push("/dashboard");
};

onMounted(async () => {
  if (edit) {
    const data = await userService.getMyBookById(id);

    if (!(data?.id ?? false)) {
      $router.push("/dashboard");
      return;
    }

    book.value = data;
  } else book.value = { name: "", description: "", price: 0 };

  loaded.value = true;
});
</script>
