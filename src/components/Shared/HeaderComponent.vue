<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> LibraLux </q-toolbar-title>

      <q-img src="~/assets/icons/libra-luxe.png" alt="Login" width="24px" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
const emits = defineEmits(["toggleLeftDrawer", "toggleLoginDialog"]);

const toggleLeftDrawer = () => {
  emits("toggleLeftDrawer");
};
const toggleLoginDialog = () => {
  emits("toggleLoginDialog");
};
</script>
