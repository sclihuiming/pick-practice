//模仿new 构造函数

/**
 * 构造函数模仿版本
 * @param {*} func 
 */
function newFunc(func) {
  let res = {};
  if (func.prototype !== null) {
    res['__proto__'] = func.prototype;
  }
  let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if (ret && (typeof ret === 'object' || typeof ret === 'function')) {
    return ret;
  }
  return res;
}

/**
 * 模仿call的实现
 * @param {*} content 
 * @param  {...any} args 
 */
Function.prototype.callAction = function (content = window, ...args) {
  content.fn = this;
  let result = content.fn(...args);
  delete content.fn;
  return result;
}

/**
 * 模仿apply的实现
 * @param {*} content 
 * @param  {...any} args 
 */
Function.prototype.applyAction = function (content = window, args) {
  content.fn = this;
  let result = content.fn(...args);
  delete content.fn;
  return result;
}

/**
 * 模仿bind函数实现
 */
Function.prototype.bindAction = function (content, ...args) {
  if (Object.prototype.toString.call(content).slice(8, -1) !== 'Function') {
    return 'not a function';
  }
  let fn = this;
  let resFunc = function (...ar) {
    return fn.apply(this instanceof resFunc ? this : content, args.concat(ar));
  }
  function tmp() { };
  temp.prototype = this.prototype;
  resFunc.prototype = new temp();
  return resFunc;
}






//test
function go(a, b) {
  this.a = a;
  this.b = b;
}
let testOne = new go(1, 2);
console.log(testOne.a, testOne.b)
let testTwo = newFunc(go, 1, 2);
console.log(testTwo.a, testTwo.b)

console.log('===================')
let foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.applyAction(foo, ['black', '18']) // black 18 1


