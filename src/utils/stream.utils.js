const fs = require('fs');
const path = require('path');

async function streamToBuffer(fileName) {
    const filePath = path.resolve(__dirname, '../../uploads', fileName);
    const readableStream = fs.createReadStream(filePath, { highWaterMark: 100 });
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', data => { chunks.push(data); });
        readableStream.on('end', () => { resolve(chunks); });
        readableStream.on('error', reject);
    });
}

module.exports = {
    streamToBuffer
}