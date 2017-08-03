
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const md5 = require("md5");

// 定义一个Schema
const UserSchema=new Schema({
    username:{type:String},
    password:{type:String},
    created: {type:Date}
});
// //添加方法
// UserSchema.methods.speak=function(){
// 	var greet=this.username?"hello "+this.username:"I have no name!"
// 	console.log(greet);
// };
const ArticleSchema=new Schema({
	title:      {type:String,require:true},
	content:    {type:String,require:true},
	author:     {type:Schema.Types.ObjectId,ref:'User'},
	category:   {type:Schema.Types.ObjectId,ref:'Category'},
	created:    {type:Date},
	slug:       {type:String,require:true},
	published:  {type:Boolean,default:false},
	meta:       {type:Schema.Types.Mixed},
	comments:   [Schema.Types.Mixed ]
},{versionKey: false});

const CategorySchema=new Schema({
	name:       {type:String,require:true},
	slug:       {type:String,require:true},
	created:    {type:Date},
});

//MD5密码和原密码匹配
UserSchema.methods.verifyPassword= function(password){
    let isMatch= md5(password)=== this.password;
    console.log('UserSchema.methods.verifyPassword: ', password, this.password, isMatch);
    return isMatch;
};


const Models={
    User:mongoose.model('user',UserSchema),//将Schema compiling model
    Article:mongoose.model('article',ArticleSchema),//将Schema compiling model
    Category:mongoose.model('category',CategorySchema),//将Schema compiling model
    verify:UserSchema.methods.verifyPassword,
};

UserSchema.methods.verifyPassword=function(){
	let isMatch=md5(password) === this.password;
	//console.log('UserSchema.methods.verifyPassword: ', password, this.password, isMatch);
	return isMatch;
};





// let userZhang=new Models.User({username:'xiangyu'});
// console.log("........."+userZhang.username+"............");
// userZhang.speak();

// //保存到db中，回调两个参数：err 
// userZhang.save(function(err,userZhang){
// 	if(err) return console.error(err);
// 	userZhang.speak();
// });
// //查询全部的实例
// Models.User.find(function(err,usersResult){
// 	if(err) return console.error(err);
// 	console.log(usersResult);
// });
// //查询特定实例
// Models.User.find({username:/iang/},function(err,usersResult){
// 	if(err) return console.error(err);
// 	console.log("find unique:......");
// 	console.log(usersResult);
// });


/**
 * 创建数据库名称并连接
 * Connecting to Mongod instance.
 */
const dbHost = 'mongodb://localhost:27017/trans';
mongoose.connect(dbHost);
const db=mongoose.connection;
db.on('error',function(){
    console.log('Database connection error.');
});
db.once('open',function(){
    console.log('The Database has connected.')
});

module.exports=Models;































// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 runoob
 
// var insertData = function(db, callback) {  
//     //连接到表 site
//     var collection = db.collection('site');
//     //插入数据
//     var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
//     collection.insert(data, function(err, result) { 
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }     
//         callback(result);
//     });
// }

// var selectData=function(db,callback){
// 	var collection=db.collection('site');
// 	var whereStr={'name':'菜鸟教程'};
// 	collection.find(whereStr).toArray(function(err,result){
// 		if(err){
// 			console.log('error');
// 			return ;
// 		}
// 		callback(result);
// 	});
// };
// var updateData=function(db,callback){
// 	var collection=db.collection('site');
// 	var whereStr={'name':'菜鸟教程'};
// 	var updateStr={$set:{'url':'https://www/runoob.com'}};
// 	collection.update(whereStr,updateStr,function(err,result){
// 		if(err){
// 			console.log('err');
// 			return;
// 		}
// 		callback(result);
// 	});
// };

// var deleteData=function(db,callback){
// 	var collection=db.collection('site');
// 	var whereStr={'name':'菜鸟工具'};
// 	collection.remove(whereStr,function(err,result){
// 		if(err){
// 			console.log('err');
// 			return;
// 		}
// 		callback(result);
// 	});
// };
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     // insertData(db, function(result) {
//     //     console.log(result);
//     //     db.close();
//     // });
//     // updateData(db, function(result) {
//     //     console.log(result);
//     //     db.close();
//     // });
//     deleteData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
//     selectData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
// });