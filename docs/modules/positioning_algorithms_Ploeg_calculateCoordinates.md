# Module: positioning-algorithms/Ploeg/calculateCoordinates

## Table of contents

### Classes

- [IYL](../classes/positioning_algorithms_Ploeg_calculateCoordinates.IYL.md)

### Type Aliases

- [CalculateCoordinatesOptions](positioning_algorithms_Ploeg_calculateCoordinates.md#calculatecoordinatesoptions)
- [TreeDataPositioned](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)

### Functions

- [default](positioning_algorithms_Ploeg_calculateCoordinates.md#default)
- [updateIYL](positioning_algorithms_Ploeg_calculateCoordinates.md#updateiyl)

## Type Aliases

### CalculateCoordinatesOptions

Ƭ **CalculateCoordinatesOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nodeSpacingX?` | `number` |
| `nodeSpacingY?` | `number` |

#### Defined in

[positioning-algorithms/Ploeg/calculateCoordinates.ts:26](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/positioning-algorithms/Ploeg/calculateCoordinates.ts#L26)

___

### TreeDataPositioned

Ƭ **TreeDataPositioned**<`K`, `D`\>: [`TreeData`](MAryTree.md#treedata) & { `change?`: `number` ; `el?`: [`TreeNode`](../classes/MAryTree.TreeNode.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\> \| ``null`` ; `er?`: [`TreeNode`](../classes/MAryTree.TreeNode.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\> \| ``null`` ; `height`: `number` ; `mod?`: `number` ; `msel?`: `number` ; `mser?`: `number` ; `prelim?`: `number` ; `shift?`: `number` ; `tl?`: [`TreeNode`](../classes/MAryTree.TreeNode.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\> \| ``null`` ; `tr?`: [`TreeNode`](../classes/MAryTree.TreeNode.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\> \| ``null`` ; `width`: `number` ; `x`: `number` ; `y`: `number`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`TreeKey`](MAryTree.md#treekey) |
| `D` | [`TreeData`](MAryTree.md#treedata) |

#### Defined in

[positioning-algorithms/Ploeg/calculateCoordinates.ts:9](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/positioning-algorithms/Ploeg/calculateCoordinates.ts#L9)

## Functions

### default

▸ **default**<`K`, `D`\>(`tree`, `options?`): [`Tree`](../classes/MAryTree.Tree.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | [`Tree`](../classes/MAryTree.Tree.md)<`K`, `D`\> |
| `options` | [`CalculateCoordinatesOptions`](positioning_algorithms_Ploeg_calculateCoordinates.md#calculatecoordinatesoptions) |

#### Returns

[`Tree`](../classes/MAryTree.Tree.md)<`K`, [`TreeDataPositioned`](positioning_algorithms_Ploeg_calculateCoordinates.md#treedatapositioned)<`K`, `D`\>\>

#### Defined in

[positioning-algorithms/Ploeg/calculateCoordinates.ts:52](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/positioning-algorithms/Ploeg/calculateCoordinates.ts#L52)

___

### updateIYL

▸ **updateIYL**(`minY`, `i`, `ih`): [`IYL`](../classes/positioning_algorithms_Ploeg_calculateCoordinates.IYL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `minY` | `number` |
| `i` | `number` |
| `ih` | [`IYL`](../classes/positioning_algorithms_Ploeg_calculateCoordinates.IYL.md) |

#### Returns

[`IYL`](../classes/positioning_algorithms_Ploeg_calculateCoordinates.IYL.md)

#### Defined in

[positioning-algorithms/Ploeg/calculateCoordinates.ts:43](https://github.com/jsakas/m-ary-tree/blob/f63681a/src/positioning-algorithms/Ploeg/calculateCoordinates.ts#L43)
