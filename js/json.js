//parse json
function parseJson(strJson) {
  return eval('(' + strJson + ')');
}

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
      if (Object.prototype.toString.call(value).slice(8, -1) !== 'Function') {
        arr.push(stringifyJson(info[i]));
      } else {
        arr.push('null');
      }
    }
    return '[' + arr.join(',') + ']';
  } else if (type === 'Object') {
    let arr = [];
    for (let key in info) {
      let value = info[key];
      if (Object.prototype.toString.call(value).slice(8, -1) !== 'Function') {
        arr.push(stringifyJson(key) + ':' + stringifyJson(value));
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



