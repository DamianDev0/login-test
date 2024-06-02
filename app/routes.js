// app/routes.js

import { About } from './scenes/public/about';
import { NotFound } from './scenes/not-found';
import { HomeScene } from './scenes/public/home/home.page';
import { Register } from './scenes/public/register';
import { Login } from './scenes/public/login';

export const routes = {
  public: [
    { path: '/', component: HomeScene },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/not-found', component: NotFound },
  ],
  private: []
};
