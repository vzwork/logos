import './Node.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseNode } from '../../../../../store/actions';
import { TreeManager } from '../../../../../data/manager';

const Node = (props) => {
  const node = props.node;
  const baseNodeId = useSelector((state: any) => state.state.baseNodeId);
  const baseNodeName = useSelector((state: any) => state.state.baseNodeName);
  const baseNode = {id:baseNodeId, name:baseNodeName};
  const dispatch = useDispatch();
  async function select(){
    const treeManager = TreeManager.getInstance();
    await treeManager.setBaseNode(node);
    dispatch(setBaseNode(node));
  }
  return (
    <button onClick={select} className={'node ' + (baseNode.id == node.id ? 'base' : '')}>
      {node.name}
    </button>
  );
}

export default Node;