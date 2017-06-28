const express=require('express');
const api=require('./api');
const app=express();

app.use(api);   //最好放在下边

app.listen(8999, function(){
    console.log('Server up: http://localhost:8999' );
});
