import { INode } from "../../data/Node";

export const SET_BASE_NODE = 'SET_BASE_NODE';

export const setBaseNode = (node:INode) => ({
  type: SET_BASE_NODE,
  payload: [node.id, node.name]
});