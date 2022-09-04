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
    
    let length = list.length;
    let index = 0;
    folderIndex = 0;

    let doStuff = function () {
      if(!list[index]) return done(null, null)

      file = path.resolve(dir, list[index])

      fs.stat(file, function (err, stat) {
        index += 1;
        if(stat && stat.isDirectory()) {
          folderIndex += 1;
          const newName = "folder" + folderIndex;
          const newPath =
            file.substring(0, file.lastIndexOf("/")) + "/" + newName;

          fs.rename(file, newPath, (error) => {
            if(error) console.error(error)
            if(index <= length) {
              doStuff()
            }
          })

        } else {
          if(index <= length) {
            doStuff()
          }
        }
      })
    }
    
    doStuff()

  });


};

var sortAndPrint = function(res) {
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
};

var dirTree = "./assets/art";

directoryTreeToObj(dirTree, function (err, res) {
  console.log("building art.json");
  if (err) console.error(err);

  renameFolders(dirTree, function (err2, res2) {
    if(err2) console.error(err2);

    fs.readdir(dirTree, function (err, list) {

      let length = list.length;
      let index = 0
      let folderIndex = 0;


      let doOtherStuff = function() {
        if(!list[index]) {
          sortAndPrint(res)
          return
        };

        file = path.resolve(dirTree, list[index])

        fs.stat(file, function (err, stat) {
          index += 1;
          if(stat && stat.isDirectory()) {

            renameFolders(file, function(err3, res3) {
              console.error(err3)
              if(index <= length) {
                doOtherStuff();
              }

            })   
          } else {
            if(index <= length) {
              doOtherStuff();
            }
          }

        })

      }

      doOtherStuff();

    })


  }) 



});
