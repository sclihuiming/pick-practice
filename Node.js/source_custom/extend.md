# 继承原理

```js
function Super() {
  this.a = 1;
}

function Child() {
  // 属性继承
  Super.call(this);
  this.b = 2;
}
// 原型继承
Child.prototype = new Super();

const child = new Child();
child.a;  // 1
```

正式代码的原型继承，不会直接实例父类，而是实例一个空函数，避免重复声明动态属性.

```js
const extends = (Child, Super) => {
  const fn = function () {};
  
  fn.prototype = Super.prototype;
  Child.prototype = new fn();
  Child.prototype.constructor = Child;
};
```

或者

```js
function compact(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function extend(child, parent) {
    const prototype = compact(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
```

