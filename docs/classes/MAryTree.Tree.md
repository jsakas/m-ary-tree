# Class: Tree<K, D\>

[MAryTree](../modules/MAryTree.md).Tree

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`TreeKey`](../modules/MAryTree.md#treekey) |
| `D` | [`TreeData`](../modules/MAryTree.md#treedata) |

## Table of contents

### Constructors

- [constructor](MAryTree.Tree.md#constructor)

### Properties

- [options](MAryTree.Tree.md#options)
- [root](MAryTree.Tree.md#root)

### Methods

- [[iterator]](MAryTree.Tree.md#[iterator])
- [breadthFirstTraversal](MAryTree.Tree.md#breadthfirsttraversal)
- [connectLeftNeighbor](MAryTree.Tree.md#connectleftneighbor)
- [depth](MAryTree.Tree.md#depth)
- [find](MAryTree.Tree.md#find)
- [height](MAryTree.Tree.md#height)
- [inOrderTraversal](MAryTree.Tree.md#inordertraversal)
- [insert](MAryTree.Tree.md#insert)
- [leftDescendantTraversal](MAryTree.Tree.md#leftdescendanttraversal)
- [leftMostDescendant](MAryTree.Tree.md#leftmostdescendant)
- [leftSiblingTraversal](MAryTree.Tree.md#leftsiblingtraversal)
- [postOrderTraversal](MAryTree.Tree.md#postordertraversal)
- [preOrderTraversal](MAryTree.Tree.md#preordertraversal)
- [remove](MAryTree.Tree.md#remove)
- [rowTraversal](MAryTree.Tree.md#rowtraversal)

## Constructors

### constructor

• **new Tree**<`K`, `D`\>(`key`, `data?`, `options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`TreeKey`](../modules/MAryTree.md#treekey) |
| `D` | [`TreeData`](../modules/MAryTree.md#treedata) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `data?` | `D` |
| `options` | [`TreeOptions`](../modules/MAryTree.md#treeoptions) |

#### Defined in

[MAryTree.ts:147](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L147)

## Properties

### options

• **options**: [`TreeOptions`](../modules/MAryTree.md#treeoptions)

**`Memberof`**

Tree

**`Member`**

options stored options passed in on object construction

#### Defined in

[MAryTree.ts:140](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L140)

___

### root

• **root**: [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

**`Memberof`**

Tree

**`Member`**

root reference to the tree's root node

#### Defined in

[MAryTree.ts:135](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L135)

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `void`, `unknown`\>

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `void`, `unknown`\>

#### Defined in

[MAryTree.ts:443](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L443)

___

### breadthFirstTraversal

▸ **breadthFirstTraversal**(`root?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates nodes in an breadth-first traversal

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:221](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L221)

___

### connectLeftNeighbor

▸ **connectLeftNeighbor**(): `void`

Perform a breadth-first traversal and connect all left neighbors by setting
TreeNode.leftNeighbor.

The left neighbor is defined as being to the left in the same row, but not part 
of the same sub-tree as this nodes parent.

#### Returns

`void`

#### Defined in

[MAryTree.ts:323](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L323)

___

### depth

▸ **depth**(`node?`): `number`

Return depth of a node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`number`

#### Defined in

[MAryTree.ts:421](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L421)

___

### find

▸ **find**(`key`): [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

Find a node by supplying its key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

#### Defined in

[MAryTree.ts:407](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L407)

___

### height

▸ **height**(`node?`): `number`

Return the height of a node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`number`

#### Defined in

[MAryTree.ts:435](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L435)

___

### inOrderTraversal

▸ **inOrderTraversal**(`root?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates nodes in an in-order traversal

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:159](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L159)

___

### insert

▸ **insert**(`parentNodeKey`, `key`, `data?`): [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

Insert a new child node at the given parent key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentNodeKey` | `K` |
| `key` | `K` |
| `data?` | [`Tree`](MAryTree.Tree.md)<`K`, `D`\> \| `D` |

#### Returns

[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

#### Defined in

[MAryTree.ts:345](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L345)

___

### leftDescendantTraversal

▸ **leftDescendantTraversal**(`node?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates left-descendant nodes

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> | `null` |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:285](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L285)

___

### leftMostDescendant

▸ **leftMostDescendant**(`root?`, `depth?`): [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

Return left most descendent for a node.

The left-most descendent is defined as the left most node in the sub-tree at given depth.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `root` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> | `undefined` |
| `depth` | `number` | `0` |

#### Returns

[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

#### Defined in

[MAryTree.ts:305](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L305)

___

### leftSiblingTraversal

▸ **leftSiblingTraversal**(`node?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates left-sibling nodes

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> | `null` |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:269](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L269)

___

### postOrderTraversal

▸ **postOrderTraversal**(`root?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates nodes in a post-order traversal

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:187](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L187)

___

### preOrderTraversal

▸ **preOrderTraversal**(`root?`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates nodes in an pre-order traversal

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:204](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L204)

___

### remove

▸ **remove**(`key`): `boolean`

Remove a given node by its key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | the tree key to remove |

#### Returns

`boolean`

true if the node was found, false if it was not found.

#### Defined in

[MAryTree.ts:386](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L386)

___

### rowTraversal

▸ **rowTraversal**(`n`): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

Generates nodes at a single depth

**`Generator`**

**`Yields`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `any`, `unknown`\>

#### Defined in

[MAryTree.ts:246](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L246)
