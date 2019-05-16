
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

// console.log(shellSort([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83, 24]))

/**
 * 归并排序
 * @param {*} sourceArray 
 */
let mergeSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  //排序
  function sort(array) {
    if (array.length < 2) {
      return array;
    }
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(sort(left), sort(right));
  }
  //合并
  function merge(leftArr, rightArr) {
    let result = [];
    let index = 0;
    let leftIndex = 0;
    let rightIndex = 0;
    //归并
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        result[index++] = leftArr[leftIndex++];
      } else {
        result[index++] = rightArr[rightIndex++];
      }
    }
    //处理剩下的
    while (leftIndex < leftArr.length) {
      result[index++] = leftArr[leftIndex++];
    }
    while (rightIndex < rightArr.length) {
      result[index++] = rightArr[rightIndex++];
    }
    return result;
  }

  return sort(sourceArray);
}

/**
 * 快速排序
 * @param {*} sourceArray 
 */
let quickSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not a array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  //排序
  function sort(array, left, right) {
    if (left < right) {
      let index = partition(array, left, right);
      sort(array, left, index - 1);
      sort(array, index + 1, right);
    }
    return array;
  }
  //选定left为基准点，小于left的放在左边，大于left的放在右边
  function partition(array, left, right) {
    let index = left + 1;//从left右边第一个开始比较
    for (let i = index; i <= right; i++) {
      if (array[i] < array[left]) {
        if (i !== index) {
          [array[i], array[index]] = [array[index], array[i]];
        }
        index++;
      }
    }
    [array[left], array[index - 1]] = [array[index - 1], array[left]];
    return index - 1;
  }
  return sort(sourceArray,0 ,sourceArray.length);
}





