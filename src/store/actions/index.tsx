export const LOAD_NODE = 'LOAD_NODE';

export const loadNode = (nodeName:string, nodeId?:string) => ({
  type: LOAD_NODE,
  payload: [nodeName, nodeId]
});