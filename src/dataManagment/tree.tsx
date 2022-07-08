import store from '../store';
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
  children:Map<INode, INode[]>;
  parent:Map<INode, INode>;

  topShelf:INode[];
  midShelf:INode[];
  botShelf:INode[];

  constructor() {
    this.children = new Map<INode, INode[]>;
    this.parent = new Map<INode, INode>;

    this.topShelf = [];
    this.midShelf = [];
    this.botShelf = [];
  }

  async setBase(node:INode){
    const nodeExistsLocaly:boolean = this.children.has(node);
    if (nodeExistsLocaly == false) {
      const docRef = doc(db, 'nodes', node.id);
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
    }
    // populate top shelf
    const maybeTopShelf = this.children.get(node);
    if (!!maybeTopShelf) {this.topShelf = maybeTopShelf;}
    // populate mid shelf
    const parent = this.parent.get(node);
    if (!!parent) {
      const maybeMidShelf = this.children.get(parent);
      if (!!maybeMidShelf) {this.midShelf = maybeMidShelf;}
      else { this.midShelf = [parent]; }
    } else { this.midShelf = []; }
    // populate bot shelf
    if (!!parent) {
      const grandParent = this.parent.get(parent);
      if (!!grandParent) {
        const maybeBotShelf = this.children.get(grandParent);
        if (!!maybeBotShelf) { this.botShelf = maybeBotShelf; }
        else { this.botShelf = [grandParent]; }
      } else { this.botShelf = []; }
    }
  }
}