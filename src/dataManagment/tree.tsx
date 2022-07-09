import store from '../store';
import { loadTree } from '../store/actions';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, setDoc, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC8PjZEfZoL5cJlGBXaFPYkpEQlva72ixk",
  authDomain: "logos-3.firebaseapp.com",
  projectId: "logos-3",
  storageBucket: "logos-3.appspot.com",
  messagingSenderId: "680298592026",
  appId: "1:680298592026:web:8ee012dfa0afbbaebc9ea3",
  measurementId: "G-CMCJFC9SQS"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface INode {
  name: string;
  id: string;
}

export class TreeManager {
  private static instance: TreeManager;

  children:Map<string, INode[]>;
  parent:Map<string, INode>;

  topShelf:INode[];
  midShelf:INode[];
  botShelf:INode[];

  private constructor() {
    this.children = new Map<string, INode[]>;
    this.parent = new Map<string, INode>;

    this.topShelf = [];
    this.midShelf = [];
    this.botShelf = [];
  }

  public static getInstance(): TreeManager {
    if (!TreeManager.instance) {
      TreeManager.instance = new TreeManager();
    }

    return TreeManager.instance;
  }

  async setBase(node:INode){
    const nodeExistsLocaly:boolean = this.children.has(node.id);
    if (nodeExistsLocaly == false) {
      const docRef = doc(db, 'nodes', node.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const parent:INode = {name:node.name, id:node.id};
        const children:INode[] = [];
        const docChildren:any = docSnap.data().children;
        for (const name in docChildren) {
          const id = docChildren[name];
          const child:INode = {name:name, id:id};
          this.parent.set(id, parent);
          children.push(child)
        }
        this.children.set(node.id, children);
      } else {
        console.log('No such document!');
      }
    }
    // populate top shelf
    const maybeTopShelf = this.children.get(node.id);
    if (!!maybeTopShelf) {this.topShelf = maybeTopShelf;}
    // populate mid shelf
    const parent = this.parent.get(node.id);
    if (!!parent) {
      const maybeMidShelf = this.children.get(parent.id);
      if (!!maybeMidShelf) {this.midShelf = maybeMidShelf;}
      else { this.midShelf = [parent]; }
    } else { this.midShelf = []; }
    // populate bot shelf
    if (!!parent) {
      const grandParent = this.parent.get(parent.id);
      if (!!grandParent) {
        const maybeBotShelf = this.children.get(grandParent.id);
        if (!!maybeBotShelf) { this.botShelf = maybeBotShelf; }
        else { this.botShelf = [grandParent]; }
      } else { this.botShelf = []; }
    }

    // update the state using redux
    store.dispatch(loadTree(this.topShelf, this.midShelf, this.botShelf));
  }

  async addNode(parent:INode, childName:string){
    console.log(childName);
    return;
    // add node to the node list
    addDoc(collection(db, 'nodes'), {
      children: []
    }).then((docRef) => {
      const newId = docRef.id;
      // update local list (newly created node has no children)
      this.children.set(newId, []);
      // add new node's parent
      this.parent.set(newId, parent);
      // update new node's parent's children locally
      let parentsChildren = this.children.get(parent.id);
      if (!!parentsChildren) {
        parentsChildren.push({name:childName, id:newId});
        this.children.delete(parent.id);
        this.children.set(parent.id, parentsChildren);
        // update new node's parent's children on firestore
        const parentDocRef = doc(db, 'nodes', parent.id);
        setDoc(parentDocRef, {
          children: parentsChildren
        }).then((docRef) => {
          // success
        }).catch((error) => {
          console.log('Error while update children object on firestore');
        });
      } else {
        console.log('Unexpected problem when reading children map!');
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}