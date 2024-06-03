// app/routes.js

import { About } from './scenes/public/about';
import { NotFound } from './scenes/not-found';
import { HomeScene } from './scenes/public/home/home.page';
import { Register } from './scenes/public/register';
import { Login } from './scenes/public/login';
import { Tasks } from './scenes/private/tasks';
import { UsersPage } from './scenes/private/users';
import { TasksEdit } from './scenes/private/tasks/tasks.edit';




export const routes = {
  public: [
    { path: '/', component: HomeScene },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/not-found', component: NotFound },
  ],
  private: [
    {path: '/tasks', component: Tasks},
    {path: '/users', component: UsersPage},
    {path: '/tasks/edit', component: TasksEdit},

  ]
};
