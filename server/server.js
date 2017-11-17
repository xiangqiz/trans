let http = require('http');
http.createServer((request,response)=>{
    response.writeHead(200,{'Content_Type': 'text/plain'});
    response.end('hello world,zhanghuahua');
}).listen(9999);
console.log('服务启动成功，请访问http://localhost:9999');