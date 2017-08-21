import * as types from './mutation-type.js';
export default {
	[types.CHANGE_MESSAGE](state,data){
		state.message=data.newMsg;
	}
}