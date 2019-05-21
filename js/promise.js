

//根据网上提供的promise实现的版本，实现自己的promise
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function mypromise(constructor) {
  let that = this;
  that.status = PENDING;
  that.value = undefined;
  that.reason = undefined;

  function reslove(value) {
    if (that.status === PENDING) {
      that.value = value;
      that.status = FULFILLED;
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.reason = reason;
      that.status = REJECTED;
    }
  }

  try {
    constructor(reslove, reject);
  } catch (e) {
    reject(e);
  }
}

mypromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  switch (that.status) {
    case FULFILLED:
      onFulfilled(that.value);
      break;
    case REJECTED:
      onRejected(that.reason);
      break;
    default:
  }
}






