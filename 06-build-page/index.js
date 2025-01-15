const fs = require('node:fs/promises');
const path = require('path');

async function bundle() {
  const files = await fs.readdir(path.join(__dirname, 'styles'), {
    withFileTypes: true,
  });
  await fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
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
          }
        );

        await fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          readF,
          function (error) {
            if (error) throw error;
          }
        );
      }
    }
  }
}

async function copyDir(dirName = '') {
  await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {
    recursive: true,
  });
  const files = await fs.readdir(path.join(__dirname, 'assets', dirName), {
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.isFile()) {
      await fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirName), {
        recursive: true,
      });
      await fs.copyFile(
        path.join(__dirname, 'assets', dirName, file.name),
        path.join(__dirname, 'project-dist', 'assets', dirName, file.name)
      );
    } else copyDir(file.name);
  }
}

(async () => {
  await fs.mkdir(path.join(__dirname, 'project-dist'), {
    recursive: true,
  });
  var readRes = await fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8'
  );

  const header = await fs.readFile(
    path.join(__dirname, 'components', 'header.html'),
    'utf-8'
  );

  const articles = await fs.readFile(
    path.join(__dirname, 'components', 'articles.html'),
    'utf-8'
  );

  const footer = await fs.readFile(
    path.join(__dirname, 'components', 'footer.html'),
    'utf-8'
  );
  var result = readRes
    .replace('{{header}}', header)
    .replace('{{articles}}', articles)
    .replace('{{footer}}', footer);

  fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    result,
    'utf-8',
    function (err) {
      if (err) console.log(err);
    }
  );
  await bundle();
  await copyDir();
  console.log('Ready!');
})();
