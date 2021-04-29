//乞丐版本的深复制
function deepCopyPoor(obj) {
  return JSON.parse(JSON.stringify(obj));
}

//够用
function deepCopy(info) {
  let result;
  let type = Object.prototype.toString.call(info).slice(8, -1);

  switch (type) {
    case 'Object':
      result = {};
      for (let key in info) {
        let clas = typeof info[key];
        console.log(clas, info)
        result[key] = clas === 'object' || clas === 'function' ? deepCopy(info[key]) : info[key];
      };
      break;
    case 'Array':
      result = [];
      for (let key in info) {
        let clas = typeof info[key];
        result[key] = clas === 'object' || clas === 'function' ? deepCopy(info[key]) : info[key];
      };
      break;
    case 'Function':
      //这里还是返回的函数引用
      result = info;
      break;
    default:
      result = info;
  }
  return result;
}


// 利用 WeakMap 解决循环引用
let map = new WeakMap()
function deepClone(obj) {
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj)
    }
    let newObj
    if (obj instanceof Array) {
      newObj = []     
    } else if (obj instanceof Function) {
      newObj = function() {
        return obj.apply(this, arguments)
      }
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags)
    } else if (obj instanceof Date) {
      newobj = new Date(obj)
    } else {
      newObj = {}
    }
    // 克隆一份对象出来
    let desc = Object.getOwnPropertyDescriptors(obj)
    let clone = Object.create(Object.getPrototypeOf(obj), desc)
    map.set(obj, clone)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }
  return obj
}


//测试
let info = {
  a: 1,
  b: [1, 2, 3],
  c: function () {
    return 1 + 2
  },
  d: Symbol(42)
}

let test = deepCopy(info);
test.a = 9;
test.b[0] = 2;
test.d = Symbol(4555);
console.log(test)
console.log(info)


