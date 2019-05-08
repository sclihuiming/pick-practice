
/**
 *二叉树顺序遍历，使用迭代
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
  while(item){
    ret.push(item.val);
    let tmp  = item.right;

    while(tmp){
        stack.push(tmp);
        tmp = tmp.left;
    }
  }
  return ret;
}