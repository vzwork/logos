export const LOAD_TREE = 'LOAD_TREE';

export interface INode {
  name: string;
  id: string;
}

export const loadTree = (topShelf:INode[], midShelf:INode[], botShelf:INode[]) => ({
  type: LOAD_TREE,
  payload: [topShelf, midShelf, botShelf]
});