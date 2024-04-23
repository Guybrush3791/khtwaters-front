<template>
  <q-dialog v-model="data.visible" full-width>
    <q-card>
      <q-card-section>
        <!-- full width image -->
        <q-img :src="data.image" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="delete" color="primary" @click="onDelete" />
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

import resourceService from "@/services/resourceService";

const data = defineModel();
const emits = defineEmits(["update"]);

const onDelete = async () => {
  await resourceService.removeImage(data.value.book, data.value.filename);
  if (data.value.book.cover === data.value.filename) {
    data.value.book.cover = null;
  } else {
    const index = data.value.book.images.indexOf(data.value.filename);
    if (index !== -1) {
      data.value.book.images.splice(index, 1);
    }
  }
  emits("update");
  data.value.visible = false;
};
</script>
