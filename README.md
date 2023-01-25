# M-Ary Tree

An implementation of an [m-ary tree](https://en.wikipedia.org/wiki/M-ary_tree) in TypeScript.

![npm](https://img.shields.io/npm/v/m-ary-tree?style=flat-square)

---

## Install

```bash
yarn add m-ary-tree
```

```bash
npm install m-ary-tree
```

## Usage

For detailed use see the [API Documentation](./docs/README.md)

### Basic

```typescript
import { Tree } from 'm-ary-tree';

const tree = new Tree(0);

tree.insert(0, 1);
tree.insert(0, 2);
```

### Keys

Each node inserted should have a unique key. Values are optional.

```typescript
import { Tree } from 'm-ary-tree';

const tree = new Tree(0);

tree.insert(0, 1)          // node with key 1 and no data
tree.insert(0, 2, 'foo')   // node with key 2 and data foo
```

### Binary / Ternary Trees

Use `maxChildren` option to limit child nodes, thus producing binary or ternary trees etc.

```typescript
const tree = new Tree(1, null, {
  maxChildren: 2,
});
```

### Traversals

All traversals are implemented as generators.

```typescript
for (const node of tree.postOrderTraversal()) {
  // ...
}
```

### Generic Types

TypeScript generics are supported:

```typescript
type MyNodeType = string

const tree = new Tree<number, MyNodeType>(0, { data: 'foo' });

console.log(tree.root.data) // 'foo'
```

## Motivation

This library was created while experimenting with tree drawing algorithms.

There are currently two positioning algorithms implemented:

- [Node-Positioning Algorithm for General Trees](https://www.cs.unc.edu/techreports/89-034.pdf) by John Q. Walker
- [Drawing Non-layered Tidy Trees in Linear Time](https://core.ac.uk/download/pdf/301654972.pdf) by Atze van der Ploeg

### Walker's Tree

In this implementation all nodes must be the same width and height.

```typescript
import { calculateCoordinates } from 'm-ary-tree/dist/positioning-algorithms/Walker/calculateCoordinates';
import { Tree } from 'm-ary-tree';

const tree = new Tree<number>(0);

tree.insert(0, 1);
tree.insert(0, 2);
tree.insert(0, 3);

calculateCoordinates(tree, {
  nodeWidth: 50,
  nodeHeight: 50,
  nodeSpacingX: 100,
  nodeSpacingY: 30,
});

const positionedTree = calculateCoordinates(tree);

for (const node of positionedTree.preOrderTraversal()) {
  expect(typeof node.data.x).toBe('number')
  expect(typeof node.data.y).toBe('number')
  expect(typeof node.data.width).toBe('number')
  expect(typeof node.data.height).toBe('number')
}
```

### Ploeg's Tree

In this implementation all nodes can be different sizes.

```typescript
import { calculateCoordinates } from 'm-ary-tree/dist/positioning-algorithms/Walker/calculateCoordinates';
import { Tree } from 'm-ary-tree';

const tree = new Tree(0, {
  width: 60,
  height: 25,
});

tree.insert(0, 1, {
  width: 50,
  height: 20,
});

tree.insert(0, 2, {
  width: 50,
  height: 60,
});

const positionedTree = calculateCoordinates(tree, {
  nodeSpacingX: 100,
  nodeSpacingY: 30,
});

for (const node of positionedTree.preOrderTraversal()) {
  expect(typeof node.data.x).toBe('number')
  expect(typeof node.data.y).toBe('number')
  expect(typeof node.data.width).toBe('number')
  expect(typeof node.data.height).toBe('number')
}
```
