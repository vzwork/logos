import { INode } from '../../data/Node';
import {
  SET_BASE_NODE
} from '../actions';

export interface IState {
  baseNodeId: string;
  baseNodeName: string;
}

const myState:IState = {
  baseNodeId: 'default',
  baseNodeName: 'default'
};


const reducer = (state = myState, action: any) => {
  switch (action.type) {
    case SET_BASE_NODE:
      return {
        ...state,
        baseNodeId: action.payload[0],
        baseNodeName: action.payload[1]
      }
    default:
      return state;
  };
}

export default reducer;