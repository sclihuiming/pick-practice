
/**
 *二叉树顺序遍历，使用迭代
 *中序遍历 （左-根-右） 
 * @param {*} root 树
 */
let inorderTraversal = function (root) {
  let ret = [];
  if (!root) {
    return ret;
  }
  let stack = [root];
  let left = root.left;

  while (left) {
    stack.push(left);
    left = left.left;
  }
  let item = stack.pop();
  while (item) {
    ret.push(item.val);
    let tmp = item.right;

    while (tmp) {
      stack.push(tmp);
      tmp = tmp.left;
    }
    item = stack.pop();
  }
  return ret;
}

/**
 * 二叉树基于迭代的前序遍历
 * @param {*} root 
 */
let preorderTraversal = function (root) {
  let ret = [];
  if (!root) {
    return ret;
  }
  let stack = [root];
  let item = stack.pop();
  while (item) {
    ret.push(item.val);
    let left = item.left;
    let right = item.right;
    if (right) {
      stack.push(right);
    }
    if (left) {
      stack.push(left);
    }
    item = stack.pop();
  }
  return ret;
}

/**
 * 二叉树基于迭代的后续遍历
 * @param {*} root 
 */
let postorderTraversal = function (root) {
  let ret = [];
  if (!root) {
    return ret;
  }
  let stack = [root];
  let last = root;//用于标记上一次的元素，这里用root进行初始化

  while (stack.length > 0) {
    let item = stack[stack.length - 1];
    if (item.left === last ||
      item.right === last || //子节点已经遍历过了
      (item.left === null && item.right === null)) { //叶子节点为空
      last = stack.pop();
      ret.push(item.val);
    } else {
      let left = item.left;
      let right = item.right;
      if (right) {
        stack.push(right);
      }
      if (left) {
        stack.push(left);
      }
    }
  }

  return ret;
}




