<template>
  <q-card class="my-card" @click="onClick">
    <q-img v-if="cover == null" :src="defaultCover">
      <div class="absolute-bottom text-h6">{{ book.name }}</div>
    </q-img>
    <q-img v-else :src="cover" style="height: 100%">
      <div class="absolute-bottom text-h6">{{ book.name }}</div>
    </q-img>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import defaultCover from "@/assets/images/default-cover.webp";

import resourceService from "@/services/resourceService";

const emit = defineEmits(["click"]);
const cover = ref(null);

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const onClick = () => {
  emit("click");
};

onMounted(async () => {
  try {
    if (props.book.cover)
      cover.value = await resourceService.getCover(props.book);
  } catch (e) {}
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
