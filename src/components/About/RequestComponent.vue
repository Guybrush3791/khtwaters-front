<template>
  <q-card class="q-ml-lg q-mr-md">
    <div
      v-for="(section, index) in khtwatersSections"
      :key="index"
      class="mb-4"
    >
      <h6 class="q-my-none">{{ section.title }}</h6>
      <ul
        v-for="(item, idx) in section.items"
        :key="idx"
        style="list-style-type: none"
      >
        <li>
          <strong>{{ item.title }}</strong>
          <ul v-if="item.subItems">
            <li v-for="(subItem, sIndex) in item.subItems" :key="sIndex">
              {{ subItem }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </q-card>
</template>

<script setup>
const khtwatersSections = [
  {
    title: "Admin Portal",
    items: [
      {
        title: "User Management",
        subItems: [
          "Admin can add, edit, delete users",
          "Admin can see list of user's favorite books",
        ],
      },
      {
        title: "Books Management",
        subItems: [
          "Add, Edit and delete the books",
          "Book Data should contain following fields: Name, Description, Images (Cover image and others optionally added), Price",
        ],
      },
    ],
  },
  {
    title: "User Side",
    items: [
      {
        title: "Features",
        subItems: [
          "Also accept guests, not only logged in",
          "User can see grid card layout list of all books with book image, title, short description and read more button.",
          "User can search on the site (the search will fetch both titles and descriptions)",
          "By clicking on read more user can see book detail page (logged in user only)",
          "From here user can add or remove book in favorite (logged in user only)",
          "“My favorites” page where user can see all the favs added",
          "Profile Page to update information",
        ],
      },
    ],
  },
  {
    title: "Note",
    items: [
      {
        title: "Details",
        subItems: [
          "Manage user and admin role",
          "Admin and user should have login",
          "Implement register for user",
        ],
      },
    ],
  },
  {
    title: "Tech Stack to use",
    items: [
      {
        title: "Technologies",
        subItems: [
          "Latest Laravel",
          "Tailwind CSS",
          "Daisy UI (optional) [https://daisyui.com/](https://daisyui.com/)",
          "Vue.JS",
          "Front/User portal you can make using your choice any from blade, livewire or Vue",
        ],
      },
    ],
  },
];
</script>
