const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/trans',{useMongoClient:true}); // 解决一个warning
mongoose.Promise = global.Promise; // 解决一个warning
const db = mongoose.connection;

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    created: Date
});
// ！！！！！！！！！！！！！！！！联想记忆：这个地方就不能用箭头函数
blogSchema.methods.print = function () {
    let str = this.title ? `my title is ${this.title}` : 'I have not a title';
    console.log(str);
}
const Blog = mongoose.model('blog', blogSchema);
let blog1 = new Blog({
    title: 'first',
    content: 'one',
    created: new Date()
});
// !!!!!!!为什么先打印find，在打印save
blog1.save((err, blog1) => {
    if (err) {
        console.log('保存error', err);
        return ;
    }
    blog1.print();
});
Blog.find((err, result) => {
    if (err) {
        console.log('查找error', err);
        return ;
    }
    console.log('查找结果', result);
});

db.on('error', (err) => {
    console.log('connection err:', err);
});
db.once('open', (callback) => {
    console.log('database opened');
});