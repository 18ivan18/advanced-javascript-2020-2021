console.log("Напишете функция, която по подаден списък и фунцкия за сравнение, връща най-малкият елемент...");

const minElem = ({arr, comparator}) => {
    if (!arr || !arr.length || !Array.isArray(arr)) { return undefined; };
    // return arr.sort(comparator)[0];
    return arr.reduce((accumulator, currentValue) => comparator(accumulator, currentValue) ? accumulator : currentValue)
}

const arr = [1, 4, 3, -17, 7, 19, 9, 6];
// const comparator = (a, b) => {
//     if (a < b) {
//         return 1;
//     }
//     if (a > b) {
//         return -1;
//     }
//     return 0;
// };
// const comparator2 = (a, b) => {
//     if (a > b) {
//         return 1;
//     }
//     if (a < b) {
//         return -1;
//     }
//     return 0;
// };
// const comparator3 = (a, b) =>{
//     if (Math.abs(a) < Math.abs(b)) {
//         return 1;
//     }
//     if (Math.abs(a) > Math.abs(b)) {
//         return -1;
//     }
//     return 0;
// };
// const comparator4 = (a, b) =>{
//     if (Math.abs(a) > Math.abs(b)) {
//         return 1;
//     }
//     if (Math.abs(a) < Math.abs(b)) {
//         return -1;
//     }
//     return 0;
// };


const comparator = (a, b) => a > b;
const comparator2 = (a, b) => a < b;
const comparator3 = (a, b) => Math.abs(a) < Math.abs(b)
const comparator4 = (a, b) => Math.abs(a) > Math.abs(b);



console.log(minElem({arr, comparator}));
console.log(minElem({arr, comparator: comparator2}));
console.log(minElem({arr, comparator: comparator3}));
console.log(minElem({arr, comparator: comparator4}));