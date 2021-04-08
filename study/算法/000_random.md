### Random

```javascript
  function combine(...chunks) {
    const res = []

    const helper = function(chunkIndex, prev) {
      const chunk = chunks[chunkIndex]
      const isLast = chunkIndex === chunks.length - 1
      for (let val of chunk) {
        const cur = prev.concat(val)
        if (isLast) {
          res.push(cur)
        } else {
          helper(chunkIndex + 1, cur)
        }
      }
    }

    helper(0, [])

    return res
  }
```

### 二叉树的最大深度

```javascript
  /*
    function treeNode(val) {
      this.val = val
      this.left = null
      this.right = null
    }
  */
  const maxDepth = (root) => {
    if (root.value === null) return 0;
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
  }

```

```javascript
  //   1
  //  2 22
  // 3 4
  // DFS
  const maxDepth = (root) => {
    let max = 0;

    const helper = (node, depth) => {
      if (node === null) return;
      max = Math.max(max, depth)

      if (node.left) {
        helper(node.left, depth + 1)
      }

      if (node.right) {
        helper(node.right, depth + 1)
      }

    }
    helper(root, 1)

    return max
  }
```

```javascript
  // BFS
  const maxDepth = (root) => {
    if (root === null) return 0;

    let max = 0;
    let queue = [root];

    while (queue.length) {
      max += 1;
      let len = queue.length
      while (len--) {
        let node = queue.shift()
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
    return max
  }
```
