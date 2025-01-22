const fs = require('node:fs/promises');
const { copyFile } = require('node:fs/promises');
const path = require('path');
const { constants } = require('fs');

(async () => {
  try {
    await fs.access(path.join(__dirname, 'files-copy'), constants.F_OK);
    await fs.rm(path.join(__dirname, 'files-copy'), {
      recursive: true,
      force: true,
    });
  } catch {
    console.error('file does not exists');
  }

  await fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true,
  });
  const files = await fs.readdir(path.join(__dirname, 'files'), {
    withFileTypes: true,
  });

  for (const file of files) {
    const ext = path.extname(file.name);
    const name = path.parse(file.name).name;
    const size = await fs.stat(path.join(__dirname, 'files', file.name));

    fs.appendFile(
      path.join(__dirname, 'files-copy', name + ext),
      '',

      function (error) {
        if (error) throw error;
      },
    );
    await copyFile(
      path.join(__dirname, 'files', name + ext),
      path.join(__dirname, 'files-copy', name + ext),
    );
    console.log(name + ext + '  ' + size.size + 'b' + ' | ' + 'copied!');
  }
})();
