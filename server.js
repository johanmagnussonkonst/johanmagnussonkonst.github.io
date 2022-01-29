const express = require("express");
const app = new express();
const router = express.Router();
const port = 3000;

//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join(__dirname, "art");
//passsing directoryPath and callback function

app.get("/getfolders", async (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    const result = {};
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      const innerDir = directoryPath + "/" + file;
      fs.readdir(innerDir, function (err, images) {
        result[file] = images;
        if (Object.keys(result).length === files.length) {
          res.json(result);
        }
      });
    });
  });
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
