
/**
 * 冒泡排序， 时间复杂度o(n^2)， 空间复杂度o(1)
 * @param {Array} sourceArray 待排序数组
 */
let bubbleSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
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
    return new Error('not array')
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
    return new Error('not array')
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
    return new Error('not array')
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
    return new Error('not array')
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
    return new Error('not array')
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
  return sort(sourceArray, 0, sourceArray.length);
}

/**
 * 最大堆排序 -正序
 * @param {*} sourceArray 
 */
let heapSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let array = sourceArray.slice();
  let len = array.length;
  //先建立最大堆
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(array, i, len);
  }
  // for (let i = len - 1; i > 0; i--) {
  //   [array[0], array[i]] = [array[i], array[0]];
  //   len--;
  //   heapify(array, 0, len);
  // }

  for (let i = 0; i < len; i++) {
    heapify(array, 0, len - i);
    [array[0], array[len - 1 - i]] = [array[len - 1 - i], array[0]];
  }
  return array;
  /**
   * 建立最大堆
   * @param {*} array 数组当成堆（完全二叉树）
   * @param {*} nodeIndex 当前节点位置
   * @param {*} size 节点总数
   */
  function heapify(array, nodeIndex, size) {
    if (nodeIndex < size) {
      let left = 2 * nodeIndex + 1; //完全二叉树特性
      let right = 2 * nodeIndex + 2;
      let maxIndex = nodeIndex; //默认父节点为最大值

      if (left < size && array[left] > array[maxIndex]) {
        maxIndex = left;
      }
      if (right < size && array[right] > array[maxIndex]) {
        maxIndex = right;
      }
      if (maxIndex !== nodeIndex) {
        [array[maxIndex], array[nodeIndex]] = [array[nodeIndex], array[maxIndex]];
        heapify(array, maxIndex, size);
      }
    }
  }
}

/**
 * 最小堆排序 -倒序
 * @param {*} sourceArray 
 */
let heapSort2 = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let array = sourceArray.slice();
  let len = array.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(array, i, len);
  }
  for (let i = 0; i < len; i++) {
    heapify(array, 0, len - i);
    [array[0], array[len - 1 - i]] = [array[len - 1 - i], array[0]];
  }

  return array;
  /**
   * 构造一个最小堆
   * @param {*} array 源
   * @param {*} nodeIndex 当前节点序列
   * @param {*} size 总节点数
   */
  function heapify(array, nodeIndex, size) {
    if (nodeIndex < size) {
      let left = 2 * nodeIndex + 1;
      let right = 2 * nodeIndex + 2;
      let minIndex = nodeIndex;//默认父节点为最小值的序列
      if (left < size && array[left] < array[minIndex]) {
        minIndex = left;
      }
      if (right < size && array[right] < array[minIndex]) {
        minIndex = right;
      }
      if (nodeIndex !== minIndex) {
        [array[nodeIndex], array[minIndex]] = [array[minIndex], array[nodeIndex]];
        heapify(array, minIndex, size);
      }
    }
  }
}

//  console.log(heapSort2([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83, 24]))

/**
 * 计数排序
 * @param {*} sourceArray 
 */
let CountingSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }

  let arr = sourceArray.slice();
  let bucket = [];
  for (let val of arr) {
    bucket[val] = (bucket[val] || 0) + 1;
  }
  let index = 0;
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[index++] = i;
      bucket[i]--;
    }
  }
  return arr;
}
// console.log(CountingSort([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83, 24]))

/**
 * 桶排序
 * @param {*} sourceArray 
 */
let BucketSort = function (sourceArray, bucketSize = 5) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let arr = sourceArray.slice();
  let maxValue = arr[0];
  let minValue = arr[0];
  for (let val of arr) {
    if (val < minValue) {
      minValue = val;
    }
    if (val > maxValue) {
      maxValue = val;
    }
  }
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  let buckets = [];
  //初始化桶
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor((arr[i] - minValue) / bucketSize);
    buckets[index].push(arr[i]);
  }
  // let arrIndex = 0;
  arr = [];
  //对每个桶排序
  for (let bucket of buckets) {
    if (bucket.length > 0) {
      bucket = insertSort(bucket);
      arr = arr.concat(bucket);
    }
  }
  return arr;
}
// console.log(BucketSort([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83, 24]))

/**
 * 基数排序
 * @param {*} sourceArray 
 */
let RadixSort = function (sourceArray) {
  if (Object.prototype.toString.call(sourceArray).slice(8, -1) !== 'Array') {
    return new Error('not array')
  }
  if (sourceArray.length < 2) {
    return sourceArray;
  }
  let arr = sourceArray.slice();
  //取最大值
  let maxValue = arr[0];
  for (let val of arr) {
    if (val > maxValue) {
      maxValue = val;
    }
  }
  //取最大值的长度
  let maxDigit = maxValue.toString().length;
  //进行基数排序
  let mod = 10;
  let dev = 1;
  for (let i = 0; i < maxDigit; i++ , mod *= 10, dev *= 10) {
    let counter = [];
    for (let j = 0; j < 20; j++) {
      counter[j] = [];
    }
    for (let j = 0; j < arr.length; j++) {
      let index = Math.floor((arr[j] % mod) / dev) + 10;
      counter[index].push(arr[j]);
    }
    arr = [];
    for (let bucket of counter) {
      if (bucket.length > 0) {
        arr = arr.concat(bucket);
      }
    }
  }
  return arr;
}

console.log(RadixSort([12, 3, 4, 67, 923, 8, 7, 4, 0, 1, 83,333333, 24]))


