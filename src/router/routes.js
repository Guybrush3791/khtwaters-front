const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "dashboard/book",
        component: () => import("pages/BookEditPage.vue"),
      },
      {
        path: "dashboard/book/:id",
        component: () => import("pages/BookEditPage.vue"),
      },
      {
        path: "dashboard/user-manager",
        component: () => import("pages/UserManagerPage.vue"),
      },
      {
        path: "dashboard/settings",
        component: () => import("pages/SettingsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
