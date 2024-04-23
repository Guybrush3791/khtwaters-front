<template>
  <div class="q-pa-md">
    <div class="q-mb-lg">
      <div v-for="(item, index) in introduction" :key="index">
        <h4>{{ item.title }}</h4>
        <p v-for="(text, idx) in item.contents" :key="idx">
          <strong v-if="text.bold">{{ text.bold }}:</strong> {{ text.text }}
        </p>
        <ul v-for="(list, lidx) in item.lists" :key="lidx">
          <li v-if="list.simple">{{ list.simple }}</li>
          <li v-else>
            {{ list.title }}
            <ul>
              <li v-for="(subItem, subIndex) in list.subItems" :key="subIndex">
                {{ subItem }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h5>Back-end Structure</h5>
      <q-card flat bordered class="q-mb-md">
        <tree-view :nodes="backendStructure" />
      </q-card>
    </div>

    <div>
      <h5>Front-end Structure</h5>
      <q-card flat bordered>
        <tree-view :nodes="frontendStructure" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import TreeView from "@/components/About/TreeView.vue";

const introduction = [
  {
    title: "Stack",
    contents: [
      { bold: "Framework Back-end", text: "Laravel 9.2" },
      { bold: "Login (db)", text: "Laravel Auth" },
      { bold: "Login auth (JWT)", text: "tymon/jwt-auth" },
      { bold: "Role", text: "Spatie" },
    ],
  },
  {
    title: "Structure",
    lists: [
      {
        simple:
          "The relation between User and Books seems not clear, I will assume this is called 'favorites' (or similar).",
      },
      {
        simple:
          "The books are not cross-user favorable (aka each book has exactly one owner).",
      },
      {
        title: "Guests can see book from everyone",
        subItems: [
          "What guest user can and can't do is not clear, so I chose to make all books and relative information (images included) are available in read-only mode.",
          "Logged users can access to write/create/delete functions.",
          "Admin users can additionally manage users details and permissions.",
        ],
      },
      {
        simple:
          "Auth logic is not defined, so the simplest way was chosen (pure jwt restless token).",
      },
    ],
  },
];

const backendStructure = [
  {
    label: "ROOT",
    children: [
      {
        label: "GUEST",
        children: [{ label: "GET /books - Retrieves a list of all books" }],
      },
      {
        label: "RESOURCES (read-only; open)",
        children: [
          { label: "GET /res/image/{path} - Retrieves an image by its path" },
        ],
      },
      {
        label: "AUTH",
        children: [
          {
            label:
              "POST /login - Authenticates a user and returns an JWT access token.",
          },
          {
            label:
              "POST /register - Registers a new user and returns an access token.",
          },
        ],
      },
      {
        label: "LOGGED USER (requires authentication)",
        children: [
          {
            label: 'ADMIN ONLY (requires "admin" role)',
            children: [
              {
                label:
                  "GET /admin/users - Retrieves a list of all users (admin view).",
              },
              {
                label: "POST /admin/users - Adds a new user (admin function).",
              },
              {
                label:
                  "PUT /admin/users/{id} - Updates an existing user's details (admin function).",
              },
              {
                label:
                  "DELETE /admin/users/{id} - Deletes a user (admin function).",
              },
            ],
          },
          {
            label: "USER (applies to all logged-in users, admin included)",
            children: [
              {
                label:
                  "GET /user/me - Retrieves the logged-in user's profile information.",
              },
              {
                label:
                  "PUT /user/update - Updates the logged-in user's profile information.",
              },
              {
                label:
                  "GET /user/is-admin - Checks if the logged-in user is admin",
              },
            ],
          },
          {
            label: "BOOK MANAGEMENT",
            children: [
              {
                label:
                  "GET /user/books - Retrieves all books associated with the user.",
              },
              {
                label:
                  "GET /user/books/{id} - Retrieves details of a specific book owned by the user.",
              },
              {
                label:
                  "POST /user/books - Adds a new book to the user's collection.",
              },
              {
                label:
                  "PUT /user/books/{id} - Updates details of a specific book in the user's collection.",
              },
              {
                label:
                  "DELETE /user/books/{id} - Deletes a specific book from the user's collection.",
              },
            ],
          },
        ],
      },
    ],
  },
];

const frontendStructure = [
  {
    label: "ROOT",
    children: [
      {
        label: 'Main Layout ("/")',
        children: [
          {
            label: 'Index ("/") - Landing page of the website with all books.',
          },
          {
            label: 'Dashboard ("/dashboard")',
            children: [
              {
                label:
                  'Book Management ("/dashboard/book") - Page to create new books.',
              },
              {
                label:
                  'Edit Book ("/dashboard/book/:id") - Page to edit an existing book (book ID required; book must be owned).',
              },
              {
                label:
                  'User Management ("/dashboard/user-manager") - Page for managing users (admin only).',
              },
              {
                label:
                  'Settings ("/dashboard/settings") - Page for all users (admin included) to edit logged user details.',
              },
            ],
          },
          { label: 'About ("/about") - This page.' },
        ],
      },
      {
        label: "Error Handling",
        children: [
          {
            label:
              'Catch-All Route ("/:catchAll(.*)*") - Page displayed for any undefined routes; typically shows a 404 Not Found error.',
          },
        ],
      },
    ],
  },
];
</script>

<style scoped></style>
