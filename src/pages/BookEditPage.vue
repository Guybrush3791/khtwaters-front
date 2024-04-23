<template>
  <q-page v-if="loaded">
    <h4 class="text-center text-h4">Book {{ edit ? "editor" : "creator" }}</h4>
    <q-card class="q-mx-md q-mt-xl" flat>
      <q-form @submit.prevent="onSubmit">
        <div :disabled="edit !== true ? true : null">
          <q-tooltip v-if="edit !== true ? true : null">
            To enable image upload create book first
          </q-tooltip>
          <q-img
            v-if="cover"
            class="book-cover"
            :src="cover"
            @click="onImageEdit(book, book.cover, cover)"
          />
          <q-file
            v-else
            v-model="coverFile"
            label="Cover"
            class="q-mb-md"
            dense
            :disable="edit !== true"
            accept="image/*"
            max-file-size="2048000"
            @rejected="onRejected"
            @update:model-value="onCoverUpload"
          />
        </div>
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
        <div :disabled="edit !== true ? true : null">
          <q-tooltip v-if="edit !== true ? true : null">
            To enable image upload create book first
          </q-tooltip>
          <q-scroll-area v-if="edit" style="height: 100px">
            <div class="row no-wrap">
              <q-img
                v-for="(image, ind) in book.images"
                :key="ind"
                :src="images[image]"
                class="book-images q-mx-md"
                @click="onImageEdit(book, image, images[image])"
              />
            </div>
          </q-scroll-area>

          <q-file
            ref="qImageFile"
            v-model="imageFiles"
            label="Cover"
            class="q-mb-md"
            dense
            accept="image/*"
            max-file-size="2048000"
            @rejected="onRejected"
            @update:model-value="onImageUpload"
            style="display: none"
          />
          <q-btn
            flat
            label="Add picture"
            icon="add"
            :disable="edit !== true"
            class="q-my-lg bg-grey-5 full-width"
            @click="() => $refs.qImageFile.pickFiles()"
          />
        </div>
        <q-card-actions align="right" class="">
          <q-btn flat label="Cancel" @click="onCancel" />
          <q-btn
            flat
            :label="edit ? 'Save' : 'Create'"
            class="text-primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
    <image-edit-dialog v-model="showImageDialog" @update="updateImages" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

import ImageEditDialog from "@/components/Book/ImageEditDialog.vue";

import loginService from "@/services/loginService";
import userService from "@/services/userService";
import resourceService from "@/services/resourceService";

const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();

const id = $route.params.id;
const edit = id !== undefined;

const qImageFile = ref();

const book = ref(null);
const loaded = ref(false);

const cover = ref(null);
const images = ref({});

const showImageDialog = ref({ visible: false, image: null, book: null });

const coverFile = ref(null);
const imageFiles = ref(null);

const onImageEdit = (book, filename, image) => {
  showImageDialog.value = { visible: true, filename, image, book };
};

const onCancel = () => $router.go(-1);
const onSubmit = async () => {
  const data = {
    name: book.value.name,
    description: book.value.description,
    price: book.value.price,
  };

  if (edit) {
    await userService.updateMyBook(book.value.id, data);
    $router.push("/dashboard");
  } else {
    const newBook = await userService.createMyBook(data);
    window.location = `/dashboard/book/${newBook.id}`;
  }
};
const onCoverUpload = async (file) => {
  if (coverFile.value) {
    const res = await resourceService.uploadImage(book.value, "cover", file);

    if (res === true) {
      cover.value = URL.createObjectURL(coverFile.value);
    }

    coverFile.value = null;
  }
};
const onImageUpload = async (file) => {
  if (imageFiles.value) {
    const res = await resourceService.uploadImage(book.value, "image", file);

    if (res === true) {
      // add URL.createObjectURL(imageFiles.value) to images
      images.value = {
        ...images.value,
        [imageFiles.value.name]: URL.createObjectURL(imageFiles.value),
      };
      if (book.value.images === null) book.value.images = [];
      book.value.images.push(imageFiles.value.name);
    }

    imageFiles.value = null;
  }
};
const updateImages = async () => {
  cover.value = await resourceService.getCover(book.value);
  images.value = await resourceService.getImages(book.value);
};

const onRejected = (rejectedEntries) => {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
};
onMounted(async () => {
  try {
    const user = await loginService.getMe();

    if (user === false) throw new Error("Not logged in");
  } catch (error) {
    $router.push("/");
  }

  if (edit) {
    const data = await userService.getMyBookById(id);

    if (!(data?.id ?? false)) {
      $router.push("/dashboard");
      return;
    }

    book.value = data;

    updateImages();
  } else book.value = { name: "", description: "", price: 0 };

  loaded.value = true;
});
</script>

<style scoped>
.book-cover {
  max-height: 150px;
}
.book-images {
  height: 100px;
  width: 100px;
}
</style>
