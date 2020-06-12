运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

进阶:

你是否可以在 O(1) 时间复杂度内完成这两种操作？

示例:

LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得关键字 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lru-cache
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处


```golang
/** 
* 结构体
* LRUCache 中Size为缓存的大小， l是golang中的双向链表，存key元素， Data是一个hashmap
* element  是 Data中hashmap的值，其中 Value是值， e是这个key在链表中的引用
* 函数 
*   get ：先去hashmap中找key，如果找到，将该值在链表中的值移动到链表尾部，代表最新使用， 返回element的值，  否则返回-1
*   put ： 1.如果存在，那么更新链表，更新key对应的值
*          2. 如果不存在，将key放入链表尾部，将key-value存入haspmap， 并且将链表最后一个元素存入hashmap
*          3.判断hashmap是否超出缓存的容量
*/

type LRUCache struct {
    Size int
    l *list.List
    Data map[int]*element
}

type element struct{
    Value int
    e *list.Element
}


func Constructor(capacity int) LRUCache {
    return LRUCache{
        Size: capacity,
        Data: map[int]*element{},
        l: list.New(),
    }
}


func (this *LRUCache) Get(key int) int {
    if element, ok := this.Data[key]; ok{
        this.l.MoveToBack(element.e)
        return element.Value
    }
    return -1;
}


func (this *LRUCache) Put(key int, value int)  {
    if this.Get(key) != -1{
        this.l.MoveToBack(this.Data[key].e)
        this.Data[key].Value = value
    } else {
        this.l.PushBack(key)
        this.Data[key] = &element{
            Value: value,
            e: this.l.Back(),
        }
    }
    if len(this.Data) > this.Size{
        delete(this.Data, this.l.Remove(this.l.Front()).(int))
    }
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * obj := Constructor(capacity);
 * param_1 := obj.Get(key);
 * obj.Put(key,value);
 */
```