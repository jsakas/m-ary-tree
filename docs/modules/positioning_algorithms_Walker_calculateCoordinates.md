# Module: positioning-algorithms/Walker/calculateCoordinates

## Table of contents

### Type Aliases

- [CalculateCoordinatesOptions](positioning_algorithms_Walker_calculateCoordinates.md#calculatecoordinatesoptions)
- [TreeDataPositioned](positioning_algorithms_Walker_calculateCoordinates.md#treedatapositioned)

### Functions

- [default](positioning_algorithms_Walker_calculateCoordinates.md#default)

## Type Aliases

### CalculateCoordinatesOptions

Ƭ **CalculateCoordinatesOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nodeHeight?` | `number` |
| `nodeSpacingX?` | `number` |
| `nodeSpacingY?` | `number` |
| `nodeWidth?` | `number` |

#### Defined in

[positioning-algorithms/Walker/calculateCoordinates.ts:18](https://github.com/jsakas/m-ary-tree/blob/327213c/src/positioning-algorithms/Walker/calculateCoordinates.ts#L18)

___

### TreeDataPositioned

Ƭ **TreeDataPositioned**<`D`\>: `D` & { `height`: `number` ; `modifier?`: `number` ; `prelimX?`: `number` ; `width`: `number` ; `x`: `number` ; `y`: `number`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | [`TreeData`](MAryTree.md#treedata) |

#### Defined in

[positioning-algorithms/Walker/calculateCoordinates.ts:9](https://github.com/jsakas/m-ary-tree/blob/327213c/src/positioning-algorithms/Walker/calculateCoordinates.ts#L9)

## Functions

### default

▸ **default**<`K`, `D`\>(`tree`, `options?`): [`Tree`](../classes/MAryTree.Tree.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Walker_calculateCoordinates.md#treedatapositioned)<`D`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `K` |
| `D` | extends `Partial`<[`TreeDataPositioned`](positioning_algorithms_Walker_calculateCoordinates.md#treedatapositioned)<[`TreeData`](MAryTree.md#treedata)\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | [`Tree`](../classes/MAryTree.Tree.md)<`K`, `D`\> |
| `options` | [`CalculateCoordinatesOptions`](positioning_algorithms_Walker_calculateCoordinates.md#calculatecoordinatesoptions) |

#### Returns

[`Tree`](../classes/MAryTree.Tree.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Walker_calculateCoordinates.md#treedatapositioned)<`D`\>\>

#### Defined in

[positioning-algorithms/Walker/calculateCoordinates.ts:25](https://github.com/jsakas/m-ary-tree/blob/327213c/src/positioning-algorithms/Walker/calculateCoordinates.ts#L25)
