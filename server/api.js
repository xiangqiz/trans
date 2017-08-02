const express = require('express');
const router = express.Router();//express.Router()是一个构造函数，所以先实例化
const db = require('./db');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const md5 = require('md5');
const passport = require('passport');

//use是express注册中间件的方法，返回一个函数
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(validator());

//中间件（middleware是处理http请求的函数。一个中间件处理完，再传递给下一个)
//next（）有参数则代表有错误    有next（）则不能向请求send
//all,get,post，put，delete等都是use的别名

//所有的请求都经过all方法 
router.all('*',function(req, res, next){
    console.log('都经过我。。。。。。。。。');
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    // res.status(200).send(JSON.stringify('pass all'));
    // 通过next（）执行下一个中间件，若不写，则请求到此终止
    next();
});

//登录
router.post('/login',function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.status(200).send(JSON.stringify(req.query));
    console.log('user login success: '+JSON.stringify(req.query));
    next();
});
// router.post('/login',function(req, res, next){
//     // res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
//     // res.status(200).send('next..........');
//     console.log('next...............');
//     next();
// });

//注册
router.post('/reg',function(req, res, next){
	// res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//防止中文乱码
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");//允许跨域请求
	const username= req.query.username;
    const password= req.query.password;
    const confirmPassword= req.query.confirmPassword;
	//服务端验证字段
    req.checkQuery('username', '须为邮箱且不能为空').notEmpty().isEmail();
    req.checkQuery('password', '密码不能为空').notEmpty();
    req.checkQuery('confirmPassword', '重复密码不能为空且两次密码须一致').notEmpty().equals(password);

    let errors=req.validationErrors();
    console.log("errors::::::::::");console.log(errors);
    if(errors) return res.status(301).send(errors).end();

	const user= new db.User({
        username:username,
        password:md5(password),
        created:new Date
    });
    user.save(function(err, result){
        if ( err ) {
            console.log('reg err:'+ err);
            throw err;
        }else{
            console.log('用户注册成功info: ');
            res.status(200).send(JSON.stringify(result)).end();
        }
    });
});
//改密码
router.post('/password',function(req, res, next){
    
});

module.exports = router;