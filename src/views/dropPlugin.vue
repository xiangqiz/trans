<template>
	<div>
		<div id="showDrop">
			<input class="showDropDown" @click="toggleDrop($event)" 
				:value="dropResult[0]?dropResult[0][dropDownOpt.showField]:'' " 
				spellcheck="false" />
			<dropDownComponent :optObj="dropDownOpt" @chooseItem="getDropItems"></dropDownComponent>
		</div>
	</div>
</template>
<script>
	export default{
		name:'dropPlugin',
		data(){
			return {
				dropResult:[],
				dropDownOpt:{
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
					isMultiple:true,//是否可以多选
				}
			}
		},
		methods:{
			toggleDrop(e){
				this.dropDownOpt.isShow=!this.dropDownOpt.isShow;
				this.dropDownOpt.el=e.target;
				if(this.dropResult.length>0){
					this.dropDownOpt.defaultItem=this.dropResult[0][this.dropDownOpt.realField];
				}
			},
			getDropItems(msg){
				console.log(msg);
				this.dropResult=[];
				this.dropResult.push(msg);
				// this.dropDownOpt.isShow=false;
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>