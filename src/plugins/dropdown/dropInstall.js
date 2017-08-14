import dropDown from './DropDown.vue'

const dropDownCom={};
dropDownCom.install=function(Vue){
	if(dropDownCom.installed) return
	dropDownCom.install.installed = true
	Vue.component('dropDownComponent', dropDown)
}

// 对于那些没有在应用中使用模块化系统的用户，他们往往将通过<script>标签引用你的插件，
// 并期待插件无需调用Vue.use()便会自动安装 。你可以在插件最后添加如下几行代码来实现自动安装：
// 如果Vue是全局对象自动安装插件
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(dropDownCom)
}
export default dropDownCom;