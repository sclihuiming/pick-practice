//parse json
function parseJson(strJson) {
  return eval('(' + strJson + ')');
}

/**
 * Boolean | Number| String 类型会自动转换成对应的原始值。
 * undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
 * 不可枚举的属性会被忽略
 * 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 * @param {*} info 
 */
//stringify json
//isFinite
function stringifyJson(info) {
  let type = Object.prototype.toString.call(info).slice(8, -1);
  if (type === 'Null') {
    return 'null'
  } else if (type === 'Number') {
    return isFinite(info) ? info.toString() : 'null';
  } else if (type === 'Boolean') {
    return info.toString();
  } else if (type === 'Function') {
    return '';
  } else if (type === 'Array') {
    let arr = [];
    for (let i = 0; i < info.length; i++) {
      let value = info[i];
      if (Object.prototype.toString.call(value).slice(8, -1) !== 'Function') {
        arr.push(stringifyJson(value));
      } else {
        arr.push('null');
      }
    }
    return '[' + arr.join(',') + ']';
  } else if (type === 'Object') {
    let arr = [];
    for (let key in info) {
      if (info.hasOwnProperty(key)) {
        let value = info[key];
        if (Object.prototype.toString.call(value).slice(8, -1) !== 'Function') {
          arr.push(stringifyJson(key) + ':' + stringifyJson(value));
        }
      }
    }
    return '{' + arr.join(',') + '}';
  } else {
    return info.toString();
  }
}










//test
console.log(parseJson('{"a":5}'))
console.log(stringifyJson({ "a": 5, b: null, c: 12, d: [12, 32, 4], f: function () { } }))



