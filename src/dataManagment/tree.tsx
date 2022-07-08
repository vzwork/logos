import store from '../store';
import { loadTree } from '../store/actions';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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
  children:Map<string, INode[]>;
  parent:Map<string, INode>;

  topShelf:INode[];
  midShelf:INode[];
  botShelf:INode[];

  constructor() {
    this.children = new Map<string, INode[]>;
    this.parent = new Map<string, INode>;

    this.topShelf = [];
    this.midShelf = [];
    this.botShelf = [];
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
}