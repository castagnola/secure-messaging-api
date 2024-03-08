"use strict";
//Este archivo trabaja como un Gateway o loadBalancer
const cluster = require("cluster");
const os = require("os")

const cpuCount = os.cpus().length; //numero de cpus

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
    exec: __dirname + "/app.js" // lo replica
});

for (let i = 0; i < cpuCount; i++) {
    cluster.fork();// Siempre tenemos 8 Corse, es el responsable de crear los servers o instancias del servidor
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    console.log(`Starting another Worker`);
    cluster.fork(); //Nos aseguramos qque cuando una instancia crshee se cree otra siempre tendremos 12
});