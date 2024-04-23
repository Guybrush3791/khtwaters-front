<template>
  <image-dialog v-model="openImage" :image="openedImage" />
  <q-dialog v-model="openDialog" full-width>
    <q-card>
      <q-card-section class="q-px-none q-pt-none">
        <q-img
          :src="cover"
          class="full-width book-cover"
          @click="onImageClick(cover)"
          :class="{ empty: !cover }"
        >
          <div class="absolute-top text-h6">{{ book.name }}</div>
        </q-img>
      </q-card-section>

      <q-card-section>
        <q-scroll-area style="height: 200px" class="q-px-md">
          <span class="text-justify">{{ book.description }}</span>
        </q-scroll-area>
      </q-card-section>

      <q-card-section>
        <q-scroll-area style="height: 100px">
          <div class="row no-wrap">
            <q-img
              v-for="(image, ind) in book.images"
              :key="ind"
              :src="images[image]"
              class="book-images q-mx-md"
              @click="onImageClick(images[image])"
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
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

import ImageDialog from "src/components/Shared/ImageDialog.vue";

import resourceService from "@/services/resourceService";

const $q = useQuasar();
const emits = defineEmits(["close", "delete"]);

const openDialog = defineModel();

const openImage = ref(false);
const openedImage = ref(null);

const cover = ref(null);
const images = ref({});

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

const onImageClick = (image) => {
  openImage.value = true;
  openedImage.value = image;
};

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

const updateImages = async () => {
  if (props.book?.cover ?? false)
    cover.value = await resourceService.getCover(props.book);
  else cover.value = null;

  if (props.book?.images ?? false)
    images.value = await resourceService.getImages(props.book);
  else images.value = {};
};

watch(() => props.book, updateImages);
onMounted(updateImages);
</script>

<style scoped>
.book-cover {
  height: 12rem;

  &.empty {
    height: 4rem;
  }
}
.book-images {
  height: 100px;
  width: 100px;
}
</style>
