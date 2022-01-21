// Serving the file using http server

const fs=require("fs");
const http = require("http")

fs.writeFile("index.html","<h1>Hellow World</h1>",(err)=>{
    console.log(err);
});
http.createServer(function(req, res){
    res.write(fs.readFileSync("index.html","utf-8"));
    res.end();
}).listen(3000);
