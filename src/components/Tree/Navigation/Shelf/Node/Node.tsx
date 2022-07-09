import './Node.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseNode } from '../../../../../store/actions';

const Node = (props) => {
  const data = props.data;
  const id = useSelector((state: any) => state.tree.baseNodeId);
  const dispatch = useDispatch();
  function select(){
    dispatch(setBaseNode(data.id));
    props.treeManager.setBase({name:data.name, id:data.id});
  }
  return (
    <button onClick={select} className={'node ' + (data.id == id ? 'base' : '')}>
      {data.name}
    </button>
  );
}

export default Node;