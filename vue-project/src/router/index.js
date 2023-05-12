import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue"
import store from '../store/index'
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "create",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CreateView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProjectsView.vue"),
    },
    {
      path: "/archive",
      name: "archive",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ArchiveView.vue"),
    },
    {
      path: "/update/:id",
      name: "update",
      component: () => import("../views/UpdateView.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/auth/RegisterView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Handle login
  let isAuth = store.getters.auth;

  // Reloading the app
  if(isAuth === null){
    startUpRedirect(to, next);
  }else{
    redirect(to, isAuth, next);
  }
  
})

function isGuestRoute(to){
  return ( to.name === 'Login' || to.name === 'Register' );
}

function redirect(to, isAuth, next){
  if( isGuestRoute(to) && isAuth){
    next({name: 'home'});
  }
  else if( !isGuestRoute(to) && !isAuth ){
    next({name: 'Login'})
  }
  else next();
}

async function startUpRedirect(to, next){
  await axios.get('http://localhost:4000/api/user')
    .then(res => {
        if(res.status === 200){
          const user = res.data;
          store.dispatch('login', user);
          redirect(to, true, next)
        }
    })
    .catch(err => {
      if(err.response.status === 401){
        store.dispatch('logout');
        redirect(to, false, next)
      }
      else{
        console.log(err);
      }
    })
}


export default router;
