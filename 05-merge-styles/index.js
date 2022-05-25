const fs = require("fs");
const path = require("path");
const process = require("process");

const styles = `${path.join(__dirname, "/styles")}`;
const bundle = `${path.join(__dirname, "/project-dist/bundle.css")}`;
const projectDist = `${path.join(__dirname, "project-dist")}`;

fs.readdir(projectDist, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    if (el === "bundle.css") {
      fs.unlink(bundle, (err) => {
        if (err) throw err;
      });
    }
  }
});

fs.readdir(styles, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    if (path.parse(el).ext === ".css") {
      let fileContent = fs.createReadStream(
        `${path.join(styles, el)}`,
        "utf-8"
      );
      fileContent.on("data", (content) => {
        let writeStream = fs.createWriteStream(bundle, { flags: "a" });
        writeStream.write(`${content}\n`);
      });
    }
  }
});
