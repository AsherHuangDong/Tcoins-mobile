import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * (resolve) => require(['@/components/teacher/TeacherInfoCase.vue'], resolve) 这种方式有利于减轻项目第一次加载网页的负担
 */

const router = new Router({
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
      }, 0);
    });
  },
  // mode: 'history',
  routes: [
    // 重定向
    {
      path: "*",
      redirect: '/ApplyBusiness'
    },
    {
      path: "/ApplyBusiness",
      name: "ApplyBusiness",
      component: () => import("@/views/classroom/ApplyBusiness.vue")
    },
    {
      path: "/community",
      name: "community",
      component: () => import("@/views/classroom/community.vue")
    },
    {
      path: "/yieldDetail",
      name: "yieldDetail",
      component: () => import("@/views/classroom/yieldDetail.vue")
    },
    {
      path: "/communitySurvey",
      name: "communitySurvey",
      component: () => import("@/views/classroom/communitySurvey.vue")
    },
    {
      path: "/indent",
      name: "indent",
      component: () => import("@/views/classroom/indent.vue")
    },
    {
      path: "/yieldPerson",
      name: "yieldPerson",
      component: () => import("@/views/classroom/yieldPerson.vue")
    }
  ]
});

//  退出登录的时候需要删除session
//  全局导航守卫钩子
// router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.token ? true : false; // 判断是否是登录状态 看sessionStorage有没有token
//   switch (to.path) {
//     case '/ziyushi':
//     case '/ketang':
//     case '/ketangjieguo':
//     case '/ketangxiangqing':
//     case '/fangsong':
//     case '/zhuanyeceping':
//     case '/loginbeforesz':
//     case '/loginsz':
//     case '/forgetpwdsz':
//     case '/registersz':
//     case '/register2sz':
//     case '/register3sz':
//       next();
//       break;
//     default:
//       isLogin ? next() : router.push('/loginbeforesz');
//   }
// });

export default router
