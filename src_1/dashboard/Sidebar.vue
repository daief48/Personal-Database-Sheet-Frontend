<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4" style="">

    <!-- Admin-Panel-View-Top-Left -->
    <a href="#" class="brand-link" style="background-color: #eeeeee; border: none">

      <span class="brand-text admin-panel-view-top-left">Admin Panel</span>
    </a>

    <div class="sidebar" style="padding: 0px 7px;height: 100%;width: 100%;background-color: #00497a;opacity: .8;">
      <nav class="mt-3">

        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li v-for="(menu, index) in sidebarMenu" :key="index" class="nav-item nav-item-design mb-1"
            :class="$route.path == menu.slug ? 'active' : ''">

            <div v-if="menu.setting !== true">
              <!-- {{ menu.slug }} -->
              <router-link :to="menu.slug" class="nav-link">
                <i :class="menu.icon"></i>{{ menu.title }}

              </router-link>
            </div>
            <!-- [
                                'title' => 'Departments Setup',
                                'slug' => '/admin-department',
                                'icon' => 'fa fa-graduation-cap nav-icon',
                            ],
                            [
                                'title' => 'Training Setup',
                                'slug' => '/training-setup',
                                'icon' => 'fa fa-graduation-cap nav-icon',
                            ],
                            [
                                'title' => 'Designation Setup',
                                'slug' => '/admin-designation',
                                'icon' => 'fa fa-graduation-cap nav-icon',
                            ],
                            [
                                'title' => 'Office Setup',
                                'slug' => '/admin-office',
                                'icon' => 'fa fa-graduation-cap nav-icon',
                            ],
                            [
                                'title' => 'Leave Type Setup',
                                'slug' => '/admin-leave-type',
                                'icon' => 'fa fa-graduation-cap nav-icon',
                            ], -->
            <div v-else>
              <a :href="'#submenu' + index" data-toggle="collapse" role="button" :aria-expanded="in_array($route.path, ['/admin-department','/admin-designation','/training-setup','/admin-office','/admin-leave-type']) ? true : false" :class="in_array($route.path, ['/admin-department','/admin-designation','/training-setup','/admin-office','/admin-leave-type']) ? 'active' : ''"
                aria-controls="multiCollapseExample1" class="ml-3" style="display: flex;align-items: center;font-size: 16px; text-decoration: none;"> 
                <i data-v-6ee7d3b8="" class="fa fa-solid fa-gear mr-1" style="font-size: 24px;"></i>Settings
              </a>
              <ul :id="'submenu' + index" class="collapse multi-collapse" :class="in_array($route.path, ['/admin-department','/admin-designation','/training-setup','/admin-office','/admin-leave-type']) ? 'show' : ''" style="list-style: none;    padding: 9px;" >
                <li v-for="(subMenu, subIndex) in menu.slug" :key="subIndex">
                  <router-link :to="subMenu.slug" class="nav-link" >
                    <i :class="subMenu.icon"></i>{{ subMenu.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <!-- User[Main Menu] -->
          <!-- <li class="nav-item nav-item-design" :class="$route.path == '/users' ? 'active' : ''">
            <router-link to="/users" class="nav-link"><i class="fa fa-users nav-icon"></i> Users List</router-link>
          </li>
          <li class="nav-item nav-item-design" :class="$route.path == '/profile' ? 'active' : ''">
            <router-link to="/profile" class="nav-link"><i class="fa fa-user nav-icon"></i> Profile</router-link>
          </li>-->
          <!-- <li class="nav-item nav-item-design" :class="$route.path == '/transfer' ? 'active' : ''">
            <router-link to="/transfer" class="nav-link"><i class="fa fa-exchange nav-icon"></i> Transfer</router-link>
          </li> -->
          <!--<li class="nav-item nav-item-design" :class="$route.path == '/training' ? 'active' : ''">
            <router-link to="/training" class="nav-link"><i class="fa fa-graduation-cap nav-icon"></i> Tranining</router-link>
          </li>

          <li class="nav-item nav-item-design" :class="$route.path == '/promotion' ? 'active' : ''">
            <router-link to="/promotion" class="nav-link"><i class="fa fa-trophy nav-icon"></i> Promotion</router-link>
          </li>
          <li class="nav-item nav-item-design" :class="$route.path == '/leave' ? 'active' : ''">
            <router-link to="/leave" class="nav-link"><i class="fa fa-snowflake-o nav-icon"></i> Leave</router-link>
          </li>

          <li class="nav-item nav-item-design" :class="$route.path == '/acr' ? 'active' : ''">
            <router-link to="/acr" class="nav-link"><i class="fa fa-newspaper-o nav-icon"></i> ACR</router-link>
          </li>

          <li class="nav-item nav-item-design" :class="$route.path == '/Report' ? 'active' : ''">
            <router-link to="/report" class="nav-link"><i class="fa fa-file nav-icon"></i> Reporot</router-link>
          </li> -->

        </ul>

      </nav>

    </div>

  </aside>
</template>

<script>
import $ from 'jquery';
export default {

  data() {
    return {
      sidebarMenu: [],
    }
  },
  methods: {
    is2DArray(arr) {
      if (!Array.isArray(arr)) {
        return false;
      }

      // Check if the first element of the array is an array
      return Array.isArray(arr[0]);
    },
    close() {

    },

    in_array(item, myArray){
      if (myArray.includes(item)) {
       return true;
      } else {
       return false;
      }
    },

    checkRoute(routeArr, curentRoute) {
      return routeArr.includes(curentRoute);
    },

    getSidebarMenu() {
      const userData = localStorage.getItem('user');
      this.sidebarMenu = JSON.parse(userData).menu;

      // Iterate over this.sidebarMenu, not sidebarMenu
      // this.sidebarMenu.forEach(element => {
      //   if (element.setting === true) {
      //     element.slug.forEach(ele => {
      //       console.log(ele.title);
      //     })
      //   } else {
      //     console.log(element.slug)
      //   }
      // });

    }



  },

  created() {
    this.getSidebarMenu();
  },

  mounted() {
    //$('[data-widget="treeview"]').Treeview('init');

    $(document).on('click', '.parent-nav', function () {
      setTimeout(() => {
        var selector = $(this);
        if (selector.hasClass('menu-open2')) {
          selector.removeClass('menu-open2').removeClass('menu-is-opening menu-open');
          selector.find('ul').addClass('d-none').removeClass('d-block');
        } else {
          selector.addClass('menu-open2').addClass('menu-is-opening');
          selector.find('ul').removeClass('d-none').addClass('d-block');
          selector.find('ul').css('height', 'auto');
        }
      }, 400);
    });

    $(document).on('click', '.child-nav-item', function () {
      setTimeout(() => {
        var selector = $(this);
        selector.closest('ul').addClass('d-block').removeClass('d-none');
      }, 500);
    });
  }
};




</script>

<style scoped>
.admin-panel-view-top-left {
  font-family: 'Russo One', sans-serif;
  font-size: 15px;
  font-style: oblique;
  color: midnightblue;
}

.nav-item-design {
  font-family: 'Russo One', sans-serif;
  font-size: 14px;
  font-variant: small-caps;
  font-style: oblique;
}
</style>
