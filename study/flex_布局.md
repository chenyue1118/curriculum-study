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





























####### 1
