1. 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？

```javascript
  function red(){
    console.log('red');
  }
  function green(){
    console.log('green');
  }
  function yellow(){
    console.log('yellow');
  }

  const light = (time, callback) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        callback()
        resolve()
      }, time)
    })
  }

  const setup = () => {
    light(3000, red).then(() => {
      return light(2000, green)
    }).then(() => {
      return light(1000, yellow)
    }).then(() => {
      setup()
    })
  }

  setup()
```

2. 请实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。

```javascript
  const timeout = ms => new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve();
      }, ms);
  });

  const ajax1 = () => timeout(2000).then(() => {
      console.log('1');
      return 1;
  });

  const ajax2 = () => timeout(1000).then(() => {
      console.log('2');
      return 2;
  });

  const ajax3 = () => timeout(2000).then(() => {
      console.log('3');
      return 3;
  });

  const mergePromise = ajaxArray => {
      // 在这里实现你的代码

      // # 1
      const data = []
      const helper = (index = 0) => {
        return Promise.resolve().then(ajaxArray[index]).then(res => {
          if (index === ajaxArray.length) {
            return data
          } else {
            data.push(res)
            return helper(index + 1)
          }
        })
      }
      return helper()


      // # 2
      // const data = []
      // let sequ = Promise.resolve()
      // ajaxArray.forEach(item => {
      //   sequ = sequ.then(item).then(res => {
      //     data.push(res)
      //     return data
      //   })
      // })
      // return sequ
  };

  mergePromise([ajax1, ajax2, ajax3]).then(data => {
      console.log('done');
      console.log(data); // data 为 [1, 2, 3]
  });
```

3. 现有8个图片资源的url，已经存储在数组urls中，且已有一个函数function loading，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

要求：任何时刻同时下载的链接数量不可以超过3个。

请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
















```javascript
  var urls = []

  // const loadingImg = (url) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image()
  //     img.onload = () => {
  //       resolve()
  //     }
  //     img.onerror = reject()
  //     img.src = url
  //   })
  // }
```

```javascript
  const loading = (time) => {
    return new Promise((resolve, reject) => {
      console.log('time', time);
      setTimeout(() => {
        resolve(time)
      }, time * 1000)
    })
  }

  const targets =  [1, 2, 3, 4, 5, 6, 7, 8]
  const limit = 3
  const result = []
  let index = 0

  const helper = () => {
    if (index >= targets.length) {
      return
    } else {
      const url = targets[index]
      loading(url).then(res => {
        result.push(res)
        index += 1
        helper()
      })
      if (index < limit - 1) {
        index += 1
        helper()
      }
    }
  }
  helper()

  // ------------------------------
  const helper = (index) => {
    if (len === index) {
      console.log('promises', promises);
      return Promise.all(promises)
    } else {
      return Promise.race(promises).then(res => {
        promises[res] = loading(sequence[index]).then(() => {
          return res
        })
        return helper(index + 1)
      })
    }
  }

  return helper(0)
```
