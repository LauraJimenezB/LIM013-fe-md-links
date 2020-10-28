const fs = require ('fs');
const path = require ('path');
const MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
const jsdom = require('jsdom');
const { dir } = require('console');
const { resolve } = require('path');
const { JSDOM } = jsdom;
//const chalk = require('chalk');
const https = require('https');
const fetch = require('node-fetch');

const rutaR = './Intro.md';
const rutaA = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\README.md';
const rutaC = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\Intro.md';
const folder = './ForTests';
const rutaB = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md';


const isValid = (path) => {return  fs.existsSync(path)}

const convertPath = (path) => {
      let resolve = require('path').resolve;
      return resolve(path);
}

const pathAbs = (x) => {return path.isAbsolute(x)}
//console.log(pathAbs(rutaA));

const isFile = (x) => { return fs.lstatSync(x).isFile()}

const readFolder = (dir) => {
   let files = [];
   const filesContent = fs.readdirSync(dir);
   filesContent.forEach ((file) => {
      file = dir + '\\' + file;
      if (isFile(file)==false) {
         let folderFiles = [];
         folderFiles = readFolder(file);
         files = files.concat(folderFiles);
      } else {
         files.push(file);
      }
   });
   return files;
 }
 //console.log(readFolder(folder));

const isMd = (file) => {return path.extname(file)==='.md'}
 //console.log(isMd(rutaR));

const pathToFile = (path) => {
   if (isValid(path)==false) {
      return 'ERROR';
   } else {
      if (pathAbs(path)==false) {
         path = convertPath (path);
      }
      let filesArray = [path];   
      if (isFile(path)==false) { 
         filesArray = readFolder(path); 
      } 
      return filesArray.filter(f => isMd(f));
   }
 }
//console.log (pathToFile(folder));


const getLinks = (file) => {
   const linksObj = [];
   const htmlFile = md.render(fs.readFileSync(file).toString());
   const dom = new JSDOM(htmlFile);
   const links = dom.window.document.querySelectorAll('a');
   links.forEach((e) => {
         linksObj.push (
         {
            file: file,
            href: e.getAttribute('href'),
            text: e.textContent,
         });
      })
   return linksObj;
}
//console.log('getLinks', getLinks(rutaB));

const dirToLinKs = (dir) => {
   const mdFiles = pathToFile(dir);
   let links = [];
   mdFiles.forEach((mdFile)=> {
      let obtainedLinks = getLinks(mdFile);
      links = links.concat (obtainedLinks);
   })
   return links;
}
//console.log(dirToLinKs(folder));


const validate = (array) => {
   const arrayLinks = [];
   const links = array.forEach((e) => {
      arrayLinks.push(
         fetch(e.href)
         .then(res => {
            let linksObj = {
            file: e.file,
            href: e.href,
            text: e.text,
            status: res.status,
            message: res.statusText,
            }
            return linksObj;
         })
         .catch(res => {
            let linksObj = {
               file: e.file,
               href: e.href,
               text: e.text,
               status: res.status,
               message: 'fail',
               }
               return linksObj;
      })
      );
   })
   return Promise.all(arrayLinks)
}
/*
console.log('dirToLinks', dirToLinKs(folder));

validate(dirToLinKs(folder)).then((res)=>{
   console.log(res);
})
*/

const stats = (array) => {
   const arrayTotal = [];
   const links = array.forEach((e) => {
      arrayTotal.push(e.href);
      })  
   
   const arrayUnique = [];
   arrayTotal.forEach(e => {
      if (!(e in arrayTotal)) {
        arrayTotal[e] = true
        arrayUnique.push(e)
      }
    })

   let LinkStats = {
      total: arrayTotal.length,
      unique: arrayUnique.length,
   }
   return LinkStats;
}
//console.log(stats(dirToLinKs(folder)));

module.exports = {isValid, pathAbs, convertPath, readFolder, getLinks, pathToFile, dirToLinKs, validate, stats}