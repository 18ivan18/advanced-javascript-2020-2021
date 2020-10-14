console.log("Напишете функция, която по подаден списък и фунцкия за проверка, разделя подадения масив на две групи в зависимост от резултата на подадената функция...");

const split = ({arr, func}) => {
    if (!arr || !arr.length || !Array.isArray(arr)) { return undefined; };
    // const group1 = [];
    // const group2 = [];  

    // arr.forEach(elem => {
    //     if (func(elem)) {
    //         group1.push(elem);
    //     } else {
    //         group2.push(elem);
    //     }
    // })

    return {group1: arr.filter(el => func(el)), group2: arr.filter(el => !func(el))};
}

const arr = [1, 2, 3, -5, -3, 1];
const check1 = (a) => a % 2 == 0;
const check2 = (a) => a >= 0;

console.log(split({arr, func: check1}))
console.log(split({arr, func: check2}))