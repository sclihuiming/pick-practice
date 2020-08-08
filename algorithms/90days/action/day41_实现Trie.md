实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

示例:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple"); // 返回 true
trie.search("app"); // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");
trie.search("app"); // 返回 true
说明:

你可以假设所有的输入都是由小写字母 a-z 构成的。
保证所有输入均为非空字符串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-trie-prefix-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang

type Trie struct {
    freq int
    nodeChar string
    childNodes []*Trie
}


/** Initialize your data structure here. */
func Constructor() Trie {
    return Trie{
        nodeChar: "root",
        childNodes: make([]*Trie, 26),
        freq: 0,
    }
}


/** Inserts a word into the trie. */
func (this *Trie) Insert(word sting)  {
    root := this
    size := len(word)
    for index, charCode := range word{
        sequences := charCode - 97
        if root.childNodes[sequences] == nil {
            newNode := &Trie{
                childNodes: make([]*Trie, 26),
            }
            newNode.nodeChar = string(charCode)
            root.childNodes[sequences] = newNode
        }
    
        if index == size - 1 {
            root.childNodes[sequences].freq++;
        }
        root = root.childNodes[sequences]
    }
    
}


/** Returns if the word is in the trie. */
func (this *Trie) Search(word string) bool {
    root := this
    for _, charCode := range word{
        sequences := charCode - 97
        if root.childNodes[sequences] != nil{
            root = root.childNodes[sequences]
        } else {
            return false
        }
    }
    return root != nil && root.freq > 0
}


/** Returns if there is any word in the trie that starts with the given prefix. */
func (this *Trie) StartsWith(prefix string) bool {
    root := this
    for _, charCode := range prefix{
        sequences := charCode - 97
        if root.childNodes[sequences] != nil{
            root = root.childNodes[sequences]
        }else {
            return false
        }
    }
    return root != nil
}


/**
 * Your Trie object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Insert(word);
 * param_2 := obj.Search(word);
 * param_3 := obj.StartsWith(prefix);
 */

```