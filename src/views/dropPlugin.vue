<template>
	<div>
		<input class="dropOne" @click.stop="toggleDrop(clickDrop,$event)"
			:value="123"
			spellcheck="false" />
		<input class="dropMulti" @click.stop="toggleDrop(multiDrop,$event)"
			:value="123"
			spellcheck="false" />
		<dropDownComponent :optObj="dropDownOpt" @chooseItem="getDropItems"></dropDownComponent>
	</div>
</template>
<script>
	export default{
		name:'dropPlugin',
		data(){
			return {
				dropResult:{},
				clickDrop:{
					name:'borderRadius',
					isShow:false,//初始化 是否显示下拉框
					dropItems:[
						{type:'0',text:'0px'},
						{type:'10px',text:'10px'},
						{type:'20px',text:'20px'},
						{type:'30px',text:'30px'},
						{type:'40px',text:'40px'},
						{type:'50px',text:'50px'},
					],
					showField:'text',
					realField:'type',
					defaultItem:'',//选中项
					isSearch:true,//是否要搜索功能
				},
				multiDrop:{
					name:'multi',
					isShow:false,//初始化 是否显示下拉框
					dropItems:[
						{type:'上海',text:'上海'},
						{type:'北京',text:'北京'},
						{type:'河北',text:'河北'},
						{type:'河南',text:'河南'},
						{type:'南阳',text:'南阳'},
						{type:'洛阳',text:'洛阳'},
					],
					showField:'text',
					realField:'type',
					defaultItem:[],//选中项
					isSearch:true,//是否要搜索功能
					isMultiple:true,
					multiLength:3,
				},
				curDrop:{},
			}
		},
		mounted(){
			let _this=this;
			window.onclick=function(){
				if(_this.dropDownOpt.isShow){
					_this.dropDownOpt.isShow=false;
				}
			}
		},
		watch:{

		},
		computed:{
			dropDownOpt(){
				let _obj={};
				if(this.curDrop.name==='borderRadius'){
					_obj=this.clickDrop;
				}else if(this.curDrop.name==='multi'){
					_obj=this.multiDrop;
				}
				return _obj;
			},
		},
		methods:{
			toggleDrop(dropOpt,e){
				this.curDrop=dropOpt;
				dropOpt.isShow=!dropOpt.isShow;
				dropOpt.el=e.target;
				if(dropOpt.isMultiple){
					if(this.dropResult[dropOpt.name] && this.dropResult[dropOpt.name].length>0){
						dropOpt.defaultItem=[];
						dropOpt.defaultItem=this.dropResult[dropOpt.name];
					}
				}else{
					if(this.dropResult[dropOpt.name]){
						dropOpt.defaultItem=this.dropResult[dropOpt.name][this.dropDownOpt.realField];
					}
				}
			},
			getDropItems(msg){
				console.log(msg);
				if(this.curDrop.name==='borderRadius'){
					this.dropResult['borderRadius']=msg;
					this.dropDownOpt.isShow=false;
				}else if(this.curDrop.name==='multi'){
					this.dropResult['multi']=[];
					for(let item of msg){
						this.dropResult['multi'].push(item[this.dropDownOpt.realField]);
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>