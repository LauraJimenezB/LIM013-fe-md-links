#!/usr/bin/env node

const {mdLinks} = require ('./index.js');
//console.log(mdLinks);
const process = require ('process');


let command = process.argv.slice(2);
let path = process.argv.slice(2)[0];

if ((command[1]=== '--validate' && command[2]=== '--stats') || (command[1]=== '--stats' && command[2]=== '--validate')) {
    (mdLinks(path, {validate:true, stats:true})).then ((res)=>{
        console.log('Total: '+res.total);
        console.log('Unique: '+res.unique);
        console.log('Broken: '+res.broken);
      })
      /*
      .catch ((res)=> {
         console.log(res);
      })
      */
} else if (command[1]=== '--validate' && command[2]!== '--stats') {
    (mdLinks(path, {validate:true})).then ((res)=>{
        res.forEach ((links)=> {
            links = links.file + " " + links.href + " " + links.message + " " + links.status + " " + links.text;
            console.log(links);
        })
      })
      .catch ((res)=> {
          res.forEach ((links)=> {
              links = links.file + " " + links.href + " " + links.message + " " + links.status + " " + links.text;
              console.log(links);
          })
      })
} else if (command[1]=== '--stats' && command[2] !== '--validate') {
    (mdLinks(path, {stats:true})).then ((res)=>{
        console.log('Total: '+res.total);
        console.log('Unique: '+res.unique);
      })
      /*
      .catch ((res)=> {
        console.log(res);
      })
      */
    } else {
    (mdLinks(path, {validate:false})).then((res)=> {
        res.forEach ((links) => {
            links = links.file + " "+ links.href +" "+ links.text;
            console.log (links);
        })
    }); 
}


