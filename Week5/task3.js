console.log("Executing func after atleast 10 secs...");

// Нашипете програма, която приема функция и връща резултата ѝ след не по-малко от 10 секунди, без значение дали подадената функция се изпълнява за 0 или 7.

const unOptimizedAsync = (fn) => {
    return new Promise((resolve, reject) => {
        const DELAY = 10_000;
        const startTime = new Date();
        const res = fn();
        const endTime = new Date();
        const timeDif = endTime - startTime; // diff in millisecs
        if (timeDif > DELAY) {reject('took too long');}
        setTimeout(resolve, DELAY - timeDif, res);
    })
}

const fn1 = () => {return "kur";}
unOptimizedAsync(fn1)
    .then(console.log)
    .catch(console.log);