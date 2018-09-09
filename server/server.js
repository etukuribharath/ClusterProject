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



// const cluster = require('cluster');
// const http = require('http');
//
//     if (cluster.isMaster) {
//
//     // Keep track of http requests
//     let numReqs = 0;
//     setInterval(() => {
//         console.log(`numReqs = ${numReqs}`);
//     }, 1000);
//
//     // Count requests
//     function messageHandler(msg) {
//         if (msg.cmd && msg.cmd === 'notifyRequest') {
//             numReqs += 1;
//         }
//     }
//
//     // Start workers and listen for messages containing notifyRequest
//     const numCPUs = require('os').cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//
//     for (const id in cluster.workers) {
//         cluster.workers[id].on('message', messageHandler);
//     }
//
// } else {
//
//     // Worker processes have a http server.
//     http.Server((req, res) => {
//         res.writeHead(200);
//         res.end('hello world\n');
//         console.log(`worker is listening on ${process.pid}`)
//         // notify master about the request
//         process.send({ cmd: 'notifyRequest' });
//     }).listen(8000);
// }