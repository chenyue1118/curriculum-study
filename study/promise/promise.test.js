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
