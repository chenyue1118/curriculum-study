## Promise
1. Promise 的基本使用和原理

2. Callback 方式书写
```
  let ajax = function(callback) {
    console.log('callback', '执行')
    setTimeout(function() {
        callback && callback()
    })
  }

  ajax(function() {
      console.log('执行ajax')
  })
```

3. Promise 方式书写
  * **resolve**: 执行下一步操作
  * **reject**: 中断当前操作
  * **then**: 是 Promise 返回对象，执行下一个，如果有两个函数，第一个表示 resolved （成功），第二个表示 rejected（失败）。
  ```
    let ajax = function() {
      console.log('promise', '执行')
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve ()
        }, 1000)
      })
    }

    ajax().then(function() {
        console.log('promise', '执行ajax方法')
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve()
          }, 1000)
        })
    })
  ```

  * 执行两个 Promise 的效果
  ```
    let ajax = function() {
      console.log('promise', '执行')
    }

    ajax()
      .then(function() {
        return new Promise(function(resolve, reject) {
          setTImeout(function() {
            resolve()
          }, 1000)
        })
      })
      .then(function() {
        console.log('promise', 执行2)
      })
  ```

  * 多个 Promise 实例实现串行操作
  > 执行 a b c d 如果中间出了错误使用 catch 来捕获

  ```
    let ajax = function(num) {
      console.log('执行---', num)
      return new Promise(function(resolve, reject) {
        if (num > 5) {
          resolve()
        } else {
          throw new Error('出错了')
        }
      })
    }

    ajax(6).then(function() {
      console.log('log', 6)
    }).catch(function(err) {
      console.log('catch', err)
    })

    ajax(4).then(function() {
      console.log('log', 4)
    }).catch(function(err) {
      console.log('catch', err)
    })
  ```

4. Promise.finally()
  > finally() 方法返回一个 Promise，在 Promise 执行结束时，无论结果是 fulfilled 或者是 rejected 都需要执行的飞马提供了一种方式，避免同样的语句在 then() 和 catch() 中各写一次的情况

  ```
    Promise.resolve('success').then(result => {
        console.log('then:', result)
        return Promise.resolve(result)
    }).catch(err => {
      console.log('err:', err)
      return Promise.reject(err)
    }).finally(result => {
      console.log('finally:', result)
    })
```

5. Promise 并行执行 Promise.all()
  > Promise.all 是将多个 Promise 实例当成一个 Promise 实例， all 方法里是一个数组，数组传进来多个 Promise 实例，当多个 Promise 实例状态发生改变的时候，这个新的 Promise 实例才会发生变化

  ```
    // 所有图片加载完在添加到页面上
    function loadImg() {
      return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.src = src;
        img.onload = () => {
          resolve(img)
        }
        img.onerror = (err) => {
          reject(err)
        }
      })
    }

    function showImgs(imgs) {
      imgs.forEach((img) => {
        document.body.appendChild(img)
      })
    }

    Promise.all([
      'https://www.baidu.com/img/flexible/logo/pc/result.png',
      'https://www.baidu.com/img/flexible/logo/pc/result.png',
      'https://www.baidu.com/img/flexible/logo/pc/result.png'
    ]).then(showImgs)
  ```

6. Promise 率先执行 Promise.race()

7. 错误捕获
  * catch 捕获错误
  > Promise 抛错具有冒泡机制，能够不断传递，可以使用 catch 统一处理

8. 手写 Promise































===========================================
