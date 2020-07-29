不使用任何库函数，设计一个跳表。

跳表是在 O(log(n)) 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。

例如，一个跳表包含 [30, 40, 50, 60, 70, 90]，然后增加 80、45 到跳表中，以下图的方式操作：

![img](https://assets.leetcode.com/uploads/2019/09/27/1506_skiplist.gif)


Artyom Kalinin [CC BY-SA 3.0], via Wikimedia Commons

跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 O(n)。跳表的每一个操作的平均时间复杂度是 O(log(n))，空间复杂度是 O(n)。

在本题中，你的设计应该要包含这些函数：

bool search(int target) : 返回target是否存在于跳表中。
void add(int num): 插入一个元素到跳表。
bool erase(int num): 在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。
了解更多 : https://en.wikipedia.org/wiki/Skip_list

注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。

样例:

Skiplist skiplist = new Skiplist();

skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // 返回 false
skiplist.add(4);
skiplist.search(1);   // 返回 true
skiplist.erase(0);    // 返回 false，0 不在跳表中
skiplist.erase(1);    // 返回 true
skiplist.search(1);   // 返回 false，1 已被擦除
约束条件:

0 <= num, target <= 20000
最多调用 50000 次 search, add, 以及 erase操作。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-skiplist
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



```golang
const (
    maxLevel int = 16
    probability float32 = 0.25
)

type Node struct{
    next []*Node
    Key   int
    Value   int
}

func newNode(key int, value int, level int) *Node{
    return &Node{
        Key: key, 
        Value: value,
        next: make([]*Node, level),
    }
}

func randomLevel() int {
    level := 1
    for rand.Float32() < probability && level < maxLevel {
        level++
    }
    return level
}

type Skiplist struct {
    header *Node
    level int
    size int
}


func Constructor() Skiplist {
    return Skiplist{
        header: &Node{
            next: make([]*Node, maxLevel),
        },
        level: 1,
    }
}


func (this *Skiplist) Search(target int) bool {
    x := this.header
    // 从最上层开始查找,最上层的元素最少
    for index := this.level - 1; index >= 0; index--{
        for x.next[index] != nil && x.next[index].Value < target{
            x = x.next[index]
        }
    }
    x = x.next[0]
    if x != nil && x.Value == target{
        return true
    }
    return false
}


func (this *Skiplist) Add(num int)  {
    x := this.header
    addPos := make([]*Node, maxLevel)
    for index := this.level - 1; index >= 0; index--{
        for {
            temp := x.next[index]
            if temp == nil || temp.Value > num{
                addPos[index] = x
                break
            } else {
                x = x.next[index]
            }
        }
    }

    realLevel := randomLevel()
    if realLevel > this.level{
        this.level++
        addPos[this.level - 1] = this.header
        realLevel = this.level
    }

    node := newNode(num, num, realLevel)
    // fmt.Printf("1111%+v\n",update)

    for index := 0; index < realLevel; index++{
        node.next[index] = addPos[index].next[index] 
        addPos[index].next[index] = node
    }
    this.size++
}


func (this *Skiplist) Erase(num int) bool {
	current := this.header
	flag := false
	for i := this.level - 1; i >= 0; i-- {
		for current.next[i] != nil {
			if current.next[i].Value == num {
				tmp := current.next[i]
				current.next[i] = tmp.next[i]
				tmp.next[i] = nil
				flag = true
				break
			} else if current.next[i].Value > num {
				break
			} else {
				current = current.next[i]
			}
		}
	}
	return flag
}


/**
 * Your Skiplist object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Search(target);
 * obj.Add(num);
 * param_3 := obj.Erase(num);
 */
```