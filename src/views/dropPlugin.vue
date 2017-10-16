<template>
	<div class="pluginsContent" >
		<div class="dropBlock">
			<span class="dropText">下拉框展示</span>
			<p class="dropText">单选：</p>
			<input type="text" class="dropOne" placeholder="请选择"
			:value="dropShowField.dropOne" 
			@click.stop="showDropDown($event,optBorderRadius)" 
			spellcheck="false">
			<p class="dropText">多选（带搜索功能）：</p>
			<input type="text" class="dropMulti" placeholder="请选择"
			:value="dropShowField.dropMulti" 
			@click.stop="showDropDown($event,optCity)" 
			spellcheck="false">
		</div>
		<dropDownComponent :optObj="currentDropOpt" @chooseItem="getDropData"></dropDownComponent>
		<div class="treeBlock">
			<button @click="newFolder(true)">新建子文件</button>
			<button @click="newFolder('root')">新建根文件</button>
			<div class="treeContent">
				<Item
					:sourceData="treeData"
					:treeT="treeSettingData"
					:isAdd="isAdd"
					ref="folderTree"
					@chooseTreeItem="getTreeData"
					@changeDbNewName="getChangeData"
					@changeNewName="getAddData"
					@getDragData="getDragData"
					>
				</Item>
			</div>
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
                    // 'defaultItem': true,
                    'defaultItem': '12',
                    'isDbClick': true,
                    'isDrag': true,
                    'addDefField':'新建文件夹',//默认的文件夹名字
                    'defaultExpand': 'first'//默认选中“none”有bug
				},
				isAdd:false,//添加文件夹
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
			getDragData(msg){
				console.log(msg);
				for(let i=0;i< this.treeData.length;i++){
					if (this.treeData[i].id===msg.dragData.id){
						let obj={...this.treeData[i]};
						if(typeof msg.parentData==='string' && msg.parentData==='root'){
							obj.pid='0';
						}else{
							obj.pid=msg.parentData.id;
						}
						this.treeData.splice(i,1,obj);
					}
				}
			},
			newFolder(type){
				this.isAdd=type;
			},
			getAddData(msg){
				console.log(msg);
				if (this.isAdd===true) {
					this.creatAndAdd(msg.addValue,msg.parent.id);
				}else if (this.isAdd==='root'){
					this.creatAndAdd(msg.addValue,'0');
				}
				this.isAdd=false;
			},
			creatAndAdd(name,pid){
				let _obj={};
				_obj.name=name;
				_obj.pid=pid;
				_obj.id=String(Math.random());
				this.treeData.push(_obj);
			},
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
				console.log(msg);
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
	.pluginsContent{
		width:100%;
		height:100%;
		.dropBlock{
			display:inline-block;
			vertical-align: top;
			width:300px;
			height:100%;
			input{
				margin: 10px 0;
			}
		}
		.treeBlock{
			display:inline-block;
			vertical-align: top;
			width:300px;
			height:auto;
			position:relative;
			.treeContent{
				width:100%;
				position:relative;
			}
		}
	}
</style>