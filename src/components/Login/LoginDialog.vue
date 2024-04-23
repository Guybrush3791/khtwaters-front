<template>
  <q-dialog v-model="openDialog.value" full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form
          v-if="openDialog.type === 'register'"
          @submit.prevent="onSubmit"
        >
          <q-input v-model="data.name" label="Name" class="q-mb-md" dense />
          <q-input v-model="data.email" label="E-Mail" class="q-mb-md" dense />
          <q-input
            v-model="data.password"
            label="Password"
            class="q-mb-md"
            :type="isPwd ? 'password' : 'text'"
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-chip
            v-if="loginError"
            class="text- bg-negative text-white"
            label="Wrong data or user already exists"
          />
          <q-card-actions align="right" class="">
            <q-btn flat label="Cancel" @click="onToggleRegister" />
            <q-btn flat label="Register" class="text-primary" type="submit" />
          </q-card-actions>
        </q-form>
        <q-form v-else @submit.prevent="onSubmit">
          <q-input v-model="data.email" label="E-Mail" class="q-mb-md" dense />
          <q-input
            v-model="data.password"
            label="Password"
            class="q-mb-md"
            :type="isPwd ? 'password' : 'text'"
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-chip
            v-if="loginError"
            class="text- bg-negative text-white"
            label="Wrong password or username"
          />
          <q-card-actions align="right" class="">
            <q-btn flat label="Register" @click="onToggleRegister" />
            <q-btn flat label="Login" class="text-primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import loginService from "@/services/loginService";

const $router = useRouter();

const openDialog = defineModel();
watch(openDialog, (val) => {
  if (val) return;

  data.value = {
    name: "",
    email: "",
    password: "",
  };
  isPwd.value = true;
  loginError.value = false;
  registering.value = props.register;
});

const data = ref({
  name: "",
  user: "",
  password: "",
});

const isPwd = ref(true);
const loginError = ref(false);

const onToggleRegister = () => {
  openDialog.value.type =
    openDialog.value.type === "login" ? "register" : "login";
};
const onSubmit = async () => {
  let res = false;
  if (openDialog.value.type === "register") {
    res = await loginService.register(
      data.value.name,
      data.value.email,
      data.value.password
    );
  } else res = await loginService.login(data.value.email, data.value.password);

  if (res) window.location = "/dashboard";
  else loginError.value = true;
};

// DEBUG
data.value = {
  name: "Guybrush",
  email: "guybrush@mail.com",
  password: "pws",
};
</script>
