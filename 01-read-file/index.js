const fs = require('fs');
const path = require('path');
const process = require('process');


const {stdin, stdout}=process;

async function logChunks(readable) {
    for await (const chunk of readable) {
        stdout.write(chunk);
    }
  }
  
  const readable = fs.createReadStream(
    path.join(__dirname, 'text.txt'), {encoding: 'utf8'});
  logChunks(readable);