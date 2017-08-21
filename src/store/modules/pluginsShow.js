import * as types from '../mutation-type.js'
export default {
	state:{
		currentPlugin:'dropdown',
	},
	mutations:{
		[types.CHANGE_PLUGINS](state,data){
			state.currentPlugin=data;
		}
	},
	actions:{
		changePlugins({commit,state},data){
			commit(types.CHANGE_PLUGINS,data);
		},
	},
}