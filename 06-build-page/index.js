const fs = require("fs");
const path = require("path");

const bundle = `${path.join(__dirname, "/project-dist/style.css")}`;
const styles = `${path.join(__dirname, "/styles")}`;
const projectDist = `${path.join(__dirname, "project-dist")}`;
const template = `${path.join(__dirname, "template.html")}`;
const components = `${path.join(__dirname, "components")}`;

const header = `${path.join(components, "header.html")}`;
const articles = `${path.join(components, "articles.html")}`;
const footer = `${path.join(components, "footer.html")}`;

const headerSampleTag = "{{header}}";
const articlesSampleTag = "{{articles}}";
const footerSampleTag = "{{footer}}";

const templateReadStream = fs.createReadStream(template, "utf-8");
const articlesReadStream = fs.createReadStream(articles, "utf-8");
const footerReadStream = fs.createReadStream(footer, "utf-8");
const headerReadStream = fs.createReadStream(header, "utf-8");

const files = `${path.join(__dirname, "assets")}`;
const filesCopy = `${path.join(__dirname, "project-dist/assets")}`;

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(filesCopy, { recursive: true }, (err) => {
  if (err) throw err;
});

/*fs.readdir(filesCopy, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    fs.unlink(path.join(filesCopy, el), (err) => {
      if (err) throw err;
    });
  }
});*/

fs.readdir(files, { withFileTypes: true }, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    if (el.isDirectory()) {
      let directory = el.name;
      fs.mkdir(
        `${path.join(filesCopy, el.name)}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      fs.readdir(`${path.join(files, el.name)}`, (err, elements) => {
        if (err) throw err;

        for (const el of elements) {
          fs.copyFile(
            `${files}/${directory}/${el}`,
            `${filesCopy}/${directory}/${el}`,
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      });
    }
  }
});

const HTMLWriteStream = fs.createWriteStream(
  path.join(projectDist, "index.html"),
  { flags: "a" }
);

/*fs.readdir(projectDist, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    fs.unlink(path.join(projectDist, el), (err) => {
      if (err) throw err;
    });
  }
});*/

templateReadStream.on("data", (content) => {
  let sampleHTML = content;
  articlesReadStream.on("data", (content) => {
    const articlesHTML = content;
    let articlesBuildHTML = sampleHTML.replace(articlesSampleTag, articlesHTML);
    footerReadStream.on("data", (content) => {
      const footerHTML = content;
      let footerBuildHTML = articlesBuildHTML.replace(
        footerSampleTag,
        footerHTML
      );
      headerReadStream.on("data", (content) => {
        const headerHTML = content;
        let headerBuildHTML = footerBuildHTML.replace(
          headerSampleTag,
          headerHTML
        );
        HTMLWriteStream.write(headerBuildHTML);
      });
    });
  });
});

fs.readdir(projectDist, (err, elements) => {
  if (err) throw err;

  for (const el of elements) {
    if (el === "style.css") {
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

/*const templateReadStream = fs.createReadStream(template, "utf-8");

templateReadStream.on("data", (content) => {
  let templateHTML = content;
  fs.readdir(components, (err, elements) => {
    if (err) throw err;

    for (const el of elements) {
      if (el === "footer.html") {
        const componentReadStream = fs.createReadStream(
          `${path.join(components, el)}`,
          "utf-8"
        );
        componentReadStream.on("data", (code) => {
          const replacement = code;
          let newHTML = templateHTML.replace(footer, replacement);

        });
      }
    }
  });
  let newTemplateHTML = templateHTML
    .replace(header, "{{header4real}}")
    .replace(articles, "{{articles4real}}")
    .replace(footer, "{{footer4real}}");
  console.log(newTemplateHTML);
});*/
