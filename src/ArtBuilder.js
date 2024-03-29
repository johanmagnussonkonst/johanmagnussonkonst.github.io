const fs = require("fs");

const dirTree = require("directory-tree");

const tree = dirTree("./assets/art", {
  extensions: /\.jpg|\.jpeg|\.png|\.txt/,
});

let result = tree.children;

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const recursor = function (inData, reverse = false) {
  if (reverse) {
    inData.sort(function (a, b) {
      return collator.compare(b.name, a.name);
    });
  } else {
    inData.sort(function (a, b) {
      return collator.compare(a.name, b.name);
    });
  }

  inData.forEach((item) => {
    if (item.children) {
      item.type = "folder";
      item.displayName = item.name;
      if (item.name === "utställningar") recursor(item.children, true);
      else recursor(item.children);
    } else {
      let displayName = item.name;
      displayName = displayName.replace(".jpg", "");
      displayName = displayName.replace(".png", "");
      displayName = displayName.replace(".jpeg", "");

      if (item.name.includes("(q)")) {
        displayName = displayName.replace("(q)", "?");
      }
      if (item.name.includes("(copy)")) {
        displayName = displayName.replace("(copy)", "");
      }

      item.displayName = displayName;
    }
  });
};

recursor(result);

console.log("waiting");

setTimeout(() => {
  fs.writeFile("art.json", JSON.stringify(result), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}, 1000);
