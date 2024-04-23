<template>
  <q-page>
    <h4 class="text-center">Settings</h4>
    <q-card class="q-ma-md" flat>
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="me.name"
            label="Name"
            dense
            outlined
            clearable
            lazy-rules
            :rules="[(val) => !!val || 'Required']"
          />
          <q-input
            v-model="me.email"
            label="Email"
            dense
            outlined
            clearable
            lazy-rules
            :rules="[
              (val) => !!val || 'Required',
              (val) => /.+@.+\..+/.test(val) || 'Invalid email',
            ]"
          />
          <q-input
            v-model="me.password"
            label="Password"
            dense
            outlined
            clearable
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
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
          <q-chip
            v-if="loginSuccess"
            class="text- bg-positive text-white"
            label="Updated"
          />
          <q-card-actions class="justify-end">
            <q-btn
              flat
              label="Cancel"
              type="submit"
              @click="$router.push('/dashboard')"
            />
            <q-btn flat label="Update" class="text-primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import loginService from "src/services/loginService";

const $router = useRouter();

const me = ref({
  name: "",
  email: "",
  password: "",
});
const isPwd = ref(true);
const loginError = ref(false);
const loginSuccess = ref(false);

const onSubmit = async () => {
  loginError.value = false;
  loginSuccess.value = false;

  const res = await loginService.update(
    me.value.name,
    me.value.email,
    me.value.password
  );

  if (res === true) loginSuccess.value = true;
  else loginError.value = true;

  me.value.password = "";
};

onMounted(async () => {
  try {
    me.value = await loginService.getMe();

    if (me.value === false) throw new Error("Not logged in");
  } catch (error) {
    $router.push("/");
  }
});
</script>
