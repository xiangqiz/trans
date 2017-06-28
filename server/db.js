const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    username:{type:String},
    password:{type:String},
    created: {type:Date}
});


const Models={
    User:mongoose.model('user',userSchema),
};


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