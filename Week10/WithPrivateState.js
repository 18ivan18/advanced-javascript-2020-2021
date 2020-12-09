console.log("With Private State...")

function withPrivateState(klass) {
    const state = new WeakMap();
    const copyClass = function(...args) {
        state.set(this, {});
        klass.apply(this, [state.get(this), ...args]);
        for (const propName in this) {
          if (typeof this[propName] !== 'function') { continue; }
          const originalFn = this[propName];
          this[propName] = function(...args) {
            return originalFn.call(this, state.get(this), ...args);
          }
        }
      }
    
      copyClass.prototype = Object.create(klass.prototype);
      return copyClass;
}

// Като използвате WeakMap напишете функция withPrivateState, която взима като аргумент конструктор функция и връща нова конструктор функция. withPrivateState разширява прототипно подадената конструктор функция с друга, която използва WeakMap (вместо обекта state, който ползвахме в задачата от контролното), който съхранява частно състояние на обектите създанени чрез нея, като имаме възможност да достъпваме това частно състояние през конструктора като първи аргумент и като първи аргумент на всеки един метод, независимо дали е на прототипа или на текущия контекст.

function Person(state, name, age) {
  state.name = name;
  this.age = age;
}

Person.prototype.getName = function(state) {
  return state.name;
};

Person = withPrivateState(Person);

const ivan = new Person('Ivan', 20);
console.log(ivan.getName());