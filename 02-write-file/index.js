const fs = require('fs');
const path = require('path');
const process = require('process');

const { stdin, stdout } = process;
fs.writeFile(path.join(__dirname, 'text.txt'), '', function (error) {
  if (error) throw error;
});
stdout.write('Please, type something.\n');

stdin.on('data', (data) => {
  const str = data.toString().trim();

  if (str === 'exit') process.exit();

  fs.appendFile(path.join(__dirname, 'text.txt'), data, function (error) {
    if (error) throw error;
  });
});

process.on('exit', () => stdout.write('Bye-bye!'));
process.on('SIGINT', () => process.exit());