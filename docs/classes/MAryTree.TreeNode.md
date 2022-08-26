# Class: TreeNode<K, D\>

[MAryTree](../modules/MAryTree.md).TreeNode

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`TreeKey`](../modules/MAryTree.md#treekey) |
| `D` | [`TreeData`](../modules/MAryTree.md#treedata) |

## Table of contents

### Constructors

- [constructor](MAryTree.TreeNode.md#constructor)

### Properties

- [children](MAryTree.TreeNode.md#children)
- [data](MAryTree.TreeNode.md#data)
- [key](MAryTree.TreeNode.md#key)
- [leftNeighbor](MAryTree.TreeNode.md#leftneighbor)
- [parent](MAryTree.TreeNode.md#parent)

### Accessors

- [hasChildren](MAryTree.TreeNode.md#haschildren)
- [isLeaf](MAryTree.TreeNode.md#isleaf)
- [leftSibling](MAryTree.TreeNode.md#leftsibling)
- [siblingIndex](MAryTree.TreeNode.md#siblingindex)

### Methods

- [[iterator]](MAryTree.TreeNode.md#[iterator])
- [isDescendant](MAryTree.TreeNode.md#isdescendant)
- [toJSON](MAryTree.TreeNode.md#tojson)

## Constructors

### constructor

• **new TreeNode**<`K`, `D`\>(`key`, `data`, `parent?`)

TreeNode constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`TreeKey`](../modules/MAryTree.md#treekey) |
| `D` | [`TreeData`](../modules/MAryTree.md#treedata) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `K` | `undefined` |
| `data` | `D` | `undefined` |
| `parent` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> | `null` |

#### Defined in

[MAryTree.ts:40](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L40)

## Properties

### children

• **children**: [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>[]

**`Memberof`**

TreeNode

**`Member`**

children array of child nodes

#### Defined in

[MAryTree.ts:26](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L26)

___

### data

• **data**: `D`

**`Memberof`**

TreeNode

**`Member`**

data information stored on node

#### Defined in

[MAryTree.ts:16](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L16)

___

### key

• **key**: `K`

**`Memberof`**

TreeNode

**`Member`**

key key for this node

#### Defined in

[MAryTree.ts:11](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L11)

___

### leftNeighbor

• **leftNeighbor**: [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

**`Memberof`**

TreeNode

**`Member`**

leftNeighbor reference to this nodes left neighbor

#### Defined in

[MAryTree.ts:31](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L31)

___

### parent

• **parent**: [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

**`Memberof`**

TreeNode

**`Member`**

parent reference to this nodes parent

#### Defined in

[MAryTree.ts:21](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L21)

## Accessors

### hasChildren

• `get` **hasChildren**(): `boolean`

Returns true if this node has children.

#### Returns

`boolean`

#### Defined in

[MAryTree.ts:88](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L88)

___

### isLeaf

• `get` **isLeaf**(): `boolean`

Returns true if this node has no children.

#### Returns

`boolean`

#### Defined in

[MAryTree.ts:80](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L80)

___

### leftSibling

• `get` **leftSibling**(): [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

Returns the left sibling of this node if it exists.

#### Returns

[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>

#### Defined in

[MAryTree.ts:108](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L108)

___

### siblingIndex

• `get` **siblingIndex**(): `number`

Returns the index of this node amoung its sibling nodes.

#### Returns

`number`

#### Defined in

[MAryTree.ts:96](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L96)

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `void`, `unknown`\>

#### Returns

`Generator`<[`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>, `void`, `unknown`\>

#### Defined in

[MAryTree.ts:122](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L122)

___

### isDescendant

▸ **isDescendant**(`node?`): `boolean`

Check if this node is a descendent of a parent.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\> | `null` | the parent node to check against |

#### Returns

`boolean`

#### Defined in

[MAryTree.ts:64](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L64)

___

### toJSON

▸ **toJSON**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `children` | [`TreeNode`](MAryTree.TreeNode.md)<`K`, `D`\>[] |
| `data` | `D` |
| `key` | `K` |
| `leftNeighbor` | `K` |
| `parent` | `K` |

#### Defined in

[MAryTree.ts:48](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/MAryTree.ts#L48)
