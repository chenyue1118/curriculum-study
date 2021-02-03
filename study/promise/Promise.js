// https://github.com/art-design-ui/Promise/blob/master/src/Promise.js

class Promise {
  constructor(executor) {
    // pending fulfilled rejected
    this.state = 'pending';
    // 成功的值
    this.value = void 0;
    // 失败的原因
    this.reason = void 0;
    // 成功存放的回调方法数据
    this.onResolvedCallbacks = [];
    // 失败存放的回调方法数组
    this.onRejectedCallbacks = [];
    // resolve 方法将容器的状态更改为成功
    let resolve = (value) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
        return
      }
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        // 参数 resolve 具有拆箱功能
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    };
    // reject 方法将容器的状态更改为失败
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    };
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // 规范规定 如果 onFulfilled 不是函数且 promise1 成功执行，promise2 必须成功执行并返回相同的值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;

    // 规范规定 如果 onRejected 不是函数且 promise1 拒绝执行，promise2 必须拒绝执行并返回相同的据因
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => throw err;

    // 链式调用 注意返回的 promise2 的状态
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            // 规范规定 如果 onFulfilled 或者 onRejected 返回一个值 x，则运行下面的 promise 解决过程：[[Resolve]](promise2, x)
            let x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // else:state 是 pending
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        })
      }
    });

    return promise2;
  }

  // 处理 promise2 与 x 的关系 并定义 promise2 的状态
  resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
      // return 的作用是不往下继续执行
      return reject(new TypeError('Chaining cycle detected for promise'))
    }

    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let called = false;
      try {
        let then = x.then;
        if (typeof then === 'function') {
          // 存在一个非 promise 对象拥有 then 方法 此时我们应该把内部 this 指向为 x
          then.call(x, (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (err) => {
            if (called) return ;
            called = true;
            reject(err);
          })
        } else {
          reject(x)
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

  catch(fn) {
    return this.then(void 0, fn);
  }

  // 将目标转为状态为成功的 promise 对象
  static resolve(value) {
    return value instanceof Promise ? value : new Promise((resolve) => { resolve(value) })
  }

  // 将目标转为状态为失败的 Promise 对象
  static reject(err) {
    return err instanceof Promise ? err : new Promise((reject) => { reject(err) })
  }
}

module.exports = Promise
