import Vue from 'vue';
import VueRouter from 'vue-router'; // 导入路由插件， 用于tab标签切换
import VueResource from 'vue-resource'; // 导入VueResource插件， 用于前端和后端数据交互
import App from './App';

import goods from 'components/goods/goods'; // 导入商品组件
import ratings from 'components/ratings/ratings'; // 导入评论组件
import seller from 'components/seller/seller'; // 导入商家组件

import 'common/less/index.less'; // 全局引入样式

// 安装路由
Vue.use(VueRouter);
// 全局注册VueResource
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  },
  '': {
    component: goods
  }
});

router.start(app, '#app');
