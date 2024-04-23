<template>
  <q-dialog v-model="openDialog" full-width>
    <q-img :src="image" class="full-width" @click="openDialog = false" />
  </q-dialog>
</template>

<script setup>
const openDialog = defineModel();

const props = defineProps({
  image: {
    required: true,
  },
});
</script>
