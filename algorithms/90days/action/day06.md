设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

insert(val)：当元素 val 不存在时，向集合中插入该项。
remove(val)：元素 val 存在时，从集合中移除该项。
getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
示例 :

// 初始化一个空的集合。
RandomizedSet randomSet = new RandomizedSet();

// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomSet.insert(1);

// 返回 false ，表示集合中不存在 2 。
randomSet.remove(2);

// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomSet.insert(2);

// getRandom 应随机返回 1 或 2 。
randomSet.getRandom();

// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomSet.remove(1);

// 2 已在集合中，所以返回 false 。
randomSet.insert(2);

// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
randomSet.getRandom();

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/insert-delete-getrandom-o1
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



```typescript
/**
 * 复杂度要o(1)， 就可以使用hashmap，array的数据结构，但是array的插入和删除的时间复杂度不是o(1),不满足条件；
 * 如果单纯使用hashmap，那么getRandom的时间复杂度就不是o(1);
 * 所以这里考虑将2这结合起来使用。insert和remove使用hashmap的特性，getRandom使用array的特性
 * 
 * hasmap的key就为传进来的val，值为数组的索引，该数组索引的值为val
 * 
 * 插入： 根据传进来的val获取数组的索引，判断索引是否有效，
 * 1.在数组中找到改索引对应的值，返回false
 * 2.索引无效，数组push改值，hashmap存入 val -> 数组的最后以后值的索引
 */

class RandomizedSet {
    map: any
    arr: number[]
    constructor() {
        this.arr = [];
        this.map = {};
    }

    insert(val: number): boolean {
        const index: number|undefined = this.map[val];
        if(index !== undefined && index < this.arr.length){
            return false;
        }else{
            this.arr.push(val);
            this.map[val] = this.arr.length - 1;
            return true;
        }
    }

    remove(val: number): boolean {
        const index: number|undefined = this.map[val];
        if(index !== undefined && index < this.arr.length){
            const lastNumber: number = this.arr[this.arr.length - 1];
            [this.arr[index], this.arr[this.arr.length - 1]] = [this.arr[this.arr.length - 1], this.arr[index]];
            this.arr.pop();
            this.map[lastNumber] = index;
            delete this.map[val]
            return true;
        }
        return false;
    }

    getRandom(): number {
        if(this.arr.length > 0){
            const index = Math.floor((Math.random() * this.arr.length));
            return this.arr[index];
        }
        return -1;
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
```