const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

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
        child.description = '';
        child.displayName = child.name;
        if(child.name.includes('.jpg') || child.name.includes('.png') || child.name.includes('.txt')) {
            child.displayName = child.name.substring(0, child.name.lastIndexOf('.'));


            child.type = 'file';

            const fileEnding = child.name.substring(child.name.lastIndexOf(".") + 1);

            child.name = 'file'+index + '.' + fileEnding;

            const newPath =
            child.path.substring(0, child.path.lastIndexOf("/")) + "/" + child.name;


            // rename files to avoid issues with special characters
            fs.renameSync(child.path, newPath);

            child.path = newPath;
        } else {

            const key = uuidv4();
            child.type = 'folder';
            child.name = 'folder'+key;
        }  

        if(child.children) recursor(child.children)

    })


}

const renameFolders =  function (inData) {
    inData.forEach((child, index) => {
        if(child.name.includes('.jpg') || child.name.includes('.png') || child.name.includes('.txt')) {

        } else {
            const newPath =
            child.path.substring(0, child.path.lastIndexOf("/")) + "/" + child.name;

            // rename folders to avoid issues with special characters
            fs.renameSync(child.path, newPath);
            child.path = newPath;

            child.children.forEach((grandChild) => {
                grandChild.path = newPath + '/' + grandChild.displayName;
            })

        } 
    })
}

const renameInnerFolders =  function (inData) {
    inData.forEach((child, index) => {
        if(child.children) {
            child.children.forEach((grandChild) => {
                if(grandChild.name.includes('.jpg') || grandChild.name.includes('.png') || grandChild.name.includes('.txt')) {

                } else {
                    const newPath =
                    grandChild.path.substring(0, grandChild.path.lastIndexOf("/")) + "/" + grandChild.name;

                    // rename folders to avoid issues with special characters
                    fs.renameSync(grandChild.path, newPath);

                    child.path = newPath;
                } 
            })
      
        }

    })
}

recursor(result)

renameFolders(result)

console.log('waiting')

setTimeout(() => {
    renameInnerFolders(result) 
    fs.writeFile("Art.json", JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log("Saved!");
    });


  }, 1000)




