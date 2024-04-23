<template>
  <q-page>
    <q-card flat>
      <h4 class="text-center">User Manager</h4>
      <q-list class="q-mx-xl q-gutter-y-md">
        <q-item
          v-for="user in users"
          :key="user.id"
          class="bg-grey-5"
          clickable
          v-ripple
          @click="onUserClick(user)"
        >
          <q-item-section>{{ user.name }}</q-item-section>
          <q-item-section avatar>
            <q-chip v-if="user.isAdmin" label="Admin" dark />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <!-- user edit dialog -->
    <q-dialog v-model="showEditDialog">
      <q-card>
        <q-card-section>
          <h6 class="q-my-none">Edit User</h6>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit">
            <q-input
              v-model="selectedUser.name"
              label="Name"
              dense
              outlined
              clearable
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
            <q-input
              v-model="selectedUser.email"
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
              v-model="selectedUser.password"
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
            <q-checkbox
              v-model="selectedUser.isAdmin"
              label="Admin"
              color="primary"
            />

            <q-card-actions class="justify-end">
              <q-btn flat label="Cancel" @click="showEditDialog = false" />
              <q-btn flat label="Update" class="text-primary" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

import _ from "lodash";

import adminService from "src/services/adminService";
import loginService from "src/services/loginService";

const me = ref(null);
const users = ref([]);
const selectedUser = ref(null);
const showEditDialog = ref(false);
const isPwd = ref(true);

const isAdmin = (user) => {
  return user.roles.filter((role) => role.name === "admin").length > 0;
};

const onUserClick = (user) => {
  selectedUser.value = _.cloneDeep(user);
  showEditDialog.value = true;
};
const onSubmit = async () => {
  const res = await adminService.updateUser(
    selectedUser.value.id,
    selectedUser.value.name,
    selectedUser.value.email,
    selectedUser.value.password,
    selectedUser.value.isAdmin
  );

  loadUsers();
  showEditDialog.value = false;
};

const loadUsers = async () => {
  users.value = await adminService.getUsers();
  users.value = users.value
    .map((user) => {
      user.isAdmin = isAdmin(user);
      return user;
    })
    .filter((user) => user.id !== me.value.id);
};

onMounted(async () => {
  me.value = await loginService.getMe();
  loadUsers();
});
</script>
