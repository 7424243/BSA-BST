/* ===== 1. Draw a BST =====
Given the data 3,1,4,6,9,2,5,7, if you were to insert this into an empty binary search tree, what would the tree look like? (Draw the tree, no coding needed here.)
Draw the BST with the keys - E A S Y Q U E S T I O N
*/
//See Question#1.jpg

/* ===== 2. Remove the root ===== 
Show how the above trees would look like if you deleted the root of each tree. (Draw the trees, no coding needed here.)
*/
//See Question#2.jpg

/* ===== 3. Create a BST class =====
Walk through the binary search tree code in the curriculum and understand it well. Then write a BinarySearchTree class with its core functions (insert(), remove(), find()) from scratch.
*/

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left = null
        this.right = null
    }
    insert(key, value) {
        if(this.key === null) {
            this.key = key
            this.value = value
        } else if( key < this.key) {
            if(this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            } else {
                this.left.insert(key, value)
            }
        } else {
            if(this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            } else {
                this.right.insert(key, value)
            }
        }
    }
    find(key) {
        if(this.key == key) {
            return this.value
        } else if(key < this.key && this.left) {
            return this.left.find(key)
        } else if(key > this.key && this.right) {
            return this.right.find(key)
        } else {
            throw new Error('key error')
        }
    }
    remove(key) {
        if(this.key == key) {
            if(this.left && this.right) {
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            } else if(this.left) {
                this._replaceWith(this.left)
            } else if(this.right) {
                this._replaceWith(this.right)
            } else {
                this._replaceWith(null)
            }
        } else if(key < this.key && this.left) {
            this.left.remove(key)
        } else if(key > this.key && this.right) {
            this.right.remove(key)
        } else {
            throw new Error('key error')
        }
    }
    _findMin() {
        if(!this.left) {
            return this
        }
        return this.left._findMin()
    }
    _replaceWith(node) {
        if(this.parent) {
            if(this == this.parent.left) {
                this.parent.left = node
            } else if(this == this.parent.right) {
                this.parent.right = node
            }
            if(node) {
                node.parent = this.parent
            }
        } else {
            if(node) {
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            } else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }
}
//Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree. Compare your result with the result from the 1st exercise.
function bstNumbers() {
    const BST = new BinarySearchTree()
    BST.insert(3)
    BST.insert(1)
    BST.insert(4)
    BST.insert(6)
    BST.insert(9)
    BST.insert(2)
    BST.insert(5)
    BST.insert(7)
    console.log(BST)
}
bstNumbers()//results look the same as results from question #1
// Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. Compare your result with the result from the 1st exercise.
function bstLetters() {
    const BST = new BinarySearchTree()
    BST.insert('E')
    BST.insert('A')
    BST.insert('S')
    BST.insert('Y')
    BST.insert('Q')
    BST.insert('U')
    BST.insert('E')
    BST.insert('S')
    BST.insert('T')
    BST.insert('I')
    BST.insert('O')
    BST.insert('N')
    console.log(BST)
}
bstLetters()//results look the same as results from question #1

/* ===== 4. What does this program do ===== 
Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. What is the runtime of this algorithm?
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
*/
//Answer: this program adds up the values within a BST. O(n).
//Example: 3,1,4,6,9,2,5,7 => 3+1+4+6+9+2+5+7 => 37

/* ===== 5. Height of a BST =====
Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?
*/
const BST = new BinarySearchTree()
BST.insert(3)
BST.insert(1)
BST.insert(4)
BST.insert(6)
BST.insert(9)
BST.insert(2)
BST.insert(5)
BST.insert(7)
function findHeight(t) {
    if(!t) {
        return 0
    }
    if(!t.left && !t.right) {
        return 1
    }
    let height = 0
    if(t.right) {
        let rHeight = 1 + findHeight(t.right)
        if(rHeight > height) {
            height = rHeight
        }
    }
    if(t.left) {
        let lHeight = 1 + findHeight(t.left)
        if(lHeight > height) {
            height = lHeight
        }
    }
    return height
}
console.log(findHeight(BST))//output: 5. O(n)

/* ===== 6. Is it a BST? ===== 
Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.
*/
function isBST(t) {
    //empty tree
    if(!t.key) {
        return false
    }
    //leaf nodes
    if(!t.right && !t.left) {
        return true
    }
    //2 children
    if(t.right && t.left) {
        isBST(t.right)
        isBST(t.left)
    }
    //left
    if(t.left) {
        if(t.left.key > t.key) {
            return false
        } else {
            return isBST(t.left)
        }
    }
    //right
    if(t.right) {
        if(t.right < t.key) {
            return false
        } else {
            return isBST(t.right)
        }
    }
    return false
}
console.log(isBST(BST))//output: true

/* ===== 7. 3rd largest node =====
Write an algorithm to find the 3rd largest node in a binary search tree.
*/
function findMax(t) {
    let current = t;
    while (current.right !== null) {
        current = current.right;
    }
    return current;
}
function thirdLargestNode(t) {
    let height = findHeight(t)
    if(height < 2) {
        return null
    } else if(height < 3) {
        if(t.left && t.right) {
            return t.left.value
        } else {
            return null
        }
    } else if(height > 3) {
        return thirdLargestNode(t.right)
    } else {
        return t.key
    }
}
console.log(thirdLargestNode(BST))//output: 6

/* ===== 8. Balanced BST =====
Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).
*/
function isBalanced(t) {
    if(!t) {
        return false
    }
    let rightHeight = findHeight(t.right)
    let leftHeight = findHeight(t.left)
    if((rightHeight - leftHeight > 1) || (leftHeight - rightHeight > 1)) {
        return false
    } else {
        return true
    }
}
console.log(isBalanced(BST))//output: false 

/* ===== 9. Are they the same BSTs? =====
You are given two arrays which represent two sequences of keys that are used to create two binary search trees. Write a program that will tell whether the two BSTs will be identical or not without actually constructing the tree. You may use another data structure such as an array or a linked list but don't construct the BST. What is the time complexity of your algorithm? E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays but will create the exact same BSTs and your program should return true.
*/
function identicalBST(arr1, arr2) {
    if(arr1[0] !== arr2[0] || arr1.length !== arr2.length) {
        return false
    }
    if(arr1.length === 0 || arr2.length === 0) {
        return true
    }
    let root1 = arr1[0]
    let higher1 = []
    let lower1 = []
    for(let i = 1; i < arr1.length; i++) {
        if(arr1[i] > root1) {
            higher1.push(arr1[i])
        } else {
            lower1.push(arr1[i])
        }
    }
    let root2 = arr2[0]
    let higher2 = []
    let lower2 = []
    for(let k = 1; k < arr2.length; k++) {
        if(arr2[k] > root2) {
            higher2.push(arr2[k])
        } else {
            lower2.push(arr2[k])
        }
    }
    return (identicalBST(higher1, higher2) && identicalBST(lower1, lower2))
}
console.log(identicalBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]))//output: true. O(n)