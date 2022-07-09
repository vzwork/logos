import {
  LOAD_TREE, SET_BASE_NODE
} from '../actions';

export interface INode {
  name: string;
  id: string;
}

export interface ITreeState {
  baseNodeId: string;
  topShelf: INode[] | [];
  midShelf: INode[] | [];
  botShelf: INode[] | [];
}

const treeState:ITreeState = {
  baseNodeId: '',
  topShelf: [],
  midShelf: [],
  botShelf: [],
};


const treeReducer = (state = treeState, action: any) => {
  switch (action.type) {
    case LOAD_TREE:
      return {
        ...state,
        topShelf: action.payload[0],
        midShelf: action.payload[1],
        botShelf: action.payload[2]
      };
    case SET_BASE_NODE:
      return {
        ...state,
        baseNodeId: action.payload
      }
    default:
      return state;
  };
}

export default treeReducer;