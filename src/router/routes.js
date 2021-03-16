import store from '../store';

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
      { path: 'login', component: () => import('pages/Login.vue') },

      //Register User
      {
        path: 'register-user/:id?',
        name: 'RegisterUser',
        component: () => import('pages/RegisterUser.vue'),
        meta: {
          requiresAuth: true,
        },

        beforeEnter(to, from, next) {
          const updatePermission = '4';
          const createPermission = '3';

          const user = store.getters['userStore/getUserDetails'];
          console.log(to);
          console.log(user.permission);
          console.log(user.permission.includes(createPermission));
          if (to.params.id && user.permission.includes(updatePermission)) {
            next();
          } else if (
            !to.params.id &&
            user.permission.includes(createPermission)
          ) {
            console.log('no id');
            next();
          } else {
            console.log(from);
            next(from.path);
          }
        },
      },

      //Students subroute
      {
        path: 'students/',
        name: 'Students',
        component: () => import('pages/StudentsRoute.vue'),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: 'courses',
            name: 'Courses',
            component: () => import('pages/Courses.vue'),
            meta: {
              requiresAuth: true,
            },

            beforeEnter(to, from, next) {
              const readPermission = '7';
              // const createPermission = '3';

              const user = store.getters['userStore/getUserDetails'];
              console.log(to);
              console.log(user.permission);
              console.log(user.permission.includes(readPermission));
              if (user.permission.includes(readPermission)) {
                next();
              }
              // else if (
              //   !to.params.id &&
              //   user.permission.includes(createPermission)
              // ) {
              //   console.log('no id');
              //   next();
              // }
              else {
                console.log(from);
                next(from.path);
              }
            },
          },

          {
            path: 'batches',
            name: 'Batches',
            component: () => import('pages/Batches.vue'),

            meta: {
              requiresAuth: true,
            },

            beforeEnter(to, from, next) {
              const readPermission = '11';
              // const createPermission = '3';

              const user = store.getters['userStore/getUserDetails'];
              // console.log(to);
              // console.log(user.permission);
              // console.log(user.permission.includes(readPermission));
              if (user.permission.includes(readPermission)) {
                next();
              }
              // else if (
              //   !to.params.id &&
              //   user.permission.includes(createPermission)
              // ) {
              //   console.log('no id');
              //   next();
              // }
              else {
                // console.log(from);
                next(from.path);
              }
            },
          },

          {
            path: 'batch/:id',
            name: 'BatchDetails',
            component: () => import('pages/BatchDetails.vue'),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: 'register/:batchId/:courseId',
            name: 'RegisterStudent',
            component: () => import('pages/RegisterStudent.vue'),
            meta: {
              requiresAuth: true,
            },

            beforeEnter(to, from, next) {
              const createPermission = '21';
              // const createPermission = '3';

              const user = store.getters['userStore/getUserDetails'];
              // console.log(to);
              // console.log(user.permission);
              // console.log(user.permission.includes(readPermission));
              if (user.permission.includes(createPermission)) {
                next();
              }
              // else if (
              //   !to.params.id &&
              //   user.permission.includes(createPermission)
              // ) {
              //   console.log('no id');
              //   next();
              // }
              else {
                // console.log(from);
                next(from.path);
              }
            },
          },

          {
            path: 'upload-marks/:batchId/:courseId',
            name: 'UploadMarks',
            component: () => import('pages/UploadMarks.vue'),
            meta: {
              requiresAuth: true,
            },

            beforeEnter(to, from, next) {
              const createPermission = '21';
              // const createPermission = '3';

              const user = store.getters['userStore/getUserDetails'];
              // console.log(to);
              // console.log(user.permission);
              // console.log(user.permission.includes(readPermission));
              if (user.permission.includes(createPermission)) {
                next();
              }
              // else if (
              //   !to.params.id &&
              //   user.permission.includes(createPermission)
              // ) {
              //   console.log('no id');
              //   next();
              // }
              else {
                // console.log(from);
                next(from.path);
              }
            },
          },

          {
            path: 'student-profile/:id?',
            name: 'StudentProfile',
            component: () => import('pages/StudentProfile.vue'),
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },

      {
        path: 'certificate',
        name: 'Certificate',
        component: () => import('pages/CertificateHome.vue'),
      },

      {
        path: 'coc1/:studentId',
        name: 'CertificateOfCompletion1',
        component: () => import('pages/Certificate1.vue'),
        meta: {
          noHeader: true,
        },
      },

      {
        path: 'coc2/:studentId',
        name: 'CertificateOfCompletion2',
        component: () => import('pages/Certificate2.vue'),
        meta: {
          noHeader: true,
        },
      },

      {
        path: 'report-card',
        name: 'ReportCard',
        component: () => import('pages/ReportCard.vue'),
        meta: {
          noHeader: true,
        },
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

      // {
      //   path: '/students',
      //   name: 'Students',
      //   component: () => import('pages/Students.vue'),
      // },
      // {
      //   path: '/courses',
      //   name: 'Courses',
      //   component: () => import('pages/Courses.vue'),
      // },

      // {
      //   path: '/batches',
      //   name: 'Batches',
      //   component: () => import('pages/Batches.vue'),
      // },

      //Logs all
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('pages/Logs.vue'),
        meta: {
          requiresAuth: true,
        },
      },

      //Users Admins
      {
        path: 'users',
        name: 'Users',
        component: () => import('pages/Users.vue'),
        meta: {
          requiresAuth: true,
        },

        beforeEnter: (to, from, next) => {
          const readPermission = '1';
          // const createPermission = '3';

          const user = store.getters['userStore/getUserDetails'];
          // console.log(to);
          // console.log(user.permission);
          // console.log(user.permission.includes(readPermission));
          if (user.permission.includes(readPermission)) {
            next();
          }
          // else if (
          //   !to.params.id &&
          //   user.permission.includes(createPermission)
          // ) {
          //   console.log('no id');
          //   next();
          // }
          else {
            // console.log(from);
            next(from.path);
          }
        },
      },

      //Profile user
      {
        path: 'profile/:id?',
        name: 'Profile',
        component: () => import('pages/UserProfile.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // {
  //   path: '/students',
  //   name: 'Students',
  //   component: () => import('layouts/StudentsLayout.vue'),
  //   children: [
  //     {
  //       path: 'courses',
  //       name: 'Courses',
  //       component: () => import('pages/Courses.vue'),
  //     },

  //     {
  //       path: 'batches',
  //       name: 'Batches',
  //       component: () => import('pages/Batches.vue'),
  //     },

  //     {
  //       path: 'batch/:id',
  //       name: 'BatchDetails',
  //       component: () => import('pages/BatchDetails.vue'),
  //     },

  //     {
  //       path: 'register/:batchId/:courseId',
  //       name: 'RegisterStudent',
  //       component: () => import('pages/RegisterStudent.vue'),
  //     },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
