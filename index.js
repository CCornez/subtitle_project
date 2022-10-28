import fs from 'fs';
import rl from 'readline-sync';

const folderToScrape =
  process.argv[2] ||
  rl.question('provide a path to you your subtitle folder...\n');

if (!fs.existsSync(folderToScrape)) {
  throw 'folder could not be found !!!';
}

const folderContent = fs.readdirSync(folderToScrape);

let allContent = '';
for (let i = 0; i < folderContent.length; i++) {
  allContent += fs.readFileSync(folderToScrape + '/' + folderContent[i]);
}

allContent = allContent
  .replace(/[^a-z]+/gi, ' ')
  .replace(/font|color/gi, ' ')
  .toLowerCase()
  .split(' ')
  .filter((word) => word.length >= 4);

const counts = allContent.reduce((obj, word) => {
  obj[word] = obj[word] + 1 || 1;
  return obj;
}, {});

const countsSorted = Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 100)
  .reduce((obj, word) => {
    obj[word[0]] = word[1];
    return obj;
  }, {});

console.log(countsSorted);
