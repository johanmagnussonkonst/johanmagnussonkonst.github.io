var fs = require("fs");
var path = require("path");

var directoryTreeToObj = function (dir, done) {
  var results = [];

  fs.readdir(dir, function (err, list) {
    if (err) return done(err);

    var pending = list.length;

    if (!pending) {
      return done(null, {
        name: path.basename(dir),
        displayName: path.basename(dir),
        type: "folder",
        children: results,
      });
    }

    list.forEach(function (file, fileIndex) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          directoryTreeToObj(file, function (err, res) {
            const name = path.basename(file);
            let description = "";

            res.forEach((file, index) => {
              if (file.type === "description") {
                description = file.content;
                res.splice(index, 1);
                return;
              }
            });

            const newName = "folder" + fileIndex;

            results.push({
              name: newName,
              displayName: name,
              description: description,
              type: "folder",
              children: res,
            });
            if (!--pending) done(null, results);
          });
        } else {
          const name = path.basename(file);

          if (
            name.includes(".jpg") ||
            name.includes(".png") ||
            name.includes(".jpeg")
          ) {
            // rename files to avoid issues with åäö
            const fileEnding = name.substring(name.lastIndexOf(".") + 1);
            const newName = "file" + fileIndex + "." + fileEnding;
            const newPath =
              file.substring(0, file.lastIndexOf("/")) + "/" + newName;
            fs.rename(file, newPath, () => {});

            results.push({
              type: "file",
              name: newName,
              displayName: name.substring(0, name.lastIndexOf(".")),
            });
          }
          if (name.includes(".txt")) {
            let content = fs.readFileSync(file, "utf8");
            results.push({
              type: "description",
              content: content,
            });
            if (!name.startsWith(".")) {
              const newName =
                file.substring(0, file.lastIndexOf("/")) + "/." + name;
              fs.rename(file, newName, () => {});
            }
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var renameFolders = function (dir, done) {

  fs.readdir(dir, function (err, list) {
    if (err) return done(err);

    var pending = list.length;

    list.forEach(function (file, fileIndex) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          renameFolders(file, function (err, res) {
            console.log(file)
            const name = path.basename(file);
      
            const newName = "folder" + fileIndex;
            const newPath =
              file.substring(0, file.lastIndexOf("/")) + "/" + newName;

            console.log("new: ",newPath)
            fs.rename(file, newPath, () => {});
            if (!--pending) done(null);
          });
        } else {
          if (!--pending) done(null);
        }
      });
    });
  });
};

var dirTree = "./assets/art";

directoryTreeToObj(dirTree, function (err, res) {
  console.log("building art.json");
  if (err) console.error(err);

  renameFolders(dirTree, function (err, res2) {

    if (err) console.error(err);


    var collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
  
    res.sort(function (a, b) {
      return collator.compare(a.displayName, b.displayName);
    });
  
    res.forEach((child) => {
      if (child.type === "folder" && child.children) {
        child.children.sort(function (a, b) {
          return collator.compare(a.displayName, b.displayName);
        });
      }
    });
  
    fs.writeFile("Art.json", JSON.stringify(res), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  })
/*
  fs.readdir(dirTree, function (err, list) {
    list.forEach(function (file, fileIndex) {
      file = path.resolve(dirTree, file);

      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {

          console.log(file)
          directoryTreeToObj(file, function (err, res) {
            const newName = "folder" + fileIndex;
            const newPath =
              file.substring(0, file.lastIndexOf("/")) + "/" + newName;
            fs.rename(file, newPath, () => {});
          })

        }
      });
    });
  });*/

});
