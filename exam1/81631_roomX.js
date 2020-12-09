console.log("Advanced js test 1");

// Create a function called withPrivateState that accepts a constructor fn as an argument. 
// The function should extend the given constructor fn and return a wrapper that provides 
// a private object called state to the original constructor function and every method
// on the current context or on the prototype chain.

function Person(state, name, age, address) {
    // here state is an empty object where we will be setting our private variables
    state.name = name;
    state.address = address;
    state.age = age;
    this.getAgePlusX = function(state, x) {
        return state.age + x;
    }
}

function withPrivateState(constr) {
    const state = {};
    let instance = null;
    return function(...arguments) {
        if (instance === null) { instance = new constr(state, ...arguments); };
        Object.keys(constr.prototype).forEach(key => {
            if(typeof constr.prototype[key] === 'function') {
                this[key] = function(...arguments) {
                    return constr.prototype[key].call(instance, state, ...arguments);
                }
            }
        });
        Object.keys(instance).forEach(key => {
            if(typeof instance[key] === 'function') {
                this[key] = function(...arguments) {
                    return instance[key].call(instance, state, ...arguments);
                }
            }
        });
    }
}

Person.prototype.getName = function(state) { // <- the 'state' param gets passed by the withPrivateState wrapper
  // here state will be the modified from the constructor object that holds the name of the user
  return state.name;
};

Person.prototype.getAddress = function(state) { 
  return state.address;
};

Person.prototype.getAge = function(state) { 
    return state.age;
  };
  

// withPrivateState.prototype.__proto__ = Person.prototype;

// withPrivateState.prototype.getName = function() {
//     return instance.getName(state);
// };
  
Person = withPrivateState(Person);
const ivan = new Person('Ivan', 22, 'Plvodiv, ul. Borba'); // <- the 'state' param gets passed by the withPrivateState wrapper
const name = ivan.getName();
const address = ivan.getAddress();
const age = ivan.getAge();
const agePlusX = ivan.getAgePlusX(10);
console.log(name);
console.log(address);
console.log(age);
console.log(agePlusX);