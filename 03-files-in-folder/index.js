const fs = require("fs");
const path = require("path");

const secretFolder = `${path.join(__dirname, "./secret-folder")}`;

fs.readdir(secretFolder, { withFileTypes: true }, (err, elements) => {
  elements.map((el) => {
    if (el.isFile()) {
      fs.stat(`${secretFolder}/${el.name}`, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `${path.parse(el.name).name} - ${path
              .parse(el.name)
              .ext.slice(1)} - ${stats.size * 10 ** -3}kb`
          );
        }
      });
    }
  });
});
