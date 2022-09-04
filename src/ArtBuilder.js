const fs = require("fs");
const dirTree = require("directory-tree");
const fsPromises = fs.promises;

const tree = dirTree("./assets/art", {extensions: /\.jpg|\.png|\.txt/ });

let result = tree.children;

const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });



const recursor =  function (inData) {
    inData.sort(function (a, b) {
        return collator.compare(a.name, b.name);
      });

    inData.forEach((child, index) => {
        child.displayName = child.name;
        if(child.name.includes('.jpg') || child.name.includes('.png') || child.name.includes('.txt')) {

            child.type = 'file';

            const fileEnding = child.name.substring(child.name.lastIndexOf(".") + 1);

            child.name = 'file'+index + '.' + fileEnding;

            const newPath =
            child.path.substring(0, child.path.lastIndexOf("/")) + "/" + child.name;

            // rename files to avoid issues with special characters
            fs.renameSync(child.path, newPath, (error) => {
                if(error) console.error(error)
            });
        } else {
            child.type = 'folder';
            child.name = 'folder'+index;
        }
        
        child.description = '';
        if(child.children) recursor(child.children)
    })
}

const recursor2 =  function (inData) {


    inData.forEach((child, index) => {
        if(child.name.includes('.jpg') || child.name.includes('.png') || child.name.includes('.txt')) {

        } else {
            const newPath =
            child.path.substring(0, child.path.lastIndexOf("/")) + "/" + child.name;

            // rename folders to avoid issues with special characters
            fs.renameSync(child.path, newPath, (error) => {
                if(error) console.error(error)
            });
            
    
        }
        
        if(child.children) recursor2(child.children)
    })
}
console.log("Running art builder")
recursor(result)

recursor2(result)

fs.writeFile("Art.json", JSON.stringify(result), function (err) {
    if (err) throw err;
    console.log("Saved!");
});





