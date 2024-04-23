<template>
  <q-layout view="lhh Lpr lff">
    <header-component
      @toggleLeftDrawer="toggleLeftDrawer"
      @toggleLoginDialog="toggleLoginDialog"
    />
    <footer-component />
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

import HeaderComponent from "@/components/Shared/HeaderComponent.vue";
import FooterComponent from "@/components/Shared/FooterComponent.vue";
import MainDrawer from "@/components/Shared/MainDrawer.vue";
import LoginDialog from "@/components/Login/LoginDialog.vue";

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
