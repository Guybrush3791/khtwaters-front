<template>
  <q-layout view="lhh Lpr lFf">
    <header-component
      @toggleLeftDrawer="toggleLeftDrawer"
      @toggleLoginDialog="toggleLoginDialog"
    />
    <main-drawer
      v-model="leftDrawerOpen"
      @toggleLoginDialog="toggleLoginDialog"
      @toggleRegisterDialog="toggleRegisterDialog"
    />
    <login-dialog v-model="loginDialogOpen" :register="loginRegisterActive" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import HeaderComponent from "src/components/Shared/HeaderComponent.vue";
import MainDrawer from "src/components/Shared/MainDrawer.vue";
import LoginDialog from "src/components/Login/LoginDialog.vue";

const leftDrawerOpen = ref(false);
const loginDialogOpen = ref(false);
const loginRegisterActive = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const toggleLoginDialog = () => {
  loginDialogOpen.value = {
    value: true,
    type: "login",
  };
};
const toggleRegisterDialog = () => {
  loginDialogOpen.value = {
    value: true,
    type: "register",
  };
};
</script>
