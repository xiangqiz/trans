<template>
	<div class="pluginsContent" >
		<input type="text" class="dropOne" :value="dropShowField.dropOne" @click.stop="showDropDown($event,optBorderRadius)" spellcheck="false">
		<input type="text" class="dropMulti" :value="dropShowField.dropMulti" @click.stop="showDropDown($event,optCity)" spellcheck="false">
		<dropDownComponent :optObj="currentDropOpt" @chooseItem="getDropData"></dropDownComponent>
		<div class="treeChoosed">{{treeChoosed.name}}</div>
		<div class="treeBlock">
			<Item
				:sourceData="treeData"
				:treeT="treeSettingData"
				ref="folderTree"
				@chooseTreeItem="getTreeData"
				@changeDbNewName="getChangeData"
				>
			</Item>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'dropPlugin',
		data(){
			return {
				treeData:[
					{name:'语文',id:'1',pid:'0'},
					{name:'数学',id:'2',pid:'3'},
					{name:'英语',id:'3',pid:'1'},
					{name:'化学',id:'4',pid:'1'},
					{name:'物理',id:'5',pid:'1'},
					{name:'生物',id:'6',pid:'4'},
					{name:'历史',id:'7',pid:'4'},
					{name:'地理',id:'8',pid:'6'},
					{name:'政治',id:'9',pid:'7'},
					{name:'自然',id:'10',pid:'10'},
					{name:'社会',id:'11',pid:'2'},
					{name:'体育',id:'12',pid:'0'},
					{name:'音乐',id:'13',pid:'12'},
					{name:'美术',id:'14',pid:'12'}
				],
				treeSettingData:{
					'id': 'id',
                    'name': 'name',
                    'pId': 'pid',
                    // 'rootId': 'model_type_rootid',
                    'defaultItem': true,
                    'isDbClick': true,
                    'isDrag': true,
                    'addDefField': '新建文件夹',
                    'defaultExpand': 'first'//默认选中“none”有bug
				},
				optBorderRadius: {
                    name: 'borderRadius',
                    dropItems: [{
                        type: '0',
                        text: '0px'
                    }, {
                        type: '10px',
                        text: '10px'
                    }, {
                        type: '20px',
                        text: '20px'
                    }, {
                        type: '30px',
                        text: '30px'
                    }, {
                        type: '40px',
                        text: '40px'
                    }, {
                        type: '50px',
                        text: '50px'
                    }],
                    isShow: false,
                    showField: 'text',
                    realField: 'type',
                    dropDownStyle: {
                        zIndex:5
                    }
                },
				optCity: {
                    name: 'city',
                    dropItems: [{
                        type: '南阳',
                        text: '南阳'
                    }, {
                        type: '洛阳',
                        text: '洛阳'
                    }, {
                        type: '信阳',
                        text: '信阳'
                    }, {
                        type: '商丘',
                        text: '商丘'
                    }, {
                        type: '驻马店',
                        text: '驻马店'
                    }, {
                        type: '郑州',
                        text: '郑州'
                    }],
					isShow: false,
					isMultiple:true,
					isSearch:true,
					multiLength:3,
                    showField: 'text',
                    realField: 'type',
                    dropDownStyle: {
                        zIndex:5
                    }
                },
				currentDropOpt:{},
				borderRadius:{},
				cities:[],
				treeChoosed:{}
			}
		},
		mounted(){
		},
		computed:{
			dropShowField(){
				let _obj={};
				if (this.borderRadius.text) {
					_obj.dropOne=this.borderRadius.text;
				}
				if (this.cities.length>0) {
					for (let i=0;i<this.cities.length;i++) {
						if (!_obj.dropMulti){
							_obj.dropMulti='';
						}
						_obj.dropMulti=_obj.dropMulti+','+this.cities[i].text;
					}
					_obj.dropMulti=_obj.dropMulti.substr(1,_obj.dropMulti.length);
				}
				return _obj;
			}
		},
		methods:{
			showDropDown(e,opt){
				if(this.currentDropOpt.isShow){
					this.currentDropOpt.isShow=false;
					return;
				}
				this.currentDropOpt = {};
				this.currentDropOpt = {...opt};
				if (this.currentDropOpt.name==='borderRadius') {
					this.currentDropOpt.defaultItem=this.borderRadius.type;
				} else if (this.currentDropOpt.name==='city'){
					let arr=[];
					for (let i=0;i<this.cities.length;i++) {
						arr.push(this.cities[i].type);
					}
					this.currentDropOpt.defaultItem=arr;
				}
				this.currentDropOpt.el=e.target;
				this.currentDropOpt.isShow=true;
			},
			getDropData(msg){
				console.log(msg);
				if(!this.currentDropOpt.isMultiple){
					this.currentDropOpt.isShow=false;
				}
				if (this.currentDropOpt.name==='borderRadius') {
					this.borderRadius=msg;
				} else if (this.currentDropOpt.name==='city'){
					this.cities=msg;
				}
			},
			getTreeData(msg){
				this.treeChoosed=msg;
			},
			// newChangeName,oldModel
			getChangeData(msg){
				// console.log(msg);
				for(let i=0;i< this.treeData.length;i++){
					if (this.treeData[i].id===msg.oldModel.id){
						let obj={...this.treeData[i]};
						obj.name=msg.newChangeName;
						this.treeData.splice(i,1,obj);
					}
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.treeBlock{
		width:400px;
		height:auto;
		position:relative;
	}
</style>