const START = 0;

// const input1 = "3 + 2 = 5";
// const inpyt2 = "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9";

const createString = (numbers, operations) => {
    let result = "", i;
    for(i = 0; i < numbers.length - 1; i++) {
        result += numbers[i];
        result += " ";
        result += operations[i];
        result += " ";
    }
    result += numbers[i];
    return result;
}

const eval = (num1, num2, operation) => {
    switch (operation) {
        case '+':
            return (+num1) + (+num2);
        case '-':
            return (+num1) - (+num2);
        case '*':
            return (+num1) * (+num2);
        case '/':
            return Math.floor((+num1) / (+num2));         
    }
}

const transform = (input) => {
    let i, num, current, doOperation = false, operationDone = false;
    i = 0;
    let operations = [];
    let numbers = [];
    while (i < input.length) {
        current = input[i];
        if (current >= '0' && current <= '9') {
            num = "";
            while (current >= '0' && current <= '9') {
                num += current;
                i++;
                current = input[i];
            }
            numbers.push(num);
            
        
        if (doOperation && !operationDone) {
            let num1 = numbers.pop();
            let num2 = numbers.pop();
            let operation = operations.pop();
            numbers.push(eval(num2, num1, operation));
            operationDone = true;
        }
        }
        
        if (['*', '+', '-', '/'].includes(current)) {
            if(['*', '/'].includes(current)) {
                doOperation = true;
            }
            operations.push(current);
        }   
        i++;
    }
    
    if(!operationDone) {
        let num1 = numbers[0];
        let num2 = numbers[1];
        let operation = operations[0];
        numbers = [(eval(num1, num2, operation).toString()), ...numbers.slice(2, numbers.length)];
        operations = operations.slice(1, operations.length);
    }
    return createString(numbers, operations);
}

const evaluate = (str1, str2) => {
    return transform(str1.trim()) === str2.trim();
}

const compare = (steps) => {
    let numberOfRightSteps = 0;
    let numberOfSteps = steps.length - 1;
    while (numberOfSteps > 0) {
        if (evaluate(steps[numberOfSteps - 1], steps[numberOfSteps])) {
            numberOfRightSteps++;
        }
        numberOfSteps--;
    }
    return numberOfRightSteps;
}

const grade = (input) => {
    const steps = input.split('=');
    let numberOfRightSteps = compare(steps);
    console.log(numberOfRightSteps.toString() + " / " + (steps.length - 1).toString());
}

const main = () => {
    console.log("Grading...\n");
    const input1 = "3 + 2 = 5";
    const input2 = "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9";
    const input3 = "1 + 2 * 1 = 3 * 1 = 3"
    const input4 = "7 - 3 * 2 + 1 = 7 - 6 + 1 = 1 + 1 = 2"
    grade(input4); 
}

main();

// 1 + 2 * 8 / 2 + 3 = 1 + 16 / 2 + 3