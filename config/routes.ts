export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { name: '账号管理', icon: 'user', path: '/admin', component: './admin' },
  { name: '角色管理', path: '/role', component: './role' },
  { name: '菜单管理', icon: 'menu', path: '/menu', component: './menu' },
  { name: '权限控制', path: '/permission', component: './permission' },
  { name: '部门管理', path: '/department', component: './department' },
  { name: '日志管理', path: '/optLog', component: './optLog' },
  { name: '登录日志管理', path: '/loginLog', component: './loginLog' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
