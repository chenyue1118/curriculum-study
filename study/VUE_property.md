### 添加实例 property
- 可能在多个组件里用到数据/实用工具，但是不想 污染全局作用域。这种情况下，可以通过在原型上定义，使得在每个VUE实例中可用。
```
Vue.prototype.$appName = 'My app'
```
- 这样 $appName 就可以在所有的Vue实例中可用，甚至在实例被创建之前就可以。实例代码：
```
new Vue({
	  beforeCreate: function() {
		consoel.log(this.$appName)
	  }
})
```

### 为实例 property 设置作用域的重要性
- $ 是在VUe所有实例中都可用property的一个简单约定。避免和已经定义的数据、方法、计算属性冲突。

### 原型方法的上下文
- 在javascript中有一个原型的方法会获得该实例的上下文。也就是说它们可以使用 this 访问数据、计算属性、方法或其它神人定义在实例上的东西
```
Vue.prototype.$reverseText = function(propertyName) {
  this[propertyName] = this[propertyName].split('').reverse().join('')
}

new Vue({
    data: {
      message: 'Hello'
    },
    created: function() {
      console.log(this.message) // => "Hello"
      this.$reverseText('message')
      console.log(this.message) // => "olleH"
    }
})
```
- 如果使用ES6/2015的箭头函数，则其绑定的上下文不会正常工作，因为它们隐式地绑定其父级作用域。
```
Vue.property.$reverseText = propertyName => {
  this[propertyName] = this[propertyName].split('').reverse().join('')
}
```
会抛出一个错误：
```
Uncaught TypeError: Cannot read property 'split' of undefined
```














# 1
