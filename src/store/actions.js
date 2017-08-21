import * as types from './mutation-type.js'
export const changeMessage=({commit,state},data)=>{//{commit,state}是context中的，这里用了参数解构
	commit(types.CHANGE_MESSAGE,data);
}