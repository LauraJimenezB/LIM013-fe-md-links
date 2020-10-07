#!/usr/bin/env node
//const { Stats } = require('fs');
/*
module.exports = () => {
   ...
};
*/


/*
const [,, ...args] = process.argv

console.log('Hello world ${args}')

const process = require ('process');
console.log (process.argv);


fs.readFile('./README.md', (err, data) => {
   if (err) throw err;
   console.log(data.toString());
 });

*/

const fs = require ('fs');
const path = require ('path');
const MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
const jsdom = require('jsdom');
const { dir } = require('console');
const { resolve } = require('path');
const { JSDOM } = jsdom;
const rutaR = './Intro.md';
const rutaA = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\README.md';
const rutaC = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\Intro.md';
const folder = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\markdowns';

function isValid (x) {
   let pathExists = fs.existsSync(x);
   return pathExists;
}

function convertPath (x) {
      let resolve = require('path').resolve
      return resolve(x);
}

function pathAbs (x) {
   return path.isAbsolute(x); 
}

function isFile (x) { 
   return fs.lstatSync(x).isFile();
}

function readFolder (dir) {
   const files = [];
   const filesContent = fs.readdirSync(dir);
   filesContent.forEach ((file) => {
      if (isFile(file)==false) {
         const filesdeFolder = readFolder (file);
         files.concat(filesdeFolder);
      } else {
         files.push(file);
      }
   });
   return files;
 }

 function isMd (x) {
   return path.extname(x)==='md';
 }

function getLinks (x) {
         const linksObj = [];
         const htmlFile = md.render(fs.readFileSync(x).toString());
         const dom = new JSDOM(htmlFile);
         const link = dom.window.document.querySelectorAll('a');
         link.forEach((e) => {
            linksObj.push ({
               href: dir,
               text: e.textContent,
               file: e.getAttribute('href'),
               });
               });
              return linksObj;
}
//console.log(getLinks(rutaR));

//const mdFile = rutaC;
/*
const mdLinks = (mdFile) => {
   return new Promise ((resolve, reject) => {
      const mdFiles = pathToFile(mdFile);
      const links = [];
      mdFiles.forEach((file)=> {
         links.push (getLinks(file));
      })
      //const links = getLinks (mdFiles);
      resolve (console.log(links));
   })
}
*/
//mdLinks(rutaR);


 function pathToFile(path) {
   let file = isValid(path);
   if (isValid(path)==false) {
      return 'ERROR';
   } else {
      if (pathAbs(path)==false) {
         path = convertPath (path);
      }
      let filesArray = [path]; 
      console.log(filesArray);  
      if (isFile(path)==false) {
         console.log(filesArray);  
            filesArray = readFolder(path);    } 
      return filesArray.filter(f => isMd(f));
   }
 }
console.log (pathToFile(rutaR));


module.exports = {isValid}