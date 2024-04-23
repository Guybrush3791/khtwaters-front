<template>
  <image-dialog
    v-model="openImage"
    image="https://cdn.quasar.dev/img/parallax2.jpg"
  />
  <q-dialog v-model="openDialog" full-width>
    <q-card>
      <q-card-section class="q-px-none q-pt-none">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          class="full-width book-cover"
        >
          <div class="absolute-top text-h6">{{ book.name }}</div>
        </q-img>
      </q-card-section>

      <q-card-section>
        <q-scroll-area style="height: 200px; max-width: 300px" class="q-px-md">
          <span class="text-justify">{{ book.description }}</span>
        </q-scroll-area>
      </q-card-section>

      <q-card-section>
        <q-scroll-area style="height: 100px; max-width: 300px">
          <div class="row no-wrap">
            <q-img
              v-for="(image, ind) in book.images"
              :key="ind"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="book-images q-mx-md"
              @click="openImage = true"
            />
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="text-right">
        <q-chip size="lg" class="q-mr-sm bg-primary text-white"
          ><span class="q-mr-xs">Price:</span><span>{{ book.price }}€</span>
        </q-chip>
      </q-card-section>

      <q-card-actions align="right" class="bg-secondary text-white">
        <q-btn
          v-if="edit"
          flat
          label="EDIT"
          v-close-popup
          :to="`/dashboard/book/${book.id}`"
        />
        <q-btn
          v-if="edit"
          flat
          label="Delete"
          v-close-popup
          @click="onDelete(book.id)"
        />
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

import ImageDialog from "src/components/Shared/ImageDialog.vue";

const $q = useQuasar();
const emits = defineEmits(["close", "delete"]);

const openDialog = defineModel();

const openImage = ref(false);

const props = defineProps({
  book: {
    type: Object,
    required: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

const onDelete = (id) => {
  $q.dialog({
    title: "Delete",
    message: "Are you sure you want to delete this book?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    emits("delete", id);
  });
};
</script>

<style scoped>
.book-cover {
  height: 150px;
}
.book-images {
  height: 100px;
  width: 100px;
}
</style>
