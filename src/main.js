//项目核心文件 全局配置
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'
import fontCss from './assets/font/design-font/iconfont.css'
import store from './store'

import dropdown from './plugins/dropdown/dropInstall.js'
import tree from './plugins/tree/itemInstall.js'
Vue.prototype.$http = axios
Vue.use(dropdown)
Vue.use(tree)

Vue.config.debug=true;//开启错误提示
new Vue({
	router,
	store,
	el:'#appIndex',
	template:'<app/>',
	components:{App},
	// render:h=>h(App)
})
