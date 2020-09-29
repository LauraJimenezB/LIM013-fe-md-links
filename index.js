/*
module.exports = () => {
   ...
};
*/

//#!/usr/bin/env node
/*
const [,, ...args] = process.argv

console.log('Hello world ${args}')
*/

/*
const process = require ('process');
console.log (process.argv);

const fs = require ('fs');
fs.readFile('./README.md', function (err, data) {
   if (err) {
      console.log (err);
   }
   console.log (data.toString());
})
*/
/*
const http = require('http');

*/
const fs = require ('fs');

fs.Dirent.isFile('./README.md', function (err, data) {
   if (err) {
      console.log (err);
   }
   console.log (data.toString());
})
