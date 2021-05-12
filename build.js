const fs = require("fs");
const path = require("path");

const mapsDir = __dirname + "/mapy";
const indexPath = __dirname + '/mapy/index.html';

const files = getAllFilesFromFolder(mapsDir);
let out = "<ol>";
files.forEach((absPath) => {
    const relPath = path.relative(mapsDir, absPath);
    out += '<li><a href="' + relPath + '">' + relPath + "</a></li>\n";
});
out += '</ol>';

console.log(out);
fs.writeFileSync(indexPath, out);

// Source: https://stackoverflow.com/questions/20822273/best-way-to-get-folder-and-file-list-in-javascript
function getAllFilesFromFolder(dir) {
  var results = [];

  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(file));
    } else results.push(file);
  });

  return results;
}
