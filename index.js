
const {pathToFile, getLinks, dirToLinKs, validate, stats} = require ('./utils.js')
const folder = './ForTests';
const rutaC = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\Intro.md';

const https = require('https');

const mdLinks = (dir, option) => {
   return new Promise ((resolve, reject) => {
     const mdFiles = pathToFile(dir);
     if (mdFiles=='ERROR') {
        reject('El link no es válido');
     } else {
        links = dirToLinKs(dir);
      
        if (option.validate==true && option.stats==true) {
            validate(links).then((res)=>{
               let broken = [];
               res.forEach(e => {
                  if (e.message === 'fail') {
                     broken.push(e);
                  }
               })
               
               let objStats= stats(links);
               objStats.broken=broken.length;
               resolve(objStats);
            });
         } else if (option.validate==true) {
           validate(links).then((res)=>{
            resolve(res);
           });
         } else  if  (option.stats==true) {
            resolve(stats(links));
         } else {
           resolve(links);
        }
     }
  })
}
/*
(mdLinks(folder, {validate:false, stats:false})).then ((res)=>{
  console.log(res);
})

.catch ((res)=> {
   console.log(res);
})
*/
module.exports = {mdLinks} 

