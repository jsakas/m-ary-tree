## Classes

<dl>
<dt><a href="#MAryTreeNode">MAryTreeNode</a></dt>
<dd></dd>
<dt><a href="#MAryTree">MAryTree</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#calculateCoordinates">calculateCoordinates()</a></dt>
<dd><p>Perform multiple traversals to calculate and store the x, y coordinates for each node
based on the node width and spacing options.</p>
<p>This is the core algorithm described in Node-Positioning Algorithm for General Trees by John Q. Walker</p>
<p>Reference: <a href="https://www.cs.unc.edu/techreports/89-034.pdf">https://www.cs.unc.edu/techreports/89-034.pdf</a></p></dd>
</dl>

<a name="MAryTreeNode"></a>

## MAryTreeNode
**Kind**: global class  

* [MAryTreeNode](#MAryTreeNode)
    * [new MAryTreeNode(key, value, parent)](#new_MAryTreeNode_new)
    * _instance_
        * [.isLeaf](#MAryTreeNode+isLeaf) ⇒ <code>boolean</code>
        * [.hasChildren](#MAryTreeNode+hasChildren) ⇒ <code>boolean</code>
        * [.siblingIndex](#MAryTreeNode+siblingIndex) ⇒ <code>number</code>
        * [.leftSibling](#MAryTreeNode+leftSibling) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
        * [.isDescendant(node)](#MAryTreeNode+isDescendant) ⇒ <code>boolean</code>
    * _static_
        * [.key](#MAryTreeNode.key) : <code>MAryTreeKey</code>
        * [.value](#MAryTreeNode.value) : <code>MAryTreeValue</code>
        * [.parent](#MAryTreeNode.parent) : [<code>MAryTreeNode</code>](#MAryTreeNode)
        * [.children](#MAryTreeNode.children) : [<code>Array.&lt;MAryTreeNode&gt;</code>](#MAryTreeNode)
        * [.leftNeighbor](#MAryTreeNode.leftNeighbor) : [<code>MAryTreeNode</code>](#MAryTreeNode)

<a name="new_MAryTreeNode_new"></a>

### new MAryTreeNode(key, value, parent)
<p>MAryTreeNode constructor</p>


| Param | Type | Default |
| --- | --- | --- |
| key | <code>MAryTreeKey</code> |  | 
| value | <code>MAryTreeValue</code> |  | 
| parent | [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code> | <code></code> | 

<a name="MAryTreeNode+isLeaf"></a>

### mAryTreeNode.isLeaf ⇒ <code>boolean</code>
<p>Returns true if this node has no children.</p>

**Kind**: instance property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode+hasChildren"></a>

### mAryTreeNode.hasChildren ⇒ <code>boolean</code>
<p>Returns true if this node has children.</p>

**Kind**: instance property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode+siblingIndex"></a>

### mAryTreeNode.siblingIndex ⇒ <code>number</code>
<p>Returns the index of this node amoung its sibling nodes.</p>

**Kind**: instance property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode+leftSibling"></a>

### mAryTreeNode.leftSibling ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
<p>Returns the left sibling of this node if it exists.</p>

**Kind**: instance property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode+isDescendant"></a>

### mAryTreeNode.isDescendant(node) ⇒ <code>boolean</code>
<p>Check if this node is a descendent of a parent.</p>

**Kind**: instance method of [<code>MAryTreeNode</code>](#MAryTreeNode)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>MAryTreeNode</code>](#MAryTreeNode) | <p>the parent node to check against</p> |

<a name="MAryTreeNode.key"></a>

### MAryTreeNode.key : <code>MAryTreeKey</code>
<p>key for this node</p>

**Kind**: static property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode.value"></a>

### MAryTreeNode.value : <code>MAryTreeValue</code>
<p>information stored on node</p>

**Kind**: static property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode.parent"></a>

### MAryTreeNode.parent : [<code>MAryTreeNode</code>](#MAryTreeNode)
<p>reference to this nodes parent</p>

**Kind**: static property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode.children"></a>

### MAryTreeNode.children : [<code>Array.&lt;MAryTreeNode&gt;</code>](#MAryTreeNode)
<p>array of child nodes</p>

**Kind**: static property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTreeNode.leftNeighbor"></a>

### MAryTreeNode.leftNeighbor : [<code>MAryTreeNode</code>](#MAryTreeNode)
<p>reference to this nodes left neighbor</p>

**Kind**: static property of [<code>MAryTreeNode</code>](#MAryTreeNode)  
<a name="MAryTree"></a>

## MAryTree
**Kind**: global class  

* [MAryTree](#MAryTree)
    * [new MAryTree(key, value, options)](#new_MAryTree_new)
    * _instance_
        * [.inOrderTraversal(root)](#MAryTree+inOrderTraversal)
        * [.postOrderTraversal(root)](#MAryTree+postOrderTraversal)
        * [.preOrderTraversal(root)](#MAryTree+preOrderTraversal)
        * [.breadthFirstTraversal(root)](#MAryTree+breadthFirstTraversal)
        * [.rowTraversal(root)](#MAryTree+rowTraversal)
        * [.leftSiblingTraversal(root)](#MAryTree+leftSiblingTraversal)
        * [.leftDescendantTraversal(root)](#MAryTree+leftDescendantTraversal)
        * [.leftMostDescendant(root, depth)](#MAryTree+leftMostDescendant) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
        * [.connectLeftNeighbor()](#MAryTree+connectLeftNeighbor)
        * [.insert(parentNodeKey, key, value)](#MAryTree+insert) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
        * [.remove(key)](#MAryTree+remove) ⇒ <code>boolean</code>
        * [.find(key)](#MAryTree+find) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
        * [.depth(node)](#MAryTree+depth) ⇒ <code>number</code>
        * [.height(node)](#MAryTree+height) ⇒ <code>number</code>
    * _static_
        * [.root](#MAryTree.root) : [<code>MAryTreeNode</code>](#MAryTreeNode)
        * [.options](#MAryTree.options) : <code>MAryTreeOptions</code>

<a name="new_MAryTree_new"></a>

### new MAryTree(key, value, options)

| Param | Type |
| --- | --- |
| key | <code>MAryTreeKey</code> | 
| value | <code>MAryTreeValue</code> | 
| options | <code>MAryTreeOptions</code> | 

<a name="MAryTree+inOrderTraversal"></a>

### mAryTree.inOrderTraversal(root)
<p>Generates nodes in an in-order traversal</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+postOrderTraversal"></a>

### mAryTree.postOrderTraversal(root)
<p>Generates nodes in a post-order traversal</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+preOrderTraversal"></a>

### mAryTree.preOrderTraversal(root)
<p>Generates nodes in an pre-order traversal</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+breadthFirstTraversal"></a>

### mAryTree.breadthFirstTraversal(root)
<p>Generates nodes in an breadth-first traversal</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+rowTraversal"></a>

### mAryTree.rowTraversal(root)
<p>Generates nodes at a single depth</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+leftSiblingTraversal"></a>

### mAryTree.leftSiblingTraversal(root)
<p>Generates left-sibling nodes</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+leftDescendantTraversal"></a>

### mAryTree.leftDescendantTraversal(root)
<p>Generates left-descendant nodes</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+leftMostDescendant"></a>

### mAryTree.leftMostDescendant(root, depth) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
<p>Return left most descendent for a node.</p>
<p>The left-most descendent is defined as the left most node in the sub-tree at given depth.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type | Default |
| --- | --- | --- |
| root | [<code>MAryTreeNode</code>](#MAryTreeNode) |  | 
| depth | <code>number</code> | <code>0</code> | 

<a name="MAryTree+connectLeftNeighbor"></a>

### mAryTree.connectLeftNeighbor()
<p>Perform a breadth-first traversal and connect all left neighbors by setting
MAryTreeNode.leftNeighbor.</p>
<p>The left neighbor is defined as being to the left in the same row, but not part
of the same sub-tree as this nodes parent.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  
<a name="MAryTree+insert"></a>

### mAryTree.insert(parentNodeKey, key, value) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
<p>Insert a new child node at the given parent key.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| parentNodeKey | <code>MAryTreeKey</code> | 
| key | <code>MAryTreeKey</code> | 
| value | <code>MAryTreeValue</code> | 

<a name="MAryTree+remove"></a>

### mAryTree.remove(key) ⇒ <code>boolean</code>
<p>Remove a given node by its key</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  
**Returns**: <code>boolean</code> - <p>true if the node was found, false if it was not found.</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>MAryTreeKey</code> | <p>the tree key to remove</p> |

<a name="MAryTree+find"></a>

### mAryTree.find(key) ⇒ [<code>MAryTreeNode</code>](#MAryTreeNode) \| <code>null</code>
<p>Find a node by supplying its key.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param |
| --- |
| key | 

<a name="MAryTree+depth"></a>

### mAryTree.depth(node) ⇒ <code>number</code>
<p>Return depth of a node.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| node | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree+height"></a>

### mAryTree.height(node) ⇒ <code>number</code>
<p>Return the height of a node.</p>

**Kind**: instance method of [<code>MAryTree</code>](#MAryTree)  

| Param | Type |
| --- | --- |
| node | [<code>MAryTreeNode</code>](#MAryTreeNode) | 

<a name="MAryTree.root"></a>

### MAryTree.root : [<code>MAryTreeNode</code>](#MAryTreeNode)
<p>reference to the tree's root node</p>

**Kind**: static property of [<code>MAryTree</code>](#MAryTree)  
<a name="MAryTree.options"></a>

### MAryTree.options : <code>MAryTreeOptions</code>
<p>stored options passed in on object construction</p>

**Kind**: static property of [<code>MAryTree</code>](#MAryTree)  
<a name="calculateCoordinates"></a>

## calculateCoordinates()
<p>Perform multiple traversals to calculate and store the x, y coordinates for each node
based on the node width and spacing options.</p>
<p>This is the core algorithm described in Node-Positioning Algorithm for General Trees by John Q. Walker</p>
<p>Reference: <a href="https://www.cs.unc.edu/techreports/89-034.pdf">https://www.cs.unc.edu/techreports/89-034.pdf</a></p>

**Kind**: global function  
