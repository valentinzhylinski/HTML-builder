const fs = require("fs");
const path = require("path");

const secretFolder = `${path.join(__dirname, "./secret-folder")}`;

fs.readdir(secretFolder, { withFileTypes: true }, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    if (el.isFile()) {
      fs.stat(`${secretFolder}/${el.name}`, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `${path.parse(el.name).name} - ${path
              .parse(el.name)
              .ext.slice(1)} - ${stats.size / 1000}kb`
          );
        }
      });
    }
  }
});
