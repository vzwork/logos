import { ITreeNode } from './TreeNode';
import { INode, Node } from './Node';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { TreeNode, treeNodeConverter } from './TreeNode';

export class TreeManager {
  // vvv Firebase setup vvv
  private firebaseConfig = {
    apiKey: "AIzaSyC8PjZEfZoL5cJlGBXaFPYkpEQlva72ixk",
    authDomain: "logos-3.firebaseapp.com",
    projectId: "logos-3",
    storageBucket: "logos-3.appspot.com",
    messagingSenderId: "680298592026",
    appId: "1:680298592026:web:8ee012dfa0afbbaebc9ea3",
    measurementId: "G-CMCJFC9SQS"
  };
  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  // ^^^ Firebase setup ^^^

  // vvv Singleton vvv
  private static instance: TreeManager;

  public static getInstance(): TreeManager {
    if (!TreeManager.instance) {
      TreeManager.instance = new TreeManager();
    }
    return TreeManager.instance;
  }
  // ^^^ Singleton ^^^

  nodes:Map<string, ITreeNode>;
  topShelf:INode[];
  midShelf:INode[];
  botShelf:INode[];

  private constructor() {
    this.nodes = new Map<string, ITreeNode>;
    this.topShelf = [];
    this.midShelf = [];
    this.botShelf = [];
  }

  public setRootTreeNode(id:string, name:string) {
    this.nodes.set(id, {parent: {id:id, name:name}, children:[]});
    this.downloadNode({id:id, name:name});
    this.setBaseNode({id:id, name:name});
  }

  private isRootNode(id:string, node:TreeNode):boolean {
    if (id == node.parent.id){
      return true;
    }
    return false;
  }

  public async setBaseNode(node:INode) {
    const nodeExistsLocaly = this.nodes.has(node.id);
    if (nodeExistsLocaly == false) {
      await this.downloadNode(node);
    }
    // populate top shelf
    const treeNode = this.nodes.get(node.id);
    if (!!treeNode) {
      const topShelf = treeNode.children;
      if (!!topShelf) { this.topShelf = topShelf; }

      // check if treeNode is rootNode, if so, build mid shelf only from root node
      if (this.isRootNode(node.id, treeNode)) {
        this.midShelf = [node];
        this.botShelf = [];
      } else {

        // populate mid shelf
        const parentNode = treeNode.parent;
        if (!!parentNode) {
          const parentTreeNode = this.nodes.get(parentNode.id);
          if (!!parentTreeNode) {
            const midShelf = parentTreeNode.children;
            if (!!midShelf) { this.midShelf = midShelf; }

            // check if parentTreeNode is rootNode, if so, build bot shelf only from root node
            if (this.isRootNode(parentNode.id, parentTreeNode)){
              this.botShelf = [parentNode];
            } else {

              // populate bot shelf
              const parentParentNode = parentTreeNode.parent;
              if (!!parentParentNode) {
                const parentParentTreeNode = this.nodes.get(parentParentNode.id);
                if (!!parentParentTreeNode) {
                  const botShelf = parentParentTreeNode.children;
                  if (!! botShelf) { this.botShelf = botShelf; }
                }
              }
            }
          }
        }
      }
    }
  }

  public async updateNode(id:string) {
    const ref = doc(this.db, 'nodes', id).withConverter(treeNodeConverter);
    const node = this.nodes.get(id);
    if (!!node) {
      const parent = node.parent;
      const children = node.children;
      if (!!children) {
        await setDoc(ref, new TreeNode(parent, children));
      }
    }
  }

  public async uploadNode(base:INode, name:string) {
    // load new node -> get back id
    const ref = collection(this.db, 'nodes').withConverter(treeNodeConverter);
    const docRef = await addDoc(ref, new TreeNode(base, []));
    if (!!docRef) {
      // update local TreeNode with new child
      const newChild = new Node(docRef.id, name);
      const treeNode = this.nodes.get(base.id);
      if (!!treeNode) {
        treeNode.children.push(newChild);
        this.nodes.set(base.id, treeNode);
      } else {
        console.log('Base reference doesn\'t exist!')
      }
      // add new TreeNode for that child
      const newTreeNode:ITreeNode = {
        parent: base,
        children: []
      }
      this.nodes.set(docRef.id, newTreeNode);
      // update base node on firebase
      this.updateNode(base.id);
    }
  }

  public async downloadNode(base:INode) {
    const ref = doc(this.db, 'nodes', base.id).withConverter(treeNodeConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const treeNode = docSnap.data();
      if (!!treeNode) {
        const newTreeNode = {
          parent: treeNode.parent,
          children: treeNode.children
        }
        this.nodes.set(base.id, newTreeNode);
      } else {
        console.log('Error while looking for base TreeNode!');
      }
    } else {
      console.log('No such document!');
    }
  }

  public getParent(node:INode):INode {
    const treeNode = this.nodes.get(node.id);
    if (!!treeNode) {
      return treeNode.parent;
    }
    console.log('Unexpected behavior');
    return {id:'error', name:'error'};
  }

  public async deleteNode(node:INode) {
    if (this.nodes.has(node.id)) {
      const treeNode = this.nodes.get(node.id);
      if (!!treeNode) {
        // if treeNode has children abort (not supported funcitonality yet)
        if (treeNode.children.length > 0) {
          console.log('Cannot delete node that has children!');
          console.log('Functionality is not yet supported!');
          return;
        }

        // if TreeNode exists delete it
        this.nodes.delete(node.id);
        // remove reference from the parent node
        const parentNode = treeNode.parent;
        if (!!parentNode) {
          const parentTreeNode = this.nodes.get(parentNode.id);
          if (!!parentTreeNode) {
            const parentChildren = parentTreeNode.children;
            let newParentChildren:INode[] = [];
            parentChildren.forEach((child) => {
              if (child.id != node.id) {
                newParentChildren.push(child);
              }
            });
            parentTreeNode.children = newParentChildren;
            this.nodes.set(parentNode.id, parentTreeNode);

            // update parent node with no reference
            await this.updateNode(parentNode.id);

            // delete TreeNode from the firebase
            await deleteDoc(doc(this.db, 'nodes', node.id));
          }
        }
      }
    }
  }
}