const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      { path: '/login', component: () => import('pages/Login.vue') },
      {
        path: '/register-user',
        component: () => import('pages/RegisterUser.vue'),
      },
      {
        path: '/students',
        name: 'Students',
        component: () => import('pages/Students.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
