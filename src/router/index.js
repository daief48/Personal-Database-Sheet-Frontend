import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
      path: "/",
      name: "loginPage",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/Register.vue"),
    },
    {
      path: "/verify-otp",
      name: "VerifyOtp",
      component: () => import("../components/VerifyOtp.vue"),
    },
    {
      path: "/request-under-processing",
      name: "RequestUnderProcessing",
      component: () => import("../components/RequestUnderProcessing.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('../components/User/Profile.vue'),
        }
      ]
    },
    {
      path: '/dashboard',
      name:'Dashboard',
      component: () => import('../Layout/Dashboardlayout.vue'),
      children:[
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('../components/Dashboard.vue'),
        }
      ]
    },

    {
      path: '/users',
      name: 'users',
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/users',
          name: 'users',
          component: () => import('../components/User/User.vue'),
        }
      ]
    }, 

    {
      path: '/contact-messages',
      name: 'Contact Message',
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/contact-messages',
          name: 'Contact Message',
          component: () => import('../components/ContactMessage/ContactMessage.vue'),
        }
      ]
    },

    {
      path: '/document',
      name: 'Document',
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/document',
          name: 'Document',
          component: () => import('../components/Document/Document.vue'),
        }
      ]
    },

    { 
      path: '/:pathMatch(.*)*', 
      component: () => import('../components/404.vue'),
    },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  
});

router.afterEach((to,from, next) => { 
  
  window.scrollTo({
     top: 0,
     left: 0,
     behavior: 'smooth'
   });
   next();
 })

router.beforeEach((to, from, next) => {

  const publicPages = ['/', '/login', '/register', '/verify-otp', '/request-under-processing'];
  const authRequired = !publicPages.includes(to.path);


  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    next({
      path: '/login',
      replace: true
    });
  } else {
    next();
  }
});


export default router;
