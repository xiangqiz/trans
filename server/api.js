const express = require('express');
const router = express.Router();
const db = require('./db');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const md5 = require('md5');
const passport = require('passport');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(validator());


//登录
router.post('/login',function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.status(200).send(JSON.stringify(req.query));
    console.log('user login success: '+JSON.stringify(req.query));
});
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

module.exports = router;