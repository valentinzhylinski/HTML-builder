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

fs.readdir(filesCopy, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    fs.unlink(path.join(filesCopy, el), (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(files, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    fs.copyFile(`${files}/${el}`, `${filesCopy}/${el}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  console.log("Copied succesfully!");
});
