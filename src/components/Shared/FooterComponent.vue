<template>
  <q-footer class="text-center bg-dark">
    <q-img
      src="~/assets/icons/wolfcode.svg"
      alt="Logo"
      width="10rem"
      class="q-mt-md"
    />
    <div class="text-caption q-py-lg">© {{ year }} - All Rights Reserved</div>
  </q-footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
