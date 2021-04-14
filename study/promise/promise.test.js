//  2021-03-22

class Promise() {
  // 构造函数
  constructor(exec) {
    this.Pending = 'Pending'
    this.Fulilled = 'Fulilled'
    this.Rejected = 'Rejected'
    this.status = this.Pending
    this.value = undefined
    this.reason = undefined

    this.onResolved = []
    this.onRejected = []

    const resolve = (value) => {
      if (this.status === this.Pending) {
        this.status = this.Fulilled
        this.value = value
        this.onResolved.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === this.Pending) {
        this.status = this.Rejected
        this.reason = reason
        this.onRejected.forEach(fn => fn())
      }
    }

    exec(resolve, reject)
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => throw err

    if (this.Fulilled === this.status) {
      onResolved(this.value)
    }

    if (this.Rejected === this.status) {
      onRejected(tihs.reason)
    }

    if (this.Pending === this.status) {
      this.onResolved.push(onResolved(this.value))
      this.onRejected.push(onRejected(this.reason))
    }

  }

  catch(onRejected) {
    this.then(null, onRejected)
  }

  static resolve(value) {
    return value instanceof Promise ? value : new Promise((resolve) => resolve(value))
  }

  static reject(err) {
    return err instanceof Promise ? err : new Promise((reject) => reject(err))
  }

}



// 2021-04-14
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
  let that = this;
  that.status = PENDING;
  that.value = undefined;
  that.reason = undefined;
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {

    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(cb => cb(that.value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach(cb => cb(that.reason));
      }
    });
  }

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }

  let called = false;
  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  if (that.status === FULFILLED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === REJECTED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === PENDING) {
    return (newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push(reason => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
}
