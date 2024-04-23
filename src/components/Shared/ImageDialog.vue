<template>
  <q-dialog v-model="openDialog" full-width>
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" class="full-width">
    </q-img>
  </q-dialog>
</template>

<script setup>
const openDialog = defineModel();

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>
