import Vue from 'vue'
import Vuex from 'vuex'

import * as state from './state.js'
import * as actions from './actions.js'
import mutations from './mutation.js'
import plugins from './modules/pluginsShow.js'
Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'   //在发布环境下不开启，因为会影响性能。（生产环境下开启有助于调试工具追踪状态变化）


export default new Vuex.Store({
	state,
	actions,
	mutations,
	modules:{
		plugins
	},
	// strict:debug,
})
