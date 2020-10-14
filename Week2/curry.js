console.log("Starting task memoize...")

const curry = (func) => {
    if (!func || typeof func !== 'function' ) { return undefined; }
    const helper = ({func, args, prevArgs}) => {
        if (args.length + prevArgs.length >= func.length) {
            return func.apply(null, [...prevArgs, ...args]);
        }
        return (...newArgs) => helper({func, args: newArgs, prevArgs: [...prevArgs, ...args]});
    }
    return (...args) => helper({func, args, prevArgs: []});
}


const trippleAdd = (a, b, c) => {
    return a + b + c;
}

cTrippleAdd = curry(trippleAdd);

console.log(cTrippleAdd(1)(2)(3)); //6
console.log(cTrippleAdd(1, 2)(3)); //6
console.log(cTrippleAdd(1, 2, 3)); //6  
