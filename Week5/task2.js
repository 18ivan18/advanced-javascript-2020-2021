const fs = require('fs');
console.log("Checking for differences...");

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

//Напишете програма, която асинхронно чете през 5 секунди дали има промени по подадени 3 файла, ако има такива промени, да ги печата. Програмата да спира да проверява след 60 секунди без такива.

const files = {};
const checkForDifferences = (fileName) => {
    return readFile(fileName, { encoding: 'utf-8' })
        .then(content => {
            if(!files[fileName]) {
                files[fileName] = content;
                return false;
            }
            if(content !== files[fileName]) {
                console.log(content);
                files[fileName] = content;
                return true;
            }
            files[fileName] = content;
            return false;
        })
        .catch(err => console.log(err));
}

const checkFiles = (file1, file2, file3) => {
    let noChanges = 0;
    
    const id = setInterval(() => {
        Promise.all([checkForDifferences(file1), checkForDifferences(file2), checkForDifferences(file3)])
            .then(resp => {
                noChanges = resp.reduce((acc, elem) => acc || elem, false) ? 0 : noChanges + 1;
                if(noChanges === 12) {
                    clearInterval(id);
                    console.log("Exiting...");
                }  
            })
            .catch(err => console.log(err));
    }, 5000);
}

checkFiles("./file1.txt", "./file2.txt", "./file3.txt");