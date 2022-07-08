import {
  LOAD_NODE
} from '../actions';

export interface INode {
  name: string;
  id: string;
}

export interface ITreeState {
  topShelf: INode[] | [];
  midShelf: INode[] | [];
  botShelf: INode[] | [];
}

const treeState:ITreeState = {
  topShelf: [],
  midShelf: [],
  botShelf: [],
};


const treeReducer = (state = treeState, action: any) => {
  switch (action.type) {
    case LOAD_NODE:
      // let newNodes = [...state.nodes];
      let parentNode:INode = {name: 'parent', id: 'id'};
      let childNode:INode = {name: 'child', id: 'id'};
      let treeNode = {parent: parentNode, children: [childNode, childNode]};
      // newNodes.push(treeNode);
      return {
        ...state,
        // nodes: newNodes,
      };
    default:
      return state;
  };
}

export default treeReducer;