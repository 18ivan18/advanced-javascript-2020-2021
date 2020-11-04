const fs = require('fs');
console.log("Starting promisify...");

const promisify = (fn) => (...args) => 
    new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
            if(err) { 
                reject(err); 
                return; 
            }
            resolve(result);
        })
    })  

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('./data.txt', { encoding: 'utf-8' })
  .then(content => content + ' more data')
  .then(data => writeFile('./data.txt', data))
  .then(() => console.log('Operation completed!'));