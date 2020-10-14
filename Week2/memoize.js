console.log("Starting task memoize...")

const memoize = (func) => {
    if (!func || typeof func !== 'function' ) { return undefined; }
    const map = new Map();
    return (...args) => {
        if (map.has(JSON.stringify(args))) {
            return map.get(JSON.stringify(args));
        }
        console.log("Calculating " + args);
        const result = func.apply(null, args);
        map.set(JSON.stringify(args), result);
        return result;
    }
}


const sum = (x, y) => { return x + y; }
const memSum = memoize(sum);
console.log(memSum(2,3)); // пресмята, връща 5
console.log(memSum(3,3)); // пресмята, връща 6
console.log(memSum(2,3)); // директно връща 5 без да смята