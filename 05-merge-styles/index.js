const fs = require('node:fs/promises');
const path = require('path');
const process = require('process');

(async () => {
  const files = await fs.readdir(path.join(__dirname, 'styles'), {
    withFileTypes: true,
  });
  await fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    function (error) {
      if (error) throw error;
    }
  );
  for (const file of files) {
    if (file.isFile()) {
      const ext = path.extname(file.name);

      if (ext === '.css') {
        const name = path.parse(file.name).name;

        const readF = await fs.readFile(
          path.join(__dirname, 'styles', name + ext),
          'utf8',
          (err, data) => {
            if (err) throw err;
            console.log(data);
          }
        );

        await fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          readF,
          function (error) {
            if (error) throw error;
          }
        );
      }
    }
  }
  console.log('Ready!');
})();
