// 引入mongodb模块
let mongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/trans';
// 插入操作
const insertData = (db, callback) => {
    let blogCollection = db.collection('blog');
    let initBlog = [{
        title: 'first', 
        content: 'one'
    },{
        title: 'second', 
        content: 'two'
    }];
    blogCollection.insert(initBlog, (err, result) => {
        if (err) {
            console.log('插入数据出错', err);
            return ;
        }
        callback(result);
    });
};
// 查找操作
const findData = (db, callback) => {
    let blogCollection = db.collection('blog');
    blogCollection.find().toArray((err, result) => {
        if (err) {
            console.log(err);
            return ;
        }
        callback(result);
    });
};
// 更新操作
const updateData = (db, callback) => {
    let blogCollection = db.collection('blog');
    let upObj = {$set: {content: 'two updated'}};
    blogCollection.update({title: 'second'}, upObj, (err, result) => {
        if (err) {
            console.log(err);
            return ;
        }
        callback(result);
    });
};
// 删除操作
const removeData = (db, callback) => {
    let blogCollection = db.collection('blog');
    blogCollection.remove({title: 'first'}, (err, result) => {
        if (err) {
            console.log(err);
            return ;
        }
        callback(result);
    });
};
// 连接数据库  执行操作
mongoClient.connect(DB_CONN_STR,(err, db)=>{
    if (err) {
        console.log('数据库连接fail');
        return;
    }
    console.log('数据库连接success');
    insertData(db, (res) => {
        console.log('insert:', res);
    });
    findData(db, (res) => {
        console.log('select:::', res);
    });
    updateData(db, (res) => {
        console.log('update', res);
    });
    findData(db, (res) => {
        console.log('select:::', res);
    });
    removeData(db, (res) => {
        console.log('remove', res);
    });
    findData(db, (res) => {
        console.log('select:::', res);
    });
    db.close();
});