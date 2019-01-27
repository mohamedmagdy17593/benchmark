const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const changeCase = require("change-case");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "results");

function isNameEndedWithJson(name) {
  return /\.json$/i.test(name);
}

app.get("/", (_req, res) => {
  const files = fs.readdirSync(filePath).filter(isNameEndedWithJson);
  res.render("results", { files });
});

function getSavedFileNameMiddleware(req, res, next) {
  const {
    params: { fileEnding }
  } = req;
  if (!fileEnding) {
    return res.status(400).send("Oh no");
  }

  let [fileName] = fileEnding.split(".");
  fileName = changeCase.paramCase(fileName);
  req.fileToSave = path.join(filePath, `${fileName}.json`);
  next();
}

app.get("/:fileEnding", getSavedFileNameMiddleware, ({ fileToSave }, res) => {
  const content = readJsonFile(fileToSave);
  res.send(content);
});

app.post(
  "/:fileEnding",
  getSavedFileNameMiddleware,
  ({ fileToSave, body }, res) => {
    console.log({ fileToSave, body });
    const content = readJsonFile(fileToSave);
    content.push(body);
    writeJsonFile(fileToSave, content);
    res.send(content);
  }
);

function readJsonFile(path, defaultContent = []) {
  let content;
  if (fileExist(path)) {
    content = fs.readFileSync(path, { encoding: "utf-8" }).trim();
  }
  return content ? JSON.parse(content) : defaultContent;
}

function fileExist(path) {
  return fs.existsSync(path);
}

function writeJsonFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const port = 8080;
app.listen(port, () => {
  console.log(`App is listen on port ${port}`);
});
