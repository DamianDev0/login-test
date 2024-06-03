import { routes } from "./routes";
import { PrivateNavBar } from "./components/private-layout.component";

export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find((route) => route.path === path);
  const privateRoute = routes.private.find((route) => route.path === path);

  if(path === '/login' || path === '/register'){
    if(localStorage.getItem('token')){
      navigateTo('/tasks')
      return
    }
  }

  if (publicRoute) {
    publicRoute.component();
    return;
  }
  if (privateRoute) {
    if(!localStorage.getItem('token')){
      navigateTo('/login')
      return
    }
    const {$content,logic} = privateRoute.component();
    PrivateNavBar($content,logic)
    return
  }

  navigateTo('/not-found')
}

export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
