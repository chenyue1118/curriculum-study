### 两个概念 轴 和 容器

#### 轴
1. 主轴
2. 交叉轴

#### 容器
1. 父容器
2. 子容器

#### 轴
- 默认情况下，主轴的方向是从左到右，交叉轴垂直于主轴，逆时针方向90度。
- 交叉轴是否主轴决定的，而主轴时候 flex-direction 决定的。
- flex-direction 属性设置在父容器上，才可以生效。
```
  flex-direction: row | row-reverse | column | column-reverse
```

###### flex-direction: row
- flex 容器的主轴被定义为于文本方向相同。主轴起点和主轴终点与内容方向相同。
- 就是 主轴沿着水平方向向右。

###### flex-direction: row-reverse
- 表现和 row 相同， 但是置换了主轴起点和主轴终点
- 就是 主轴沿着水平方向向左。

###### flex-direction: column
- flex容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后相同。
- 就是 主轴变成了 Y 轴方向，方向从上到下布局。

###### flex-direction: colume-reverse
- 表现和 column 相同，但是置换了主轴起点和主轴终点
- 就是 主轴变成了 Y 轴方向，方向从下到上，与书写的方向相反

#### 容器
这里分为父容器 和 子容器

##### 父容器
- justify-content 设置子元素在主轴方向上的对齐方式
- alugn-items 设置子元素在交叉轴方向上的对齐方式

```
justify-content: flex-start | flex-end | center | space-between | space-around
```
- flex-start 子元素沿着主轴方向开始对齐
- flex-end 子元素沿着主轴方向终点对齐
- center 子元素在主轴方向上水平居中
- space-between 子元素在主轴方向上两端对齐，元素之间间隔相等
- space-around 子元素在主轴方向上均匀排列每个元素， 每个元素周围分配相同的空间

```
align-items: flex-start | flex-end | center | baseline | stretch
```
- flex-start 子元素在交叉轴方向上起点对齐
- flex-end 子元素在交叉轴方向上终点对齐
- center 子元素在交叉轴方向上居中对齐
- baseline 子元素在交叉轴上以文字基线对齐
- stretch 默认属性，未设置高度或者auto，将占满整个容器

##### 子容器
- flex 属性 定义在主轴是如何伸缩的
  * 子容器是有弹性的，他们会自动填充剩下空间，子容器的伸缩比由 flex 属性决定
  * flex 是多个属性的缩写，允许1-3个值得连写
- align-self 属性 单独设置子容器如何沿交叉轴排列
  * 每个子容器都可以单独定义沿交叉轴排列方式
  * 该属性的取值跟父容器中的align-items属性一致，如果两者相同的话，则以子容器align-self属性为主

###### flex作用规则
- 三个属性的简写， 是 flex-grow flex-shrink flex-basis 的简写
- 常用的简化写法
  * flex: 1 --> flex: 1 1 0%
  * flex: 3 --> flex: 3 1 0%
  * 注意：flexbox布局和原来的布局是两个概念，部分css属性和flexbox盒子里面不起作用，eg: float, clear, vertical-align等

- 单  值:  宽/高 flex-basis  2em / 20px / auto / content
- 两个值:  flex-grow | flex-basis  2 30px / 1 40px
- 两个值:  flex-grow | flex-shink  2 2 / 1 2
- 三个值:  flex-grow | flex-shinl | flex-basis  1 1 400px / 0 1 auto
- none 0 0 auto

```
align-self: flex-start | flex-end | baseline | stretch
```
- flex-start 起始端对齐
- flex-end 末尾端对齐
- baseline 基线对齐
- stretch 拉伸对齐

### flex 深入了解

#### 父容器
- flex-wrap 设置子容器的换行方式
  * 绝对子容器是否可以选择换行，一般而言有三种状态，支持换行的话，也支持逆序换行
```
flex-wrap: wrap | nowrap | wrap-reverse
```
- wrap: 允许换行
- nowrap: 不允许换行
- wrap-reverse: 允许逆向换行


- flex-flow 设置轴向与换行组合
  * 是 flex-direction 和 flex-wrap 的简写
  * 单独设置 flex-direction 取值，比如：
  ```
  flex: row | column
  ```
  * 单独设置 flex-wrap 取值
  ```
  flex-flow: wrap | no-wrap | wrap-reverse
  ```
  * 同时设置两者取值
  ```
  flex-flow: row wrap
  flex-flow: column nowrap
  ```

- align-content 定义子容器在交叉轴的排列方式，也叫对齐方式
  * 当子容器多行排列时，设置行与行之间的对齐方式
  ```
  // 基本位置对齐
  align-content: flex-start | flex-end | center
  // 基线对齐
  align-content: baseline | first baseline | laset baseline
  // 分布式对齐
  align-content: space-between | space-around | stretch
  ```
  * flex-start 起始端对齐
  * flex-end 末尾端对齐
  * center 居中对齐
  * space-between 等间距均匀分布
  * space-around 等边距均匀分布
  * stretch 拉伸对齐
  * baseline 基线对齐

#### 子容器
- flex-frow 子容器弹性伸展比例。把剩余的空间按照比例分配给子容器。

- flex-shrink 子容器的弹性收缩比例。当子容器超出的部分，会按照对应的比例给子容器减去相对应的值

- flex-basis TODO

































####### 1
