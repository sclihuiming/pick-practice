function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);


//  封装后 ---------->

function clone(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    const prototype = clone(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

//使用Object.create来实现继承
function prototype2(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}


// 当我们使用的时候：
prototype(Child, Parent);