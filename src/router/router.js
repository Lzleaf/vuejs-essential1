export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/users/1/edit',
    component: () => import('@/views/users/Edit'),
    children: [
      {
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile'),
        meta: { auth: true }
      },
      {
        path: '/users/1/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar'),
        meta: { auth: true }
      },
      {
        path: '/users/1/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  {
    path: '/articles/:articleId/content',
    name: 'Content',
    component: () => import('@/views/articles/Content')
  },
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  }
]
