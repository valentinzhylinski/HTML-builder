const fs = require("fs");
const path = require("path");

const files = `${path.join(__dirname, "./files")}`;
const filesCopy = `${path.join(__dirname, "./files-copy")}`;

fs.mkdir(
  `${path.join(__dirname, "files-copy")}`,
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);

fs.readdir(filesCopy, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(filesCopy, file), (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(files, (err, elements) => {
  if (err) {
    throw err;
  } else {
    elements.map((el) => {
      fs.copyFile(`${files}/${el}`, `${filesCopy}/${el}`, (err) => {
        if (err) {
          throw err;
        }
      });
    });
    console.log("Copied succesfully!");
  }
});
