console.log("Starting task memoize...")

// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }
  
// const compose = (...args) => {
//     if (!args || !args.length|| !args.map(a => typeof a).every(a => a === 'function') || args.map(a => a.length).filter(onlyUnique).length != 1) { return undefined; }
    
//     const helper = ({functions, args}) => {
//         let i = functions.length - 1;
//         let result = functions[i].apply(null, args);
//         functions.pop();
//         i--;
//         while (i >= 0) {
//             result = functions[i].apply(null, [result]);
//             i--;
//         }
//         return result;
//     }

//     return (...newArgs) => helper({functions: args, args:newArgs});
// }

const compose = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

const addOne = (x) => x + 1;
const sqrt = (x) => x * x;
const log = (x) => console.log(x);

addOneSqrtAndPrint = compose(log, sqrt, addOne);

addOneSqrtAndPrint(1); // 4