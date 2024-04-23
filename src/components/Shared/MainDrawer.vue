<template>
  <q-drawer v-model="openDrawer" show-if-above bordered>
    <q-toolbar class="bg-primary text-white text-center">
      <q-toolbar-title class="text-h5"> KHT </q-toolbar-title>
    </q-toolbar>
    <q-list>
      <div
        v-for="(entry, index) in entries.filter((entry) => !entry.invisible)"
        :key="index"
      >
        <q-item
          v-if="entry?.visible ?? true"
          clickable
          v-ripple
          @click="onClick(entry)"
          :disabled="entry.disabled"
          :class="
            (entry?.link ?? false) && $route.path === entry.link
              ? 'bg-secondary'
              : ''
          "
        >
          <q-item-section side top>
            <q-icon :name="entry.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ entry.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="entry?.separator ?? false" />
      </div>
    </q-list>

    <div class="bg-grey-9 text-center">
      <q-btn class="q-my-xs text-white" flat dense @click="gotToMethodWolf">
        <span class="text-body2"> Powered by </span>
        <q-img src="~/assets/icons/wolfcode.svg" alt="Logo" width="6rem" />
      </q-btn>
    </div>
  </q-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

import loginService from "src/services/loginService";

const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();

const emits = defineEmits(["toggleLoginDialog", "toggleRegisterDialog"]);

const openDrawer = ref(false);
const loggedIn = ref(false);
const isAdmin = ref(false);

const entries = ref([]);

const gotToMethodWolf = () => {
  window.open("https://methodwolf.com/", "_blank");
};
const onClick = (entry) => {
  if (entry?.link ?? false) $router.push(entry.link);
  if (entry?.action ?? false) entry.action();
};

const onLogin = () => {
  emits("toggleLoginDialog");
};
const onLogout = () => {
  $q.dialog({
    title: "Logout",
    message: "Are you sure you want to logout?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    loginService.logout();
    loggedIn.value = false;
    buildEntries();
    $router.push("/");
  });
};
const onRegister = () => {
  emits("toggleRegisterDialog");
};
const buildEntries = () => {
  entries.value = [
    {
      icon: "home",
      label: "Home",
      link: "/",
    },
    {
      icon: "dashboard",
      label: "Dashboard",
      link: "/dashboard",
      invisible: !loggedIn.value,
    },
    {
      icon: "login",
      label: "Login",
      action: onLogin,
      invisible: loggedIn.value,
    },
    {
      icon: "logout",
      label: "Logout",
      separator: true,
      action: onLogout,
      invisible: !loggedIn.value,
    },
    {
      icon: "app_registration",
      label: "Register",
      separator: true,
      action: onRegister,
      invisible: loggedIn.value,
    },
    {
      icon: "group",
      label: "User manager",
      link: "/dashboard/user-manager",
      invisible: !loggedIn.value || !isAdmin.value,
    },
    {
      icon: "settings",
      label: "Settings",
      link: "/dashboard/settings",
      invisible: !loggedIn.value,
    },
  ];
};
onMounted(async () => {
  const me = await loginService.getMe();
  loggedIn.value = !!me;

  isAdmin.value = await loginService.isAdmin();

  buildEntries();
});
</script>
