import {
  LOAD_TREE
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
    case LOAD_TREE:
      return {
        ...state,
        topShelf: action.payload[0],
        midShelf: action.payload[1],
        botShelf: action.payload[2]
      };
    default:
      return state;
  };
}

export default treeReducer;