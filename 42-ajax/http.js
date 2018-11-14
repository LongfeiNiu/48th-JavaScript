/*
    cmd检测nodejs的安装
            node -v
            npm  -v
 */
//通过 node的原生模块  http  搭建服务器  提供数据接口
const http = require('http');

http.createServer(function () {
    res.writeHeader(200,{
        'Access-Access-Control-Allow-Origin':'*'
    })
    res.end("hi~这里是node服务器返回的数据");
}).listen(6060);
















