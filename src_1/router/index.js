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
      path: '/employees',
      name: 'employees',
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/employees',
          name: 'employees',
          component: () => import('../components/Employee/Employees.vue'),
        }
      ]
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
      path: "/transfer",
      name: "Transfer",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/transfer',
          name: 'Transfer',
          component: () => import('../components/Transfer/Transfer.vue'),
        }
      ]
    },
    
    {
      path: "/admin-transfer",
      name: "Admin-Transfer",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-transfer',
          name: 'Admin-Transfer',
          component: () => import('../components/Transfer/Admin_Transfer.vue'),
        }
      ]
    },
    {
      path: "/promotion",
      name: "Promotion",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/promotion',
          name: 'Promotion',
          component: () => import('../components/Promotion/Promotion.vue'),
        }
      ]
    },
    {
      path: "/admin-promotion",
      name: "Admin-Promotion",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-promotion',
          name: 'Admin-Promotion',
          component: () => import('../components/Promotion/Admin_Promotion.vue'),
        }
      ]
    },
    {
      path: "/leave",
      name: "Leave",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/leave',
          name: 'Leave',
          component: () => import('../components/Leave/Leave.vue'),
        }
      ]
    },
    {
      path: "/admin-leave",
      name: "Admin-Leave",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-leave',
          name: 'Admin-Leave',
          component: () => import('../components/Leave/Adimin_Leave.vue'),
        }
      ]
    },
    {
      path: "/training",
      name: "Training",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/training',
          name: 'Training',
          component: () => import('../components/Training/Training.vue'),
        }
      ]
    },
    {
      path: "/admin-training",
      name: "Admin-Training",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-training',
          name: 'Admin-Training',
          component: () => import('../components/Training/Admin-Training.vue'),
        }
      ]
    },
    {
      path: "/admin-department",
      name: "Admin-Department",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-department',
          name: 'Admin-Department',
          component: () => import('../components/Department/Admin-Department.vue'),
        }
      ]
    },
    {
      path: "/admin-designation",
      name: "Admin-Designation",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-designation',
          name: 'Admin-Designation',
          component: () => import('../components/Designation/Admin-Designation.vue'),
        }
      ]
    },
    {
      path: "/admin-office",
      name: "Admin-Office",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-office',
          name: 'Admin-Office',
          component: () => import('../components/Office/Admin-Office.vue'),
        }
      ]
    },
    {
      path: "/admin-leave-type",
      name: "Admin-Leave-Type",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-leave-type',
          name: 'Admin-Leave-Type',
          component: () => import('../components/Leave/Admin-LeaveType.vue'),
        }
      ]
    },
    {
      path: "/report",
      name: "Report",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/report',
          name: 'Report',
          component: () => import('../components/Report/Report.vue'),
        }
      ]
    },
    {
      path: "/admin-acr",
      name: "ACR",
      component: () => import('../Layout/Fullpagelayout.vue'),
      children:[
        {
          path: '/admin-acr',
          name: 'ACR',
          component: () => import('../components/ACR/admin-acr.vue'),
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

router.afterEach(() => { 
  
  window.scrollTo({
     top: 0,
     left: 0,
     behavior: 'smooth'
   });
   return true;
 })

router.beforeEach((to) => {

  const publicPages = ['/', '/login', '/register', '/verify-otp', '/request-under-processing'];
  const authRequired = !publicPages.includes(to.path);

  const adimnPage = ['/users','/employees'];
  const adminRequired = adimnPage.includes(to.path);

  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    return {
      path: '/login',
      query: { nextUrl: to.fullPath }
    } 
  }else if(adminRequired && authRequired && loggedIn && JSON.parse(loggedIn).role_id != '1' ){
    return {
      path: '/dashboard',
      //query: { nextUrl: to.fullPath }
    }
  }else {
    return true;
  }
});


export default router;
