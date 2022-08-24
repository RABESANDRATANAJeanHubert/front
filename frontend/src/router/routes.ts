import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/LoginPage.vue'),
      },

      {
        path: '/menu',
        component: () => import('pages/MenuPage.vue'),
      },
      {
        path: '/three',
        component: () => import('pages/ThreePage.vue'),
      },
      {
        path: '/users',
        component: () => import('pages/UsersPage.vue'),
      },
      {
        path: '/lifecycle',
        component: () => import('pages/LifeCyclePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
