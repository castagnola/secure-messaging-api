"use strict"
//workerData -  Los datos se clonan como si se utilizara postMessage()
//parentPort -  permite la comunicación con el hilo padre

const { workerData, parentPort } = require('worker_threads');
const { signMessage, encryptMessage } = require('./crypto.utils');

const encryptedChunks = [];
const { chunks, sender, receiver } = workerData; // Obtener de workerdata

// Convert Uint8Array back to Buffer
console.time("Performance");
const bufferChunks = chunks.map(chunk => Buffer.from(chunk));
for (let i = 0; i < bufferChunks.length; i++) {
    let chunk = bufferChunks[i].toString();
    encryptedChunks.push({
        signature: signMessage(chunk, sender.privateKey).toString('base64'),
        encryptedMessage: encryptMessage(chunk, receiver.publicKey).toString('base64')
    });
}
console.timeEnd("Performance");
parentPort.postMessage(encryptedChunks)// Lo que va recibir el on.('message')