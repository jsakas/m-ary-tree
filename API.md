## Classes

<dl>
<dt><a href="#TreeNode">TreeNode</a></dt>
<dd></dd>
<dt><a href="#Tree">Tree</a></dt>
<dd></dd>
</dl>

<a name="TreeNode"></a>

## TreeNode
**Kind**: global class  

* [TreeNode](#TreeNode)
    * [new TreeNode(key, value, parent)](#new_TreeNode_new)
    * _instance_
        * [.isLeaf](#TreeNode+isLeaf) ⇒ <code>boolean</code>
        * [.hasChildren](#TreeNode+hasChildren) ⇒ <code>boolean</code>
        * [.siblingIndex](#TreeNode+siblingIndex) ⇒ <code>number</code>
        * [.leftSibling](#TreeNode+leftSibling) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
        * [.isDescendant(node)](#TreeNode+isDescendant) ⇒ <code>boolean</code>
    * _static_
        * [.key](#TreeNode.key) : <code>TreeKey</code>
        * [.value](#TreeNode.value) : <code>TreeValue</code>
        * [.parent](#TreeNode.parent) : [<code>TreeNode</code>](#TreeNode)
        * [.children](#TreeNode.children) : [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
        * [.leftNeighbor](#TreeNode.leftNeighbor) : [<code>TreeNode</code>](#TreeNode)

<a name="new_TreeNode_new"></a>

### new TreeNode(key, value, parent)
<p>TreeNode constructor</p>


| Param | Type | Default |
| --- | --- | --- |
| key | <code>TreeKey</code> |  | 
| value | <code>TreeValue</code> |  | 
| parent | [<code>TreeNode</code>](#TreeNode) \| <code>null</code> | <code></code> | 

<a name="TreeNode+isLeaf"></a>

### treeNode.isLeaf ⇒ <code>boolean</code>
<p>Returns true if this node has no children.</p>

**Kind**: instance property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode+hasChildren"></a>

### treeNode.hasChildren ⇒ <code>boolean</code>
<p>Returns true if this node has children.</p>

**Kind**: instance property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode+siblingIndex"></a>

### treeNode.siblingIndex ⇒ <code>number</code>
<p>Returns the index of this node amoung its sibling nodes.</p>

**Kind**: instance property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode+leftSibling"></a>

### treeNode.leftSibling ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<p>Returns the left sibling of this node if it exists.</p>

**Kind**: instance property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode+isDescendant"></a>

### treeNode.isDescendant(node) ⇒ <code>boolean</code>
<p>Check if this node is a descendent of a parent.</p>

**Kind**: instance method of [<code>TreeNode</code>](#TreeNode)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | <code></code> | <p>the parent node to check against</p> |

<a name="TreeNode.key"></a>

### TreeNode.key : <code>TreeKey</code>
<p>key for this node</p>

**Kind**: static property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode.value"></a>

### TreeNode.value : <code>TreeValue</code>
<p>information stored on node</p>

**Kind**: static property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode.parent"></a>

### TreeNode.parent : [<code>TreeNode</code>](#TreeNode)
<p>reference to this nodes parent</p>

**Kind**: static property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode.children"></a>

### TreeNode.children : [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<p>array of child nodes</p>

**Kind**: static property of [<code>TreeNode</code>](#TreeNode)  
<a name="TreeNode.leftNeighbor"></a>

### TreeNode.leftNeighbor : [<code>TreeNode</code>](#TreeNode)
<p>reference to this nodes left neighbor</p>

**Kind**: static property of [<code>TreeNode</code>](#TreeNode)  
<a name="Tree"></a>

## Tree
**Kind**: global class  

* [Tree](#Tree)
    * [new Tree(key, value, options)](#new_Tree_new)
    * _instance_
        * [.inOrderTraversal(root)](#Tree+inOrderTraversal)
        * [.postOrderTraversal(root)](#Tree+postOrderTraversal)
        * [.preOrderTraversal(root)](#Tree+preOrderTraversal)
        * [.breadthFirstTraversal(root)](#Tree+breadthFirstTraversal)
        * [.rowTraversal(root)](#Tree+rowTraversal)
        * [.leftSiblingTraversal(root)](#Tree+leftSiblingTraversal)
        * [.leftDescendantTraversal(root)](#Tree+leftDescendantTraversal)
        * [.leftMostDescendant(root, depth)](#Tree+leftMostDescendant) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
        * [.connectLeftNeighbor()](#Tree+connectLeftNeighbor)
        * [.insert(parentNodeKey, key, value)](#Tree+insert) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
        * [.remove(key)](#Tree+remove) ⇒ <code>boolean</code>
        * [.find(key)](#Tree+find) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
        * [.depth(node)](#Tree+depth) ⇒ <code>number</code>
        * [.height(node)](#Tree+height) ⇒ <code>number</code>
    * _static_
        * [.root](#Tree.root) : [<code>TreeNode</code>](#TreeNode)
        * [.options](#Tree.options) : <code>TreeOptions</code>

<a name="new_Tree_new"></a>

### new Tree(key, value, options)

| Param | Type |
| --- | --- |
| key | <code>TreeKey</code> | 
| value | <code>TreeValue</code> | 
| options | <code>TreeOptions</code> | 

<a name="Tree+inOrderTraversal"></a>

### tree.inOrderTraversal(root)
<p>Generates nodes in an in-order traversal</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+postOrderTraversal"></a>

### tree.postOrderTraversal(root)
<p>Generates nodes in a post-order traversal</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+preOrderTraversal"></a>

### tree.preOrderTraversal(root)
<p>Generates nodes in an pre-order traversal</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+breadthFirstTraversal"></a>

### tree.breadthFirstTraversal(root)
<p>Generates nodes in an breadth-first traversal</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+rowTraversal"></a>

### tree.rowTraversal(root)
<p>Generates nodes at a single depth</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+leftSiblingTraversal"></a>

### tree.leftSiblingTraversal(root)
<p>Generates left-sibling nodes</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+leftDescendantTraversal"></a>

### tree.leftDescendantTraversal(root)
<p>Generates left-descendant nodes</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+leftMostDescendant"></a>

### tree.leftMostDescendant(root, depth) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<p>Return left most descendent for a node.</p>
<p>The left-most descendent is defined as the left most node in the sub-tree at given depth.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| root | [<code>TreeNode</code>](#TreeNode) |  | 
| depth | <code>number</code> | <code>0</code> | 

<a name="Tree+connectLeftNeighbor"></a>

### tree.connectLeftNeighbor()
<p>Perform a breadth-first traversal and connect all left neighbors by setting
TreeNode.leftNeighbor.</p>
<p>The left neighbor is defined as being to the left in the same row, but not part
of the same sub-tree as this nodes parent.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  
<a name="Tree+insert"></a>

### tree.insert(parentNodeKey, key, value) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<p>Insert a new child node at the given parent key.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| parentNodeKey | <code>TreeKey</code> | 
| key | <code>TreeKey</code> | 
| value | <code>TreeValue</code> | 

<a name="Tree+remove"></a>

### tree.remove(key) ⇒ <code>boolean</code>
<p>Remove a given node by its key</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: <code>boolean</code> - <p>true if the node was found, false if it was not found.</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>TreeKey</code> | <p>the tree key to remove</p> |

<a name="Tree+find"></a>

### tree.find(key) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<p>Find a node by supplying its key.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param |
| --- |
| key | 

<a name="Tree+depth"></a>

### tree.depth(node) ⇒ <code>number</code>
<p>Return depth of a node.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree+height"></a>

### tree.height(node) ⇒ <code>number</code>
<p>Return the height of a node.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | 

<a name="Tree.root"></a>

### Tree.root : [<code>TreeNode</code>](#TreeNode)
<p>reference to the tree's root node</p>

**Kind**: static property of [<code>Tree</code>](#Tree)  
<a name="Tree.options"></a>

### Tree.options : <code>TreeOptions</code>
<p>stored options passed in on object construction</p>

**Kind**: static property of [<code>Tree</code>](#Tree)  
