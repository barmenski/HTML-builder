const fs = require('node:fs/promises');
const { basename } = require('path');
const path = require('path');
const process = require('process');

(async () => {
  const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
    withFileTypes: true,
  });
  for (const file of files) {
    if (file.isFile()) {
      const ext = path.extname(file.name);
      const name = path.parse(file.name).name;
      const size = await fs.stat(
        path.join(__dirname, 'secret-folder', file.name)
      );
      console.log(name + ' - ' + ext + ' - ' + size.size + 'b');
    }
  }
})();