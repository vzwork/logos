export const LOAD_TREE = 'LOAD_TREE';
export const SET_BASE_NODE = 'SET_BASE_NODE';

export interface INode {
  name: string;
  id: string;
}

export const loadTree = (topShelf:INode[], midShelf:INode[], botShelf:INode[]) => ({
  type: LOAD_TREE,
  payload: [topShelf, midShelf, botShelf]
});

export const setBaseNode = (id:string) => ({
  type: SET_BASE_NODE,
  payload: id
});