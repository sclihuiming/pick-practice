
/**
 * 冒泡排序， 时间复杂度o(n^2)， 空间复杂度o(1)
 * @param {Array} sourceArray 待排序数组
 */
let bubbleSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  for (let i = 1; i < sourceArray.length; i++) {
    let flag = true;//如果没有发生交换，就代表数据已经排好序了
    for (let j = 0; j < sourceArray.length - i; j++) {
      if (sourceArray[j] > sourceArray[j + 1]) {
        [sourceArray[j], sourceArray[j + 1]] = [sourceArray[j + 1], sourceArray[j]];
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
  return sourceArray;
}
// console.log(bubbleSort('23'))

/**
 * 选择排序， 时间复杂度o(n^2)
 * @param {*} sourceArray 
 */
let selectionSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let arr = sourceArray.slice();
  //排序
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i; //默认最小的值的索引是i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}
// console.log(selectionSort([12,3,4,67,923,8,7,4,0,1]))

/**
 * 插入排序，
 * @param {*} sourceArray 
 */
let insertSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let arr = sourceArray.slice();
  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i];
    let j = i;
    while (j > 0 && tmp < arr[j - 1]) {
      arr[j] = arr[j - 1];
      j--;
    }
    if (i !== j) {
      arr[j] = tmp;
    }
  }
  return arr;
}

/**
 * 希尔排序
 * @param {*} sourceArray 
 */
let shellSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let arr = sourceArray.slice();
  let length = arr.length;

  //根据经验公式 increment = increment/3 + 1 而来
  for (let step = Math.floor(length / 3) + 1; step > 0; step = Math.floor(step / 3)) {
    console.log(step)
    for (let i = step; i < length; i++) {
      let tmp = arr[i];
      let j = i;
      while ((j - step) >= 0 && tmp < arr[j - step]) {
        arr[j] = arr[j - step];
        j = j - step;
      }
      if (i !== j) {
        arr[j] = tmp;
      }
    }
  }
  return arr;
}

console.log(shellSort([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83, 24]))





