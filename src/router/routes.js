const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'DashBoard',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      { path: '/login', component: () => import('pages/Login.vue') },
      {
        path: '/register-user',
        name: 'RegisterUser',
        component: () => import('pages/RegisterUser.vue'),
      },
      // {
      //   path: '/users',
      //   name: 'Users',
      //   component: () => import('pages/Users.vue'),
      //   children: [
      //     {
      //       path: '/students',
      //       name: 'Students',
      //       component: () => import('pages/Students.vue'),
      //     },
      //     {
      //       path: '/courses',
      //       name: 'Courses',
      //       component: () => import('pages/Courses.vue'),
      //     },
      //   ],
      // },

      {
        path: '/students',
        name: 'Students',
        component: () => import('pages/Students.vue'),
      },
      {
        path: '/courses',
        name: 'Courses',
        component: () => import('pages/Courses.vue'),
      },

      {
        path: '/logs',
        name: 'Logs',
        component: () => import('pages/Logs.vue'),
      },

      {
        path: '/users',
        name: 'Users',
        component: () => import('pages/Users.vue'),
        beforeEnter: (to, from, next) => {
          console.log('users route');
          next();
        },
      },

      {
        path: '/profile/:id?',
        name: 'Profile',
        component: () => import('pages/UserProfile.vue'),
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
