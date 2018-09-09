const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
console.log(numCPUs)
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }

    cluster.on('exit',(worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} died`)
    });
} else {
    http.createServer((req,res)=>{
        res.writeHead(200);
        res.end('hello world\n');
        console.log(`worker is listening on ${process.pid}`)
    }).listen(8000);
    console.log(`worker ${process.pid} started`);
}