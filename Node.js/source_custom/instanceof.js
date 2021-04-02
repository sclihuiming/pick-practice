
// instance 实现
function myInstanceof(left, right){
    if(left === null || typeof left !== 'object'){
        return false
    }

    let proto = Object.getPrototypeOf(left)
    while(true){
        if(proto === null){
            return false
        } else if(proto === right){
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}