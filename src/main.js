import Vue from 'vue'
import router from './router'
import store from './store'
import axios from '@/http'
import Axios from 'vue-axios'

import Index from '@/view/index/Index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局样式
import '@/assets/css/base.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(ElementUI);
Vue.use(Axios,axios)

// 开发环境用false，生产环境改成true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(Index)
})
