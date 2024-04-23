<template>
  <q-card class="my-card" @click="onClick">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="absolute-bottom text-h6">{{ book.name }}</div>
    </q-img>
  </q-card>
</template>

<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const onClick = () => {
  emit("click");
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
